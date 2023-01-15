import { shuffle } from "fast-shuffle";
import { GAME_STATUS } from "../common/types/game";
import { ServerPacketType } from "../common/types/packets";
import { ServerQuestion } from "../common/types/question";
import { SESSION_STATUS } from "../common/types/session";
import { QuestionAnimeFromCharacter } from "../questions/anime-from-char";
import { QuestionAnimeGenre } from "../questions/anime-genre";
import { QuestionAnimeStudio } from "../questions/anime-studio";
import { QuestionCharName } from "../questions/charname.js";
import { timeout } from "../utils/promises";
import { Player } from "./player";
import { GameSession } from "./session";

const QUESTION_AMOUNT_EASY = 3;
const QUESTION_AMOUNT = 5;
const BUFFER_TIMER = 3 * 1000;

export class Game {
  public status: GAME_STATUS = GAME_STATUS.CREATED;
  private questions: ServerQuestion[];
  private currentQuestion: number;
  private session: GameSession;
  private waitForAnswersCallback = new Map<number, () => void>();
  private endGameNextTick = false;

  constructor(session: GameSession) {
    this.session = session;
    this.init();
  }

  async init() {
    this.status = GAME_STATUS.GENERATING;
    this.questions = shuffle([
      // genre questions
      ...(await QuestionAnimeGenre.create(QUESTION_AMOUNT)),
      // studio questions
      ...(await QuestionAnimeStudio.create(QUESTION_AMOUNT, {
        maxPopularity: 300,
      })),
      // easy char questions
      ...(await QuestionCharName.create(QUESTION_AMOUNT_EASY, {
        mainRoleOnly: true,
        maxPopularity: 100,
      })),
      // medium char questions
      ...(await QuestionCharName.create(QUESTION_AMOUNT, {
        maxPopularity: 500,
      })),
      // hard char questions
      ...(await QuestionCharName.create(QUESTION_AMOUNT)),
      // easyum
      ...(await QuestionAnimeFromCharacter.create(QUESTION_AMOUNT_EASY, {
        mainRoleOnly: true,
        maxPopularity: 800,
      })),
      // hard
      ...(await QuestionAnimeFromCharacter.create(QUESTION_AMOUNT, {
        imageOnly: true,
      })),
    ]);
    this.startGame();
  }

  async startGame() {
    this.status = GAME_STATUS.RUNNING;
    this.currentQuestion = 0;
    this.session.resetPlayerScores();
    this.sendQuestion(this.currentQuestion);
    await timeout(BUFFER_TIMER);
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

    this.sendQuestionActive(this.currentQuestion);

    const timeoutQuestion = timeout(q.timeoutMs);
    // TODO: activate additional promise
    const waitForAllAnswers = this.waitForPlayerAnswers(this.currentQuestion);
    await Promise.any([timeoutQuestion, waitForAllAnswers]);
    this.resolveAnyOldWaitForPlayerPromises();

    this.updateGameScores(this.currentQuestion);
    this.sendQuestionAnswers(this.currentQuestion);

    const hasNextQuestion = this.setNextQuestionActive();
    if (hasNextQuestion) {
      this.sendQuestion(this.currentQuestion); // already send next question to clients
    }

    // sleep for some time for players to process the results
    await timeout(BUFFER_TIMER);

    if (!hasNextQuestion) {
      // no more questions available, end the game now!
      this.endGame();
      return;
    }

    this.gameLoop();
  }

  setNextQuestionActive(): boolean {
    let nextQuestion = this.currentQuestion + 1;
    if (!this.questions[nextQuestion]) {
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
}
