import { GameSettings, GAME_SETTING } from "../common/types/game";
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
import { logger } from "../logging";
import { generateUniqueId } from "../utils/uid";
import { Game } from "./game";
import { Player } from "./player";

const allSessions = new Map<string, GameSession>();

export interface PlayerState {
  player: Player;
  ready: boolean;
}

export class GameSession {
  public id = generateUniqueId(4, { lookupMap: allSessions });
  public playerStates = new Map<string, PlayerState>();
  public sessionHost: Player;
  public status = SESSION_STATUS.LOBBY;
  public game: Game;
  private settings: GameSettings = {
    [GAME_SETTING.RANDOM_SETTING]: 0,
  };

  constructor() {
    allSessions.set(this.id, this);
    logger.info("Session created", {
      lobbyId: this.id,
    });
  }

  playerJoin(player: Player): boolean {
    if (this.status === SESSION_STATUS.LOBBY) {
      this.playerStates.set(player.id, { player, ready: false });
      this.updateHost();
      this.sendGameStatus();
      this.sendPlayerlist();
      this.sendGameSettings(player);
      logger.info("Player joined", {
        lobbyId: this.id,
        playerId: player.id,
        playerName: player.name,
      });
      return true;
    }

    return false;
  }

  playerLeave(player: Player, reason: PLAYER_LEFT_REASON) {
    logger.info("Player left", {
      reason: reason,
      lobbyId: this.id,
      playerId: player.id,
      playerName: player.name,
    });

    player.sendMsg(ServerPacketType.ME_LEFT_GAME, {
      reason,
    });
    this.playerStates.delete(player.id);
    this.updateHost();
    this.checkReadyStatus();
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
    this.checkReadyStatus();
  }

  private updateHost(player?: Player) {
    // if player is given, set them directly
    if (player) {
      this.sessionHost = player;
      return;
    }

    // no given player, check if host is empty or the current host does
    // no longer exist as a player, then make the first player
    // in this.playerStates the new host
    if (!this.sessionHost || !this.playerStates.has(this.sessionHost.id)) {
      const newHostState: PlayerState = this.playerStates.values().next().value;

      // if there are no more players left, do nothing
      if (!newHostState) {
        this.sessionHost = undefined;
        return;
      }
      this.sessionHost = newHostState.player;
    }
  }

  tryChangeHost(player: Player, newHostId: string) {
    if (this.sessionHost !== player) {
      player.sendMsg(ServerPacketType.ERROR, {
        title: "Only the current host can determine the new host.",
      });
      return;
    }

    const newHostState = this.playerStates.get(newHostId);
    if (!newHostState) {
      player.sendMsg(ServerPacketType.ERROR, {
        title: `There is no Player with ID ${newHostId} in this Lobby.`,
      });
      return;
    }

    this.updateHost(newHostState.player);
    this.sendPlayerlist();
  }

  checkReadyStatus() {
    // as long as there are players not ready (!s.ready) continue like normal
    if (
      [...this.playerStates.values()].some((s) => !s.ready) ||
      this.playerStates.size < 1
    ) {
      return;
    }

    // when we have every player ready, create and start the game
    if (this.game) {
      return;
    }
    this.updateStatus(SESSION_STATUS.IN_GAME);
    this.game = new Game(this, this.settings);
    logger.info("Game created", {
      lobbyId: this.id,
      players: this.playerList.map((e) => e.name),
    });
  }

  updateStatus(status: SESSION_STATUS) {
    this.status = status;
    this.sendGameStatus();
  }

  updateGameSettings(player: Player, settings: GameSettings) {
    if (this.sessionHost !== player) {
      player.sendMsg(ServerPacketType.ERROR, {
        title: "Only the host can change settigns.",
      });
      return;
    }

    if (this.status === SESSION_STATUS.IN_GAME) {
      player.sendMsg(ServerPacketType.ERROR, {
        title: "Cannot change settings when in game.",
      });
      return;
    }

    if (typeof settings[GAME_SETTING.RANDOM_SETTING] !== "number") {
      console.error("failed to validate settings");
      return;
    }

    this.settings[GAME_SETTING.RANDOM_SETTING] =
      settings[GAME_SETTING.RANDOM_SETTING];

    this.unreadyAllPlayers();
    this.sendGameSettings();
  }

  unreadyAllPlayers() {
    this.playerStates.forEach((s) => (s.ready = false));
    this.sendPlayerlist();
  }

  gameEnded() {
    if (!this.game) {
      return;
    }
    this.game = null;
    this.playerStates.forEach((s) => (s.ready = false));
    this.sendPlayerlist();
    logger.info("Game ended", {
      lobbyId: this.id,
    });
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
    this.sendMsg(ServerPacketType.GAME_PLAYERLIST, {
      playerlist,
      count,
      host: this.sessionHost?.id ?? "",
    });
  }

  sendGameSettings(player?: Player) {
    const data = {
      currentSettings: this.settings,
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

  get playerCount(): number {
    return this.playerStates.size;
  }

  get playerList(): PlayerListEntry[] {
    return [...this.playerStates.values()].map((pS) => {
      return {
        playerId: pS.player.id,
        name: pS.player.name,
        ready: pS.ready,
      };
    });
  }

  destroy() {
    logger.info("Session destroyed", {
      lobbyId: this.id,
    });
    allSessions.delete(this.id);
    if (this.game) {
      this.game.endGame();
    }
  }
}

export function getGameSessionById(gameId: string) {
  return allSessions.get(gameId.toUpperCase());
}
