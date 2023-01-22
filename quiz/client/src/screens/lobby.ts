import {
  GameSettings,
  GAME_AVAILABLE_QUESTION_ID,
  GAME_SETTING,
} from "../../../common/types/game";
import {
  ClientPacketType,
  ServerPacketType,
} from "../../../common/types/packets";
import {
  PlayerListEntry,
  PLAYER_LEFT_REASON,
  SESSION_STATUS,
} from "../../../common/types/session";
import { getQuestionNameById } from "../../../common/utils/animehelper";
import { globalState } from "../globalstate";
import { showDialog } from "../overlay";
import { socket } from "../websocket";
import { JoinScreen } from "./join";
import { QuestionScreen } from "./question";
import { DOMScreen } from "./screen";

export class LobbyScreen extends DOMScreen {
  protected killWhenInactive = false;

  private currentLobbyStatus: SESSION_STATUS = null;
  private statusListener: number;
  private playerlistListener: number;
  private gameSettingsListener: number;
  private questionListener: number;
  private questionActiveListener: number;
  private questionAnswersListener: number;
  private selfLeftListener: number;
  private scoreboardDom: HTMLElement;
  private scoreboardCloseCallback: () => void;
  private lobbyId = "";
  private readyButton: HTMLInputElement;
  private lobbySettingsDom: HTMLElement;
  private selfReady = false;
  private playerlist: PlayerListEntry[] = [];
  private questions = new Map<number, QuestionScreen>();

  constructor() {
    super();
  }

  init() {
    this.readyButton = this.domRef.querySelector(
      "#lobby-ready"
    ) as HTMLInputElement;

    const copyIdButton = this.domRef.querySelector(
      "#copy-lobby-id"
    ) as HTMLInputElement;

    const toggleSettingsButton = this.domRef.querySelector(
      "#toggle-lobby-settings"
    ) as HTMLInputElement;
    const settingsContainer = this.domRef.querySelector(
      ".settings-container"
    ) as HTMLElement;
    this.lobbySettingsDom = settingsContainer.querySelector(
      ".lobby-settings"
    ) as HTMLFormElement;

    const backToJoinButton = this.domRef.querySelector(
      "#lobby-back-button"
    ) as HTMLInputElement;

    document.addEventListener("keydown", this.keydown.bind(this));
    document.addEventListener("keyup", this.keyup.bind(this));

    const playerListDom = this.domRef.querySelector(".playerlist");

    this.scoreboardDom = document.createElement("div");
    this.scoreboardDom.classList.add("playerlist", "playerlist-scoreboard");

    this.statusListener = socket.on(
      ServerPacketType.GAME_STATUS,
      ({ id, status }) => {
        this.lobbyId = id;
        this.domRef.querySelector("#lobby-id").innerHTML = id;
        if (this.currentLobbyStatus && this.currentLobbyStatus !== status) {
          switch (status) {
            case SESSION_STATUS.IN_GAME:
              // ingame
              break;
            case SESSION_STATUS.LOBBY:
              // back from game into the lobby
              if (this.scoreboardCloseCallback) {
                this.scoreboardCloseCallback();
                this.scoreboardCloseCallback = null;
              }
              showDialog("Final Scoreboard", undefined, {
                actions: [
                  {
                    title: "Back to Lobby",
                    value: "back",
                    class: "button-outline",
                  },
                ],
                alternativeContentDom: this.scoreboardDom,
                callback: () => {
                  this.setActive();
                },
              });
              break;
          }
        }
        this.currentLobbyStatus = status;
        this.updateReadyButton();
      }
    );

    this.playerlistListener = socket.on(
      ServerPacketType.GAME_PLAYERLIST,
      ({ playerlist }) => {
        this.playerlist = playerlist;

        // render playerlist ready states
        playerListDom.innerHTML = [...this.playerlist]
          // .sort((a, b) => b.score - a.score)
          .map(
            (e) =>
              `<li class="playerlist-entry">
                ${e.name} <!-- (${e.score}) -->
                ${
                  e.ready
                    ? `<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>`
                    : `<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>`
                }
              </li>`
          )
          .join("");

        // render playerlist scoreboard
        this.scoreboardDom.innerHTML = [...this.playerlist]
          .sort((a, b) => b.score - a.score)
          .map(
            (e) =>
              `<li class="playerlist-entry">
                ${e.name}
                <div class="skewed-tag ${
                  e.playerId === globalState.me.id ? "skewed-tag-primary" : ""
                } tag-score">${e.score}</div>
              </li>`
          )
          .join("");

        const self = playerlist.find((e) => e.playerId === globalState.me.id);
        this.selfReady = self?.ready;
        this.updateReadyButton();
      }
    );

    this.gameSettingsListener = socket.on(
      ServerPacketType.GAME_SETTINGS,
      ({ currentSettings, availableQuestions }) => {
        this.renderSettings(currentSettings, availableQuestions);
      }
    );

    this.questionListener = socket.on(
      ServerPacketType.GAME_QUESTION,
      ({ id, question }) => {
        const screen = DOMScreen.spawnScreen(
          new QuestionScreen(this, id, question)
        ) as QuestionScreen;
        this.questions.set(id, screen);
      }
    );

    this.questionActiveListener = socket.on(
      ServerPacketType.GAME_QUESTION_ACTIVE,
      ({ id }) => {
        const q = this.questions.get(id);
        q.setActive();
      }
    );

    this.questionAnswersListener = socket.on(
      ServerPacketType.GAME_QUESTION_ANSWERS,
      ({ id, answers, playerAnswers }) => {
        const q = this.questions.get(id);
        q.showAnswers(answers, playerAnswers);
      }
    );

    this.selfLeftListener = socket.on(
      ServerPacketType.ME_LEFT_GAME,
      ({ reason }) => {
        this.leaveLobby();
        if (reason === PLAYER_LEFT_REASON.KICKED_INACTIVITY) {
          showDialog(
            "You were kicked",
            "You were kicked from the game due to inactivity."
          );
        }
      }
    );

    this.readyButton.addEventListener("click", (e) => {
      this.selfReady = !this.selfReady;
      socket.sendMsg(ClientPacketType.ME_READY, { ready: this.selfReady });
      this.updateReadyButton();
    });

    copyIdButton.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(this.lobbyId);
    });

    toggleSettingsButton.addEventListener("click", (e) => {
      e.preventDefault();
      settingsContainer.classList.toggle("settings-container--visible");
    });

    backToJoinButton.addEventListener("click", (e) => {
      e.preventDefault();
      socket.sendMsg(ClientPacketType.GAME_LEAVE);
    });

    this.lobbySettingsDom.addEventListener("submit", (e) => {
      e.preventDefault();
      socket.sendMsg(ClientPacketType.GAME_SETTINGS, {
        settings: {
          [GAME_SETTING.QUESTION_COUNT]: parseInt(
            (
              this.lobbySettingsDom.querySelector(
                `[name="${GAME_SETTING.QUESTION_COUNT}"]`
              ) as HTMLInputElement
            ).value
          ),

          [GAME_SETTING.ACTIVE_QUESTIONS]: Array.from(
            this.lobbySettingsDom.querySelectorAll(
              `[name="${GAME_SETTING.ACTIVE_QUESTIONS}"]:checked`
            )
          ).map((e: HTMLInputElement) => e.value as GAME_AVAILABLE_QUESTION_ID),

          [GAME_SETTING.MAIN_ROLE_ONLY]: (
            this.lobbySettingsDom.querySelector(
              `[name="${GAME_SETTING.MAIN_ROLE_ONLY}"]`
            ) as HTMLInputElement
          ).checked,

          [GAME_SETTING.MIN_POPULARITY]: parseInt(
            (
              this.lobbySettingsDom.querySelector(
                `[name="${GAME_SETTING.MIN_POPULARITY}"]`
              ) as HTMLInputElement
            ).value
          ),

          [GAME_SETTING.MAX_POPULARITY]: parseInt(
            (
              this.lobbySettingsDom.querySelector(
                `[name="${GAME_SETTING.MAX_POPULARITY}"]`
              ) as HTMLInputElement
            ).value
          ),
        },
      });
    });

    this.lobbySettingsDom.addEventListener("input", (e) => {
      e.preventDefault();
      this.lobbySettingsDom
        .querySelector(".button[name=update-settings]")
        .setAttribute("data-active", "true");
    });
  }

  renderSettings(
    settings: GameSettings,
    availableQuestions: GAME_AVAILABLE_QUESTION_ID[]
  ) {
    this.lobbySettingsDom.innerHTML = `
    <div class="lobby-settings-wrapper">
      <div class="lobby-settings-column">
          <div class="game-setting-entry">
            <label class="game-setting-title">No. of Questions:</label> 
            <input type="number" name="${
              GAME_SETTING.QUESTION_COUNT
            }" autocomplete="off" min=3 max=50 required value="${
      settings[GAME_SETTING.QUESTION_COUNT]
    }">
          </div>

          <div class="game-setting-entry">
              <label class="game-setting-title">Popularity:</label> 

              <div class="game-setting-double">
                <input type="number" name="${
                  GAME_SETTING.MIN_POPULARITY
                }" autocomplete="off" min=-1 max=10000 required value="${
      settings[GAME_SETTING.MIN_POPULARITY]
    }">
              -
                <input type="number" name="${
                  GAME_SETTING.MAX_POPULARITY
                }" autocomplete="off" min=-1 max=10000 required value="${
      settings[GAME_SETTING.MAX_POPULARITY]
    }">
              </div>

              <label class="game-setting-list-option" for="gs_mainOnly">
                  <input type="checkbox" id="gs_mainOnly" name="${
                    GAME_SETTING.MAIN_ROLE_ONLY
                  }" ${
      settings[GAME_SETTING.MAIN_ROLE_ONLY] ? "checked" : ""
    }> Main characters only
              </label>
            </div>
      </div>

      <div class="lobby-settings-column">
        <div class="game-setting-entry game-setting-list">
          <label class="game-setting-title">Questions:</label> 
          ${availableQuestions
            .map((qId) => {
              return `<label class="game-setting-list-option" for="q_${qId}">
              <input type="checkbox" id="q_${qId}" name="${
                GAME_SETTING.ACTIVE_QUESTIONS
              }" value="${qId}" ${
                settings[GAME_SETTING.ACTIVE_QUESTIONS].some((q) => qId === q)
                  ? "checked"
                  : ""
              }>
              ${getQuestionNameById(qId)}
            </label>`;
            })
            .join("")}
        </div>
      </div>  
    </div>
    
    <div class="lobby-settings-actions">
      <input type="submit" class="button button-outline" name="update-settings" value="Save">
    </div>`;
  }

  updateReadyButton() {
    this.readyButton.value =
      this.currentLobbyStatus === SESSION_STATUS.IN_GAME
        ? "GAME STARTING" // ingame, game just started?
        : this.selfReady
        ? "NOT Ready"
        : "READY";

    this.readyButton.setAttribute("data-active", this.selfReady + "");
    this.readyButton.disabled =
      this.currentLobbyStatus === SESSION_STATUS.IN_GAME;
  }

  getPlayerEntryById(id: string): PlayerListEntry {
    return this.playerlist.find((e) => {
      return e.playerId === id;
    });
  }

  leaveLobby() {
    DOMScreen.spawnScreen(new JoinScreen()).setActive("left");
    this.die();
  }

  template() {
    return `
    <h1 class="title-h1">LOBBY</h1>
    <section class="lobby-wrapper">
      <div class="multiple-container-wrapper">
        <div class="container settings-container">
          <div class="title-h2">SETTINGS</div>
          <form class="lobby-settings"></form>
        </div>

        <div class="container lobby-container">
          <div class="title-h3 lobby-title">
            Lobby Code: <br>
            <span class="title-h2">
            <span id="lobby-id">${this.lobbyId}</span>&nbsp;
              <a id="copy-lobby-id" title="Copy Lobby ID" class="button button-outline button-icon-inline" style="vertical-align: middle; margin-top: -8px">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C5.67392 7 4.40215 7.52678 3.46447 8.46447C2.52678 9.40215 2 10.6739 2 12C2 13.3261 2.52678 14.5979 3.46447 15.5355C4.40215 16.4732 5.67392 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C18.3261 17 19.5979 16.4732 20.5355 15.5355C21.4732 14.5979 22 13.3261 22 12C22 10.6739 21.4732 9.40215 20.5355 8.46447C19.5979 7.52678 18.3261 7 17 7Z" fill="currentColor"/>
                </svg>
              </a>
            </span>
          </div>
          <ul class="playerlist"></ul>
        </div>
      </div>
      <div class="lobby-action">
        <a id="toggle-lobby-settings" class="button button-outline button-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0001 15.5C11.0718 15.5 10.1816 15.1313 9.52521 14.4749C8.86883 13.8185 8.50008 12.9283 8.50008 12C8.50008 11.0717 8.86883 10.1815 9.52521 9.52513C10.1816 8.86875 11.0718 8.5 12.0001 8.5C12.9283 8.5 13.8186 8.86875 14.475 9.52513C15.1313 10.1815 15.5001 11.0717 15.5001 12C15.5001 12.9283 15.1313 13.8185 14.475 14.4749C13.8186 15.1313 12.9283 15.5 12.0001 15.5ZM19.4301 12.97C19.4701 12.65 19.5001 12.33 19.5001 12C19.5001 11.67 19.4701 11.34 19.4301 11L21.5401 9.37C21.7301 9.22 21.7801 8.95 21.6601 8.73L19.6601 5.27C19.5401 5.05 19.2701 4.96 19.0501 5.05L16.5601 6.05C16.0401 5.66 15.5001 5.32 14.8701 5.07L14.5001 2.42C14.4601 2.18 14.2501 2 14.0001 2H10.0001C9.75008 2 9.54008 2.18 9.50008 2.42L9.13008 5.07C8.50008 5.32 7.96008 5.66 7.44008 6.05L4.95008 5.05C4.73008 4.96 4.46008 5.05 4.34008 5.27L2.34008 8.73C2.21008 8.95 2.27008 9.22 2.46008 9.37L4.57008 11C4.53008 11.34 4.50008 11.67 4.50008 12C4.50008 12.33 4.53008 12.65 4.57008 12.97L2.46008 14.63C2.27008 14.78 2.21008 15.05 2.34008 15.27L4.34008 18.73C4.46008 18.95 4.73008 19.03 4.95008 18.95L7.44008 17.94C7.96008 18.34 8.50008 18.68 9.13008 18.93L9.50008 21.58C9.54008 21.82 9.75008 22 10.0001 22H14.0001C14.2501 22 14.4601 21.82 14.5001 21.58L14.8701 18.93C15.5001 18.67 16.0401 18.34 16.5601 17.94L19.0501 18.95C19.2701 19.03 19.5401 18.95 19.6601 18.73L21.6601 15.27C21.7801 15.05 21.7301 14.78 21.5401 14.63L19.4301 12.97Z" fill="currentColor"/>
          </svg>
        </a>
        <input type="button" class="button button-primary" id="lobby-ready" value="Ready!" disabled=true>
      </div>
    </section>
    <div class="bottom-container">
      <input type="button" id="lobby-back-button" class="button button-outline" value="Back">
    </div>`;
  }

  keydown(event: KeyboardEvent) {
    if (this.currentLobbyStatus !== SESSION_STATUS.IN_GAME) {
      return;
    }
    if (event.key !== "Tab") {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (event.repeat) {
      return;
    }

    if (this.scoreboardCloseCallback) {
      event.preventDefault();
      this.scoreboardCloseCallback();
      this.scoreboardCloseCallback = null;
    }

    const scoreboardClosePromise = new Promise<void>((res) => {
      this.scoreboardCloseCallback = res;
    });
    showDialog("Scoreboard", undefined, {
      actions: [],
      closeDialogPromise: scoreboardClosePromise,
      alternativeContentDom: this.scoreboardDom,
    });
  }

  keyup(event: KeyboardEvent) {
    if (event.key !== "Tab") {
      return;
    }

    if (this.scoreboardCloseCallback) {
      event.preventDefault();
      this.scoreboardCloseCallback();
      this.scoreboardCloseCallback = null;
    }
  }

  die() {
    super.die();

    // unregister all listeners
    socket.off(ServerPacketType.GAME_STATUS, this.statusListener);
    socket.off(ServerPacketType.GAME_PLAYERLIST, this.playerlistListener);
    socket.off(ServerPacketType.GAME_SETTINGS, this.gameSettingsListener);
    socket.off(ServerPacketType.GAME_QUESTION, this.questionListener);
    socket.off(
      ServerPacketType.GAME_QUESTION_ACTIVE,
      this.questionActiveListener
    );
    socket.off(
      ServerPacketType.GAME_QUESTION_ANSWERS,
      this.questionAnswersListener
    );
    socket.off(ServerPacketType.ME_LEFT_GAME, this.selfLeftListener);

    //cleanup existing questions in dom
    this.questions.forEach((q) => {
      q.die();
    });

    // unregister keyboard listeners
    document.removeEventListener("keydown", this.keydown);
    document.removeEventListener("keyup", this.keyup);
  }
}
