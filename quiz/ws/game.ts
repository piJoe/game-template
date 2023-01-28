import { shuffle } from "fast-shuffle";
import { flatten } from "lodash-es";
import {
  GameSettings,
  GAME_AVAILABLE_QUESTION_ID,
  GAME_STATUS,
} from "../common/types/game";
import { ServerPacketType } from "../common/types/packets";
import { ServerQuestion } from "../common/types/question";
import { SESSION_STATUS } from "../common/types/session";
import { distributeNumbers } from "../common/utils/math";
import { QuestionAnimeFromCharacter } from "../questions/anime-from-char";
import { QuestionAnimeGenre } from "../questions/anime-genre";
import { QuestionAnimeOpening } from "../questions/anime-opening";
import { QuestionAnimeStudio } from "../questions/anime-studio";
import { QuestionCharByPicture } from "../questions/charname.js";
import { timeout } from "../utils/promises";
import { Player } from "./player";
import { GameSession } from "./session";

const UX_SLEEP_TIMER = 3 * 1000;

export class Game {
  public status: GAME_STATUS = GAME_STATUS.CREATED;
  private settings: GameSettings;
  private questions: ServerQuestion[];
  private currentQuestion: number;
  private session: GameSession;
  private waitForAnswersCallback = new Map<number, () => void>();
  private endGameNextTick = false;

  constructor(session: GameSession, settings: GameSettings) {
    this.session = session;
    this.settings = settings;
    this.init();
  }

  async init() {
    this.status = GAME_STATUS.GENERATING;

    const options = {
      mainRoleOnly: this.settings?.mainRoleOnly ?? false,
      maxPopularity:
        this.settings?.maxPopularity > -1
          ? this.settings?.maxPopularity
          : undefined,
      minPopularity:
        this.settings?.minPopularity > -1
          ? this.settings?.minPopularity
          : undefined,
      minYear: this.settings?.minYear > -1 ? this.settings?.minYear : undefined,
      maxYear: this.settings?.maxYear > -1 ? this.settings?.maxYear : undefined,
    };

    const questionCounts = distributeNumbers(
      this.settings.questionCount,
      this.settings.activeQuestions.length
    );
    const questionPromises = shuffle(this.settings.activeQuestions).map(
      (id, i) => {
        switch (id) {
          case GAME_AVAILABLE_QUESTION_ID.ANIME_FROM_CHAR:
            return QuestionAnimeFromCharacter.create(
              questionCounts[i],
              options
            );
          case GAME_AVAILABLE_QUESTION_ID.ANIME_GENRE:
            return QuestionAnimeGenre.create(questionCounts[i], options);
          case GAME_AVAILABLE_QUESTION_ID.ANIME_STUDIO:
            return QuestionAnimeStudio.create(questionCounts[i], options);
          case GAME_AVAILABLE_QUESTION_ID.CHAR_BY_PICTURE:
            return QuestionCharByPicture.create(questionCounts[i], options);
          case GAME_AVAILABLE_QUESTION_ID.ANIME_OPENING:
            return QuestionAnimeOpening.create(questionCounts[i], options);
          default:
            throw new Error("No handler for Question " + id);
        }
      }
    );

    this.questions = shuffle(flatten(await Promise.all(questionPromises)))
      // TODO: rework this filter hotfix correctly; for now remove any question with less than 4 answers
      .filter((q) => q.answers.all.length > 3);
    this.startGame();
  }

  async startGame() {
    this.status = GAME_STATUS.RUNNING;
    this.currentQuestion = 0;
    this.session.resetPlayerScores();
    this.sendQuestion(this.currentQuestion);
    await timeout(UX_SLEEP_TIMER);
    this.session.resetPlayerLastActivity();
    this.gameLoop();
  }

  endGame() {
    this.sendGameFinalScoreboard();
    this.status = GAME_STATUS.FINISHED;
    this.session.updateStatus(SESSION_STATUS.LOBBY);
    this.session.gameEnded();
  }

  forceEnd() {
    this.endGameNextTick = true;
  }

  async gameLoop() {
    // console.log("gameLoop", this.currentQuestion, this.endGameNextTick);

    if (this.endGameNextTick) {
      this.endGame();
      return;
    }

    const q = this.questions[this.currentQuestion];
    if (!q) {
      this.endGame();
      return;
    }

    // first, kick all inactive players before we contine
    this.session.kickInactivePlayers();

    // activate current question
    this.sendQuestionActive(this.currentQuestion);

    // then send next question to clients for buffering
    const nextQuestion = this.getNextQuestion();
    if (nextQuestion !== false) {
      this.sendQuestion(nextQuestion);
    }

    const timeoutQuestion = timeout(q.timeoutMs);
    // TODO: activate additional promise
    const waitForAllAnswers = this.waitForPlayerAnswers(this.currentQuestion);
    await Promise.any([timeoutQuestion, waitForAllAnswers]);
    this.resolveAnyOldWaitForPlayerPromises();

    this.updateGameScores(this.currentQuestion);
    this.sendQuestionAnswers(this.currentQuestion);

    const hasNextQuestion = this.setNextActiveQuestionIndex();

    // sleep for some time for players to process the results
    await timeout(UX_SLEEP_TIMER);

    if (!hasNextQuestion) {
      // no more questions available, end the game now!
      this.endGame();
      return;
    }

    this.gameLoop();
  }

  getNextQuestion(): number | false {
    let nextQuestion = this.currentQuestion + 1;
    if (!this.questions[nextQuestion]) {
      // THIS WAS THE LAST QUESTION ALREADY
      return false;
    }
    return nextQuestion;
  }

  setNextActiveQuestionIndex(): boolean {
    let nextQuestion = this.getNextQuestion();
    if (nextQuestion === false) {
      // THIS WAS THE LAST QUESTION ALREADY
      return false;
    }

    this.currentQuestion = nextQuestion;
    return true;
  }

  updateGameScores(questionId: number) {
    const q = this.questions[questionId];
    if (!q) {
      // TODO: throw error or smth idk
      return;
    }

    const correctAnswers = q.answers.correct;
    q.playerAnswers.forEach((pAnswer, playerId) => {
      if (correctAnswers.includes(pAnswer)) {
        this.session.addPlayerScore(playerId);
      }
    });

    this.session.sendPlayerlist();
  }

  waitForPlayerAnswers(questionId: number) {
    const promise = new Promise<void>((res) => {
      this.waitForAnswersCallback.set(questionId, () => {
        res();
      });
    });
    return promise;
  }

  resolveAnyOldWaitForPlayerPromises() {
    this.waitForAnswersCallback.forEach((c) => c());
    this.waitForAnswersCallback.clear();
  }

  setPlayerAnswer(player: Player, questionId: number, answer: number) {
    if (this.currentQuestion !== questionId) {
      // TODO: throw error or smth idk (it's not the right time to answer this question)
      return;
    }
    this.questions[questionId]?.playerAnswers.set(player.id, answer);

    // everyone gave an answer we can skip the countdown :poggies:
    if (
      this.questions[questionId]?.playerAnswers.size ===
      this.session.playerCount
    ) {
      const callback = this.waitForAnswersCallback.get(questionId);
      if (callback) {
        callback();
      }
      this.waitForAnswersCallback.delete(questionId);
    }
  }

  sendQuestion(id: number) {
    const question = this.questions[id];
    if (!question) {
      // TODO: throw an error or smth idk
      return;
    }
    this.session.sendMsg(ServerPacketType.GAME_QUESTION, {
      id,
      question: {
        question: question.question,
        answers: question.answers.all,
        timeoutMs: question.timeoutMs,
      },
    });
  }

  sendQuestionActive(id: number) {
    const question = this.questions[id];
    if (!question) {
      // TODO: throw an error or smth idk
      return;
    }
    this.session.sendMsg(ServerPacketType.GAME_QUESTION_ACTIVE, {
      id,
      question: {
        question: question.question,
        answers: question.answers.all,
        timeoutMs: question.timeoutMs,
      },
    });
  }

  sendQuestionAnswers(id: number) {
    const q = this.questions[id];
    if (!q) {
      return;
    }
    const { answers, playerAnswers } = q;
    this.session.sendMsg(ServerPacketType.GAME_QUESTION_ANSWERS, {
      id,
      answers,
      playerAnswers: Object.fromEntries(playerAnswers.entries()),
    });
  }

  sendGameFinalScoreboard() {
    // send scoreboard packet, also indicating to client that game is done, idk
  }

  static ALL_AVAILABLE_QUESTIONS = [
    GAME_AVAILABLE_QUESTION_ID.CHAR_BY_PICTURE,
    GAME_AVAILABLE_QUESTION_ID.ANIME_FROM_CHAR,
    GAME_AVAILABLE_QUESTION_ID.ANIME_GENRE,
    GAME_AVAILABLE_QUESTION_ID.ANIME_STUDIO,
    GAME_AVAILABLE_QUESTION_ID.ANIME_OPENING,
  ];

  static MIN_QUESTION_AMOUNT = 3;
  static MAX_QUESTION_AMOUNT = 50;
}
