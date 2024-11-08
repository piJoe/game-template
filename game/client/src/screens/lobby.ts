import { GameSettings, GAME_SETTING } from "../../../common/types/game";
import {
  ClientPacketType,
  ServerPacketType,
} from "../../../common/types/packets";
import {
  PlayerListEntry,
  PLAYER_LEFT_REASON,
  SESSION_STATUS,
} from "../../../common/types/session";
import { globalState } from "../globalstate";
import { showDialog } from "../overlay";
import { socket } from "../websocket";
import { JoinScreen } from "./join";
import { DOMScreen } from "./screen";

export class LobbyScreen extends DOMScreen {
  protected killWhenInactive = false;
  protected additionalClasses = ["gradient-bg-screen"];

  private currentLobbyStatus: SESSION_STATUS = null;
  private statusListener: number;
  private playerlistListener: number;
  private gameSettingsListener: number;
  private selfLeftListener: number;
  private keyDownListener: (event: KeyboardEvent) => void;
  private keyUpListener: (event: KeyboardEvent) => void;
  private scoreboardDom: HTMLElement;
  private scoreboardCloseCallback: () => void;
  private lobbyId = "";
  private readyButton: HTMLInputElement;
  private lobbySettingsDom: HTMLFormElement;
  private settingsSubmitButton: HTMLInputElement;
  private selfReady = false;
  private playerlist: PlayerListEntry[] = [];
  private lobbyHost: PlayerListEntry;
  private currentSettings: GameSettings;

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

    this.lobbySettingsDom = this.domRef.querySelector(
      ".lobby-settings"
    ) as HTMLFormElement;

    const backToJoinButton = this.domRef.querySelector(
      "#lobby-back-button"
    ) as HTMLInputElement;

    this.keyDownListener = this.keydown.bind(this);
    this.keyUpListener = this.keyup.bind(this);
    document.addEventListener("keydown", this.keyDownListener);
    document.addEventListener("keyup", this.keyUpListener);

    const playerListDom = this.domRef.querySelector(".lobby-playerlist");

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
      ({ playerlist, host }) => {
        this.playerlist = playerlist;
        this.lobbyHost = this.playerlist.find((e) => e.playerId === host);

        const dummyFiller = new Array(
          Math.max(6 - this.playerlist.length, 0)
        ).fill(true);

        const playerListHTML = [...this.playerlist]
          // .sort((a, b) => b.score - a.score)
          .map(
            (e) =>
              `<li class="list-row">
                <div class="list-row-entry player-row-entry">
                  <div class="player-name">
                    <span>${e.name}</span>
                    <div class="player-icons">
                      ${
                        e === this.lobbyHost
                          ? `<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>Lobby Host</title><path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M16 14H8V15.5C8 15.77 8.19 15.96 8.47 16L8.57 16H15.43C15.74 16 15.95 15.84 16 15.59L16 15.5V14M17 8L17 8L14.33 10.67L12 8.34L9.67 10.67L7 8L7 8L8 13H16L17 8Z" /></svg>`
                          : ""
                      }
                    </div>
                  </div>
                  ${
                    e.ready
                      ? `<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>`
                      : `<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>`
                  }
                </div>
                <div class="list-row-entry player-row-more">
                  <div 
                    class="player-more-button" 
                    title="Show options"
                    data-player-id="${e.playerId}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                    </svg>
                  </div>
                </div>
              </li>`
          )
          .join("");

        const dummyHTML = dummyFiller
          .map(
            (e) =>
              `<li class="list-row">
                <div class="list-row-entry player-row-entry player-row-entry-empty">
                  <span class="player-name">Empty</span>
                </div>
                <div class="list-row-entry player-row-more"></div>
              </li>`
          )
          .join("");
        // render playerlist ready states
        playerListDom.innerHTML = playerListHTML + dummyHTML;

        // render playerlist scoreboard
        // this.scoreboardDom.innerHTML = [...this.playerlist]
        //   .sort((a, b) => b.score - a.score)
        //   .map(
        //     (e) =>
        //       `<li class="playerlist-entry">
        //         ${e.name}
        //         <div class="skewed-tag ${
        //           e.playerId === globalState.me.id ? "skewed-tag-primary" : ""
        //         } tag-score">${e.score}</div>
        //       </li>`
        //   )
        //   .join("");

        const self = playerlist.find((e) => e.playerId === globalState.me.id);
        this.selfReady = self?.ready;
        this.updateReadyButton();
        this.updateSaveSettingsButton();
      }
    );

    this.gameSettingsListener = socket.on(
      ServerPacketType.GAME_SETTINGS,
      ({ currentSettings }) => {
        this.currentSettings = currentSettings;
        this.renderSettings(currentSettings);
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

      // navigator.clipboard.writeText(this.lobbyId);
      navigator.clipboard.writeText(location.href);
    });
    const tabs = this.domRef.querySelectorAll("[data-tab]");
    const tabMenu = this.domRef.querySelector(".tab-menu");
    tabMenu.addEventListener("click", (e) => {
      e.preventDefault();
      const domElem = e.target as HTMLElement;
      const targetTab = domElem.getAttribute("data-target-tab");
      if (!targetTab) {
        return;
      }

      tabMenu
        .querySelector("[data-active=true]")
        .removeAttribute("data-active");
      domElem.setAttribute("data-active", "true");

      tabs.forEach((t) => {
        // set every tab inactive
        t.setAttribute("data-inactive", "true");

        // then find the tab that was selected, and remove inactive flag
        if (t.getAttribute("data-tab") === targetTab) {
          t.removeAttribute("data-inactive");
        }
      });
    });

    backToJoinButton.addEventListener("click", (e) => {
      e.preventDefault();
      socket.sendMsg(ClientPacketType.GAME_LEAVE);
    });

    this.lobbySettingsDom.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitSettings();
    });

    this.settingsSubmitButton = this.domRef.querySelector(
      ".button[name=update-settings]"
    );
    this.lobbySettingsDom.addEventListener("input", (e) => {
      e.preventDefault();

      // cancel any inputs if we're not host
      if (!this.selfIsHost()) {
        this.lobbySettingsDom.reset();
        return;
      }

      this.settingsSubmitButton.setAttribute("data-active", "true");
    });

    playerListDom.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const closestMore = target.closest(".player-more-button");
      if (!closestMore) {
        return;
      }
      const playerId = closestMore.getAttribute("data-player-id");
      const playerEntry = this.playerlist.find((e) => e.playerId === playerId);
      if (!playerEntry) {
        console.error("something went terribly wrong, idk how!");
        return;
      }

      if (this.lobbyHost.playerId !== globalState.me.id) {
        showDialog(
          "You're not the host.",
          "Only the host can interact with this."
        );
        return;
      }

      showDialog(playerEntry.name, "", {
        actions: [
          {
            title: "Cancel",
            class: "button-outline",
            value: "cancel",
          },
          {
            title: "Kick",
            class: "button-error",
            value: "kick",
          },
          {
            title: "Make Host",
            class: "button-primary",
            value: "makehost",
          },
        ],
        callback: (v) => {
          switch (v) {
            case "kick":
              showDialog("Work in Progress", "kekw");
              break;
            case "makehost":
              socket.sendMsg(ClientPacketType.GAME_CHANGE_HOST, {
                newHost: playerEntry.playerId,
              });
              break;
          }
        },
      });
    });
  }

  renderSettings(settings: GameSettings) {
    // render your settings here or don't
  }

  submitSettings() {
    // submit your settings here or don't
    socket.sendMsg(ClientPacketType.GAME_SETTINGS, {
      settings: {
        [GAME_SETTING.RANDOM_SETTING]: 0,
      },
    });
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

  updateSaveSettingsButton() {
    const button = this.domRef.querySelector(
      "#update-settings-button"
    ) as HTMLButtonElement;
    if (this.selfIsHost()) {
      button.value = "Save";
      button.disabled = false;
    } else {
      button.value = "Only host can save";
      button.disabled = true;
    }
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

  selfIsHost() {
    return this.lobbyHost && this.lobbyHost.playerId === globalState.me.id;
  }

  getSetting(setting: GAME_SETTING) {
    return this.currentSettings?.[setting] ?? null;
  }

  template() {
    return `
    <div class="title-bar">
      <h1 class="title-h1">LOBBY</h1>
      <div class="tab-menu">
        <div class="tab-menu-entry" data-active="true" data-target-tab="overview">Overview</div>
        <!-- <div class="tab-menu-entry" data-target-tab="presets">Presets</div> -->
        <div class="tab-menu-entry" data-target-tab="settings">Settings</div>
      </div>
      <div class="title-bar-spacer"></div>
    </div>

    <section class="content-wrapper" data-tab="overview">
      <div class="multiple-container-wrapper lobby-container-wrapper">

        <div class="container container-translucent lobby-container">
          <div class="title-h3 lobby-title">
            Lobby Code<br>
            <span class="title-h2">
            <span id="lobby-id">${this.lobbyId}</span>&nbsp;
              <a id="copy-lobby-id" title="Copy Link to Lobby" class="button button-outline button-icon-inline" style="vertical-align: middle; margin-top: -8px">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C5.67392 7 4.40215 7.52678 3.46447 8.46447C2.52678 9.40215 2 10.6739 2 12C2 13.3261 2.52678 14.5979 3.46447 15.5355C4.40215 16.4732 5.67392 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C18.3261 17 19.5979 16.4732 20.5355 15.5355C21.4732 14.5979 22 13.3261 22 12C22 10.6739 21.4732 9.40215 20.5355 8.46447C19.5979 7.52678 18.3261 7 17 7Z" fill="currentColor"/>
                </svg>
              </a>
            </span>
          </div>

          <dl>
            <dt>No. of Questions</dt>
            <dd id="lobby-dd-question-amount">20</dd>

            <dt>Can Switch Answer</dt>
            <dd id="lobby-dd-answer-switching">NO</dd>

            <dt>Timeout Mode</dt>
            <dd id="lobby-dd-timeout-mode">Normal</dd>

            <dt>Wrong Answer Penalty</dt>
            <dd id="lobby-dd-score-penalty">NO</dd>
          </dl>
        </div>

        <ul class="list lobby-playerlist">
        </ul>

      </div>
    </section>

    <section class="content-wrapper" data-tab="settings" data-inactive="true">
      <div class="container-wrapper">
        <form class="lobby-settings list" id="lobby-settings"></form>
      </div>
    </section>
    
    <section class="content-wrapper" data-tab="presets" data-inactive="true">
      <div class="grid-container-wrapper">
        <div class="container">Hier ist mein Preset und da steht sogar ne megagroße und ausführliche Beschreibung dabei</div>
        <div class="container">Hier ist mein Preset</div>
        <div class="container">Hier ist mein Preset</div>
        <div class="container">Hier ist mein Preset</div>
        <div class="container">Hier ist mein Preset</div>
      </div>
    </section>

    <div class="bottom-container" data-tab="overview">
      <input type="button" id="lobby-back-button" class="button button-outline" value="Leave">
      <input type="button" class="button button-primary" id="lobby-ready" value="Ready" disabled=true>
    </div>

    <div class="bottom-container" data-tab="settings" data-inactive="true">
      <input type="submit" class="button button-outline" name="update-settings" id="update-settings-button" form="lobby-settings" value="Save">
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

  setActive(
    direction?: "left" | "right" | "none" | "fade",
    asOverlay?: boolean
  ): void {
    super.setActive(direction, asOverlay);

    // set lobby id in url hash
    location.hash = "#/" + this.lobbyId;
  }

  setInactive(direction?: "left" | "right" | "none" | "fade"): void {
    super.setInactive(direction);

    // cleanup lobby id in url hash
    location.hash = "";
  }

  die() {
    super.die();

    // unregister all listeners
    socket.off(ServerPacketType.GAME_STATUS, this.statusListener);
    socket.off(ServerPacketType.GAME_PLAYERLIST, this.playerlistListener);
    socket.off(ServerPacketType.GAME_SETTINGS, this.gameSettingsListener);
    socket.off(ServerPacketType.ME_LEFT_GAME, this.selfLeftListener);

    // unregister keyboard listeners
    document.removeEventListener("keydown", this.keyDownListener);
    document.removeEventListener("keyup", this.keyUpListener);
  }
}
