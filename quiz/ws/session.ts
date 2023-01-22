import {
  GameSettings,
  GAME_AVAILABLE_QUESTION_ID,
  GAME_SETTING,
} from "../common/types/game";
import {
  ServerPacketKey,
  ServerPackets,
  ServerPacketType,
} from "../common/types/packets";
import {
  PlayerListEntry,
  PLAYER_LEFT_REASON,
  SESSION_STATUS,
} from "../common/types/session";
import { generateUniqueId } from "../utils/uid";
import { Game } from "./game";
import { Player } from "./player";

const allSessions = new Map<string, GameSession>();

export interface PlayerState {
  player: Player;
  score: number;
  ready: boolean;
}

export class GameSession {
  public id = generateUniqueId(4, { lookupMap: allSessions });
  public playerStates = new Map<string, PlayerState>();
  public status = SESSION_STATUS.LOBBY;
  public game: Game;
  private settings: GameSettings = {
    [GAME_SETTING.QUESTION_COUNT]: 20,
    [GAME_SETTING.ACTIVE_QUESTIONS]: [...Game.ALL_AVAILABLE_QUESTIONS],
    [GAME_SETTING.MAIN_ROLE_ONLY]: false,
    [GAME_SETTING.MIN_POPULARITY]: -1,
    [GAME_SETTING.MAX_POPULARITY]: -1,
  };

  constructor() {
    allSessions.set(this.id, this);
    console.log("SESSION CREATED", this.id);
  }

  playerJoin(player: Player): boolean {
    if (this.status === SESSION_STATUS.LOBBY) {
      this.playerStates.set(player.id, { player, score: 0, ready: false });
      this.sendGameStatus();
      this.sendPlayerlist();
      this.sendGameSettings(player);
      console.log("PLAYER JOINED", this.id, player.id, player.name);
      return true;
    }

    return false;
  }

  playerLeave(player: Player, reason: PLAYER_LEFT_REASON) {
    console.log("PLAYER LEFT", this.id, player.id, player.name);
    player.sendMsg(ServerPacketType.ME_LEFT_GAME, {
      reason,
    });
    this.playerStates.delete(player.id);
    this.sendPlayerlist();

    // destroy this game session, when no players left
    if (this.playerCount < 1) {
      this.destroy();
    }
  }

  playerReady(player: Player, ready: boolean) {
    const playerState = this.playerStates.get(player.id);
    if (!playerState || this.status === SESSION_STATUS.IN_GAME) {
      // TOOD: throw error or something, idk
      return;
    }
    playerState.ready = ready;
    this.sendPlayerlist();

    // as long as there are players not ready (!s.ready) continue like normal
    if ([...this.playerStates.values()].some((s) => !s.ready)) {
      return;
    }

    // when we have every player ready, create and start the game
    if (this.game) {
      return;
    }
    this.game = new Game(this, this.settings);
    this.updateStatus(SESSION_STATUS.IN_GAME);
    console.log("GAME CREATED", this.id);
  }

  updateStatus(status: SESSION_STATUS) {
    this.status = status;
    this.sendGameStatus();
  }

  updateGameSettings(settings: GameSettings) {
    if (typeof settings[GAME_SETTING.QUESTION_COUNT] !== "number") {
      console.error("failed to validate settings");
      return;
    }
    if (!Array.isArray(settings[GAME_SETTING.ACTIVE_QUESTIONS])) {
      console.error("failed to validate settings");
      return;
    }
    if (typeof settings[GAME_SETTING.MAIN_ROLE_ONLY] !== "boolean") {
      console.error("failed to validate settings");
      return;
    }
    if (typeof settings[GAME_SETTING.MIN_POPULARITY] !== "number") {
      console.error("failed to validate settings");
      return;
    }
    if (typeof settings[GAME_SETTING.MAX_POPULARITY] !== "number") {
      console.error("failed to validate settings");
      return;
    }

    this.settings[GAME_SETTING.QUESTION_COUNT] = Math.min(
      Math.max(Game.MIN_QUESTION_AMOUNT, settings[GAME_SETTING.QUESTION_COUNT]),
      Game.MAX_QUESTION_AMOUNT
    );

    this.settings[GAME_SETTING.ACTIVE_QUESTIONS] = settings[
      GAME_SETTING.ACTIVE_QUESTIONS
    ].filter((q) => Game.ALL_AVAILABLE_QUESTIONS.includes(q));

    this.settings[GAME_SETTING.MAIN_ROLE_ONLY] =
      settings[GAME_SETTING.MAIN_ROLE_ONLY] ?? false;

    this.settings[GAME_SETTING.MIN_POPULARITY] = Math.min(
      Math.max(-1, settings[GAME_SETTING.MIN_POPULARITY]),
      10000
    );
    if (this.settings[GAME_SETTING.MIN_POPULARITY] < 1) {
      this.settings[GAME_SETTING.MIN_POPULARITY] = -1;
    }

    this.settings[GAME_SETTING.MAX_POPULARITY] = Math.min(
      Math.max(-1, settings[GAME_SETTING.MAX_POPULARITY]),
      10000
    );
    if (this.settings[GAME_SETTING.MAX_POPULARITY] < 1) {
      this.settings[GAME_SETTING.MAX_POPULARITY] = -1;
    }

    this.sendGameSettings();
  }

  gameEnded() {
    if (!this.game) {
      return;
    }
    this.game = null;
    this.playerStates.forEach((s) => (s.ready = false));
    this.sendPlayerlist();
    console.log("GAME ENDED", this.id);
  }

  kickInactivePlayers() {
    this.playerStates.forEach((pS) => {
      if (pS.player.isInactive) {
        pS.player.leaveSession(PLAYER_LEFT_REASON.KICKED_INACTIVITY);
      }
    });
  }

  resetPlayerLastActivity() {
    this.playerStates.forEach((pS) => {
      pS.player.updateActivity();
    });
  }

  sendGameStatus() {
    this.sendMsg(ServerPacketType.GAME_STATUS, {
      id: this.id,
      status: this.status,
    });
  }

  sendPlayerlist() {
    const playerlist = this.playerList;
    const count = this.playerCount;
    this.sendMsg(ServerPacketType.GAME_PLAYERLIST, { playerlist, count });
  }

  sendGameSettings(player?: Player) {
    const data = {
      currentSettings: this.settings,
      availableQuestions: Game.ALL_AVAILABLE_QUESTIONS,
    };

    if (!player) {
      this.sendMsg(ServerPacketType.GAME_SETTINGS, data);
      return;
    }

    player.sendMsg(ServerPacketType.GAME_SETTINGS, data);
  }

  sendMsg<T extends ServerPacketKey>(type: T, data: ServerPackets[T]) {
    const msg = JSON.stringify({ type, data });
    this.playerStates.forEach((pS) => {
      pS.player.socket.send(msg);
    });
  }

  resetPlayerScores() {
    this.playerStates.forEach((s) => {
      s.score = 0;
    });
    this.sendPlayerlist();
  }

  addPlayerScore(playerId: string, addAmount = 1) {
    const state = this.playerStates.get(playerId);
    if (!state) {
      return;
    }
    state.score += addAmount;
  }

  get playerCount(): number {
    return this.playerStates.size;
  }

  get playerList(): PlayerListEntry[] {
    return [...this.playerStates.values()].map((pS) => {
      return {
        playerId: pS.player.id,
        name: pS.player.name,
        ready: pS.ready,
        score: pS.score,
      };
    });
  }

  destroy() {
    console.log("SESSION DESTROYED", this.id);
    allSessions.delete(this.id);
    if (this.game) {
      this.game.endGame();
    }
  }
}

export function getGameSessionById(gameId: string) {
  return allSessions.get(gameId.toUpperCase());
}
