import { shuffle } from "fast-shuffle";
import { flatten } from "lodash-es";
import {
  ANSWER_TIMEOUT_MODE,
  GameSettings,
  GAME_AVAILABLE_QUESTION_ID,
  GAME_SETTING,
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
  private waitForTimeoutCallback = new Map<
    number,
    { resolve: () => void; reject: () => void }
  >();
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

    const questionId = this.currentQuestion;
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

    const timeoutQuestion = this.waitForTimeout(questionId);
    const waitForPlayerAnswers = this.waitForPlayerAnswers(questionId);

    timeout(q.timeoutMs).then(() => {
      const callback = this.waitForTimeoutCallback.get(questionId);
      if (callback) {
        callback.resolve();
      }
      this.waitForTimeoutCallback.delete(questionId);
    });

    await Promise.any([timeoutQuestion, waitForPlayerAnswers]);
    this.resolveAnyOldWaitPromises();

    this.updateGameScores(this.currentQuestion);
    this.sendQuestionAnswers(this.currentQuestion);

    const hasNextQuestion = this.setNextActiveQuestionIndex();

    // sleep for some time for players to process the results
    this.session.sendMsg(ServerPacketType.GAME_QUESTION_RESET_TIMEOUT, {
      id: questionId,
      timeoutMs: UX_SLEEP_TIMER,
      reverse: true,
    });
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
      } else {
        // player has chosen a wrong anwser, give him negative points!
        if (this.settings[GAME_SETTING.WRONG_ANSER_PENALTY]) {
          this.session.addPlayerScore(playerId, -1);
        }
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

  waitForTimeout(questionId: number) {
    const promise = new Promise<void>((res, rej) => {
      this.waitForTimeoutCallback.set(questionId, {
        resolve: () => {
          res();
        },
        reject: () => {
          rej();
        },
      });
    });
    return promise;
  }

  resolveAnyOldWaitPromises() {
    this.waitForAnswersCallback.forEach((c) => c());
    this.waitForAnswersCallback.clear();

    this.waitForTimeoutCallback.forEach((c) => c.resolve());
    this.waitForTimeoutCallback.clear();
  }

  // TODO: implement SKIP answer button? (should also prevent from being kicked due to inactivity)
  async setPlayerAnswer(player: Player, questionId: number, answer: number) {
    if (this.currentQuestion !== questionId) {
      // TODO: throw error or smth idk (it's not the right time to answer this question)
      return;
    }

    // if we do not allow to change answers, never set answer again.
    if (
      !this.settings.allowChangeAnswer &&
      this.questions[questionId]?.playerAnswers.has(player.id)
    ) {
      // TODO: throw error or smth idk (it's not the right time to answer this question)
      return;
    }

    const wasFirstAlreadyAnswered =
      this.questions[questionId]?.playerAnswers.size > 0;

    const wasEveryoneAnswered =
      this.questions[questionId]?.playerAnswers.size ===
      this.session.playerCount;

    this.questions[questionId]?.playerAnswers.set(player.id, answer);

    // never actually fullfil the waitForAnswers callback, when we're in always_timeout mode
    if (this.settings.answerTimeout === ANSWER_TIMEOUT_MODE.ALWAYS_TIMEOUT) {
      return;
    }

    // everyone gave an answer we can skip the countdown :poggies:
    const everyoneAnswered =
      this.questions[questionId]?.playerAnswers.size ===
      this.session.playerCount;

    const waitForFirstAnswer =
      this.settings.answerTimeout === ANSWER_TIMEOUT_MODE.WAIT_FIRST_ANSWER;

    // only first player answered, but we're in a special mode where this is relevant
    const firstAnswered =
      waitForFirstAnswer &&
      this.questions[questionId]?.playerAnswers.size === 1;

    if (firstAnswered && !wasFirstAlreadyAnswered) {
      // sleep for some time
      if (this.settings[GAME_SETTING.SECONDS_AFTER_ANSWER] > 0) {
        const timeoutMs =
          this.settings[GAME_SETTING.SECONDS_AFTER_ANSWER] * 1000;
        this.session.sendMsg(ServerPacketType.GAME_QUESTION_RESET_TIMEOUT, {
          id: questionId,
          timeoutMs: timeoutMs,
          reverse: false,
        });

        // reject the timeout callback to prevent race condition
        const callback = this.waitForTimeoutCallback.get(questionId);
        if (callback) {
          callback.reject();
        }
        this.waitForTimeoutCallback.delete(questionId);

        await timeout(timeoutMs);
      }

      const callback = this.waitForAnswersCallback.get(questionId);
      if (callback) {
        callback();
      }
      this.waitForAnswersCallback.delete(questionId);

      return;
    }

    if (!waitForFirstAnswer && everyoneAnswered && !wasEveryoneAnswered) {
      // sleep for some time
      if (this.settings[GAME_SETTING.SECONDS_AFTER_ANSWER] > 0) {
        const timeoutMs =
          this.settings[GAME_SETTING.SECONDS_AFTER_ANSWER] * 1000;
        this.session.sendMsg(ServerPacketType.GAME_QUESTION_RESET_TIMEOUT, {
          id: questionId,
          timeoutMs: timeoutMs,
          reverse: false,
        });

        // reject the timeout callback to prevent race condition
        const callback = this.waitForTimeoutCallback.get(questionId);
        if (callback) {
          callback.reject();
        }
        this.waitForTimeoutCallback.delete(questionId);

        await timeout(timeoutMs);
      }

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
    // TODO: send scoreboard packet, also indicating to client that game is done, idk
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
