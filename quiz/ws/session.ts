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

  constructor() {
    allSessions.set(this.id, this);
    console.log("SESSION CREATED", this.id);
  }

  playerJoin(player: Player): boolean {
    if (this.status === SESSION_STATUS.LOBBY) {
      this.playerStates.set(player.id, { player, score: 0, ready: false });
      this.sendGameStatus();
      this.sendPlayerlist();
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
    this.game = new Game(this);
    this.updateStatus(SESSION_STATUS.IN_GAME);
    console.log("GAME CREATED", this.id);
  }

  updateStatus(status: SESSION_STATUS) {
    this.status = status;
    this.sendGameStatus();
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
