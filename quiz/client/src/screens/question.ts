import escapeHTML from "escape-html";
import { toPairs } from "lodash-es";
import {
  ClientPacketType,
  ServerPacketType,
} from "../../../common/types/packets";
import { ClientQuestion } from "../../../common/types/question";
import {
  calcStringWidth,
  renderAnimeTitle,
  renderTemplate,
} from "../utils/titles";
import { globalSettings } from "../globalSettings";
import { socket } from "../websocket";
import { LobbyScreen } from "./lobby";
import { DOMScreen } from "./screen";
import { GlobalDropdownOption } from "../types/globalDropdown";
import { showDialog } from "../overlay";
import { GAME_SETTING } from "../../../common/types/game";

export class QuestionScreen extends DOMScreen {
  public readonly globalDropdownOptions: GlobalDropdownOption[] = [
    {
      svgPath: `<path d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" />`,
      title: "Leave Session",
      callback: this.leaveGameGuarded.bind(this),
    },
  ];
  private lobby: LobbyScreen;
  private questionId: number = null;
  private question: ClientQuestion;
  private ownAnwser: number = null;
  private timerStarted: number;
  private timerReverse = false;
  private timeoutMs: number;
  private timerDOM: HTMLElement;
  private audio: HTMLAudioElement;
  private questionDone = false;
  private resetTimeoutListener: number;
  private globalSettingsChangedListener: (e: CustomEvent) => void;

  constructor(
    lobby: LobbyScreen,
    questionId: number,
    question: ClientQuestion
  ) {
    super();
    this.lobby = lobby;
    this.questionId = questionId;
    this.question = question;
    this.timeoutMs = this.question.timeoutMs;
  }

  init() {
    this.domRef.addEventListener("click", (e) => {
      const elem = (e.target as HTMLElement).closest("[data-answer]");
      if (elem === null) {
        return;
      }

      if (this.questionDone) {
        return;
      }

      if (
        this.ownAnwser !== null &&
        this.lobby.getSetting(GAME_SETTING.ALLOW_CHANGE_ANSWER) === false
      ) {
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

    this.resetTimeoutListener = socket.on(
      ServerPacketType.GAME_QUESTION_RESET_TIMEOUT,
      ({ id, timeoutMs, reverse }) => {
        if (this.questionId !== id) {
          return;
        }

        this.timeoutMs = timeoutMs;
        this.timerStarted = Date.now();
        this.timerReverse = reverse;
        console.log("reset timer");
      }
    );

    // preload audio, if exists
    if (this.question.question.audioUrl) {
      this.audio = new Audio(this.question.question.audioUrl);
      this.audio.preload = "auto";
      this.audio.autoplay = false;
      this.audio.volume = globalSettings.volume;

      this.globalSettingsChangedListener = this.settingsChanged.bind(this);
      document.addEventListener(
        "globalSettingsChanged",
        this.globalSettingsChangedListener
      );
    }

    // scale font for answers
    const answerContainers = this.domRef.querySelectorAll(".answers > li");
    answerContainers.forEach((a: HTMLElement) => {
      const containerWidth = a.getBoundingClientRect().width - 80;
      const stringWidth = calcStringWidth(a.getAttribute("data-str-val"));

      a.style.fontSize = `${Math.floor(
        Math.min(Math.max(22 * (containerWidth / stringWidth), 16), 22)
      )}px`;
    });

    this.timerDOM = this.domRef.querySelector(".question-timer");
  }

  setActive(): void {
    super.setActive();
    this.timerStarted = Date.now();

    // start audio playback, if exists
    if (this.audio) {
      this.audio.play();
    }

    window.requestAnimationFrame(() => {
      this.updateTimer();
    });
  }

  settingsChanged(e: CustomEvent) {
    this.audio.volume = e.detail.volume;
  }

  updateTimer() {
    if (this.questionDone && !globalSettings.showReverseTimer) {
      this.timerDOM.style.transform = `scaleX(0)`;
      return;
    }

    const timeoutMs = this.timeoutMs - 250;

    const timeLeftSeconds = Math.ceil(
      (this.timerStarted + timeoutMs - Date.now()) / 1000
    );

    let timePercentage = Math.max(
      1 - (Date.now() - this.timerStarted) / timeoutMs,
      0.0
    );

    if (this.timerReverse) {
      timePercentage = 1 - timePercentage;
    }
    this.timerDOM.style.transform = `scaleX(${timePercentage})`;

    window.requestAnimationFrame(() => {
      this.updateTimer();
    });
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

    //unblur image, if exists
    if (this.question.question.image) {
      const img = this.domRef.querySelector(".question-image");
      img.removeAttribute("data-blurred");
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

  leaveGameGuarded() {
    showDialog(
      "Are you sure?",
      "You cannot join again as long as the game is running.",
      {
        actions: [
          {
            class: "button-outline",
            title: "Cancel",
            value: "cancel",
          },
          {
            class: "button-error",
            title: "Leave Game",
            value: "leave",
          },
        ],
        callback: (val) => {
          if (val === "leave") {
            socket.sendMsg(ClientPacketType.GAME_LEAVE);
          }
        },
      }
    );
  }

  setInactive(direction?: "left" | "right"): void {
    super.setInactive(direction);

    this.questionDone = true;

    // stop audio, if exists
    if (this.audio) {
      this.audio.pause();
      this.audio.remove();
    }
  }

  die() {
    super.die();

    document.removeEventListener(
      "globalSettingsChanged",
      this.globalSettingsChangedListener
    );

    socket.off(
      ServerPacketType.GAME_QUESTION_RESET_TIMEOUT,
      this.resetTimeoutListener
    );
  }

  template(): string {
    const question = this.question.question;
    const answers = this.question.answers;
    const hasImage = this.question.question.image ? true : false;
    const hasAudio = this.question.question.audioUrl ? true : false;

    return `
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${
        this.questionId + 1
      }</div>
        ${
          hasImage
            ? `<div class="question-image-container">
            <img class="question-image" ${
              question.imageBlurred ? "data-blurred=true" : ""
            } src="${escapeHTML(question.image)}">
            </div>`
            : ""
        }
        <div class="question-title title-h3">${escapeHTML(
          renderTemplate(question.title)
        )}</div>
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${answers
          .map((a, idx) => {
            const str = escapeHTML(renderAnimeTitle(a));
            const secondaryTitle = escapeHTML(renderAnimeTitle(a, true));

            const secondaryIsSame =
              secondaryTitle.toLowerCase() === str.toLowerCase();

            return `<li data-answer="${idx}" data-str-val="${str}">
            <div>
              ${str}
              ${
                !secondaryIsSame
                  ? `<span class="secondary-answer">${secondaryTitle}</span>`
                  : ""
              }
            </div>
            <div class="answer-others-container"></div>
          </li>`;
          })
          .join("")}
      </ul>
    </div>`;
  }
}
