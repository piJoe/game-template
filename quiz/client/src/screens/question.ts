import escapeHTML from "escape-html";
import { toPairs } from "lodash-es";
import {
  ClientPacketType,
  ServerPacketType,
} from "../../../common/types/packets";
import { ClientQuestion } from "../../../common/types/question";
import { socket } from "../websocket";
import { LobbyScreen } from "./lobby";
import { DOMScreen } from "./screen";

export class QuestionScreen extends DOMScreen {
  private lobby: LobbyScreen;
  private questionId: number = null;
  private question: ClientQuestion;
  private ownAnwser: number = null;
  private timerStarted: number;
  private timerDOM: HTMLElement;
  private questionDone = false;
  constructor(
    lobby: LobbyScreen,
    questionId: number,
    question: ClientQuestion
  ) {
    super();
    this.lobby = lobby;
    this.questionId = questionId;
    this.question = question;
  }

  init() {
    this.domRef.addEventListener("click", (e) => {
      const elem = e.target as HTMLElement;
      if (!elem.hasAttribute("data-answer")) {
        return;
      }

      const val = elem.getAttribute("data-answer");
      this.ownAnwser = parseInt(val);

      socket.sendMsg(ClientPacketType.GAME_QUESTION_ANSWER, {
        questionId: this.questionId,
        answer: this.ownAnwser,
      });
      this.domRef
        .querySelectorAll("[data-answer-selected=true]")
        .forEach((e) => {
          e.removeAttribute("data-answer-selected");
        });
      elem.setAttribute("data-answer-selected", "true");
    });

    this.timerDOM = this.domRef.querySelector(".question-timer");
  }

  setActive(): void {
    super.setActive();
    this.timerStarted = Date.now();
    window.requestAnimationFrame(() => {
      this.updateTimer();
    });
  }

  updateTimer() {
    const timeLeftSeconds = Math.ceil(
      (this.timerStarted + this.question.timeoutMs - Date.now()) / 1000
    );

    let timePercentage = Math.max(
      1 - (Date.now() - this.timerStarted) / this.question.timeoutMs,
      0.0
    );

    if (this.questionDone) {
      timePercentage = 0.0;
    }

    this.timerDOM.style.transform = `scaleX(${timePercentage})`;

    if (timeLeftSeconds > 0 || !this.questionDone) {
      window.requestAnimationFrame(() => {
        this.updateTimer();
      });
    }
  }

  showAnswers(
    answers: { wrong: number[]; correct: number[] },
    playerAnswers: { [key: string]: number }
  ) {
    const { correct, wrong } = answers;
    const otherAnswers = toPairs(playerAnswers);

    correct.forEach((a) => {
      this.domRef
        .querySelector(`li[data-answer="${a}"]`)
        .setAttribute("data-answer-correct", "true");
    });
    if (wrong.includes(this.ownAnwser)) {
      // our answer unfortunately was wrong :sadge:, show in red
      this.domRef
        .querySelector(`li[data-answer="${this.ownAnwser}"]`)
        .setAttribute("data-answer-correct", "false");
    }

    otherAnswers.forEach(([playerId, answerId]) => {
      const playerName = this.lobby.getPlayerEntryById(playerId).name;
      const answerContainer = this.domRef.querySelector(
        `li[data-answer="${answerId}"] > .answer-others-container`
      );

      const tag = document.createElement("div");
      tag.classList.add("answer-others", "skewed-tag");
      tag.innerHTML = `<span>${playerName}</span>`;
      answerContainer.appendChild(tag);
    });

    this.questionDone = true;
  }

  template(): string {
    const question = this.question.question;
    const answers = this.question.answers;
    const hasImage = this.question.question.image ? true : false;

    return `
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${
        this.questionId + 1
      }</div>
        ${
          hasImage
            ? `<img class="question-image" src="${escapeHTML(question.image)}">`
            : ""
        }
        <div class="question-title title-h3">${escapeHTML(question.title)}</div>
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${answers
          .map(
            (a, idx) => `<li data-answer="${idx}">
            ${escapeHTML(a)}
            <div class="answer-others-container"></div>
          </li>`
          )
          .join("")}
      </ul>
    </div>`;
  }
}
