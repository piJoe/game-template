import escapeHTML from "escape-html";
import { WebSocket } from "ws";
import {
  ClientPacketKey,
  ClientPackets,
  ClientPacketType,
  ServerPacketKey,
  ServerPackets,
  ServerPacketType,
} from "../common/types/packets";
import { PLAYER_LEFT_REASON } from "../common/types/session";
import { logger } from "../logging";
import { generateUniqueId } from "../utils/uid";
import { getGameSessionById, GameSession } from "./session";

const PING_INTERVAL = 10_000;
const PING_TIMEOUT = PING_INTERVAL * 6;
const ACTIVITY_TIMEOUT = 180_000;

const allPlayers = new Map<string, Player>();

export class Player {
  public id = generateUniqueId(6, { lookupMap: allPlayers, prefix: "p_" });
  public socket: WebSocket;
  public name: string;
  public gameSession: GameSession | null = null;
  private pingInterval: ReturnType<typeof setTimeout>;
  private lastActivity: number;
  private lastPing: number;

  constructor(socket: WebSocket, name = generateUniqueId(5)) {
    this.socket = socket;
    this.name = name;

    this.socket.once("close", () => {
      this.disconnect();
    });

    allPlayers.set(this.id, this);
    this.sendSelf();
    this.updateActivity();

    this.pingInterval = setInterval(() => {
      // close connection if last ping
      if (this.lastPing <= Date.now() - PING_TIMEOUT) {
        logger.info("Player kicked", {
          reason: "inactivity",
          playerId: this.id,
          playerName: this.name,
        });
        this.socket.close();
        this.disconnect();
        return;
      }

      this.socket.ping();
    }, PING_INTERVAL);
  }

  handleMessage<T extends ClientPacketKey>(type: T, data: ClientPackets[T]) {
    switch (type) {
      case ClientPacketType.GAME_CREATE:
        const game = new GameSession();
        this.joinSession(game.id);
        break;
      case ClientPacketType.GAME_JOIN:
        const { id } = data as ClientPackets[ClientPacketType.GAME_JOIN];
        this.joinSession(id);
        break;
      case ClientPacketType.GAME_LEAVE:
        this.leaveSession();
        break;
      case ClientPacketType.GAME_SETTINGS:
        const { settings } =
          data as ClientPackets[ClientPacketType.GAME_SETTINGS];
        this.gameSession.updateGameSettings(this, settings);
        break;
      case ClientPacketType.GAME_CHANGE_HOST:
        const { newHost } =
          data as ClientPackets[ClientPacketType.GAME_CHANGE_HOST];
        this.gameSession.tryChangeHost(this, newHost);
        break;
      case ClientPacketType.ME_CHANGE_NAME:
        const { name } = data as ClientPackets[ClientPacketType.ME_CHANGE_NAME];
        this.updateName(escapeHTML(name));
        break;
      case ClientPacketType.ME_READY:
        const { ready } = data as ClientPackets[ClientPacketType.ME_READY];
        this.setReady(ready);
        break;
      // let the game instance handle *any* game interaction
      case ClientPacketType.EXAMPLE_GAME_INTERACITON:
        this.gameSession?.game?.handleGameInteraction(this, type, data);
        break;
      default:
        throw Error("Not yet implemented" + type);
    }

    // everytime a message comes from the client, we can assume he's not afk
    this.updateActivity();
  }

  sendSelf() {
    this.sendMsg(ServerPacketType.ME, { id: this.id, name: this.name });
  }

  sendMsg<T extends ServerPacketKey>(type: T, data: ServerPackets[T]) {
    this.socket.send(JSON.stringify({ type, data }));
  }

  sendError(title: string, msg?: string) {
    this.sendMsg(ServerPacketType.ERROR, { title, msg });
  }

  joinSession(gameId: string) {
    // first, leave any already connected game session
    this.leaveSession();

    // then find the new one and join
    const game = getGameSessionById(gameId);
    if (!game) {
      this.sendError(`No session exists with id "${gameId}"`);
      return;
    }
    if (!game.playerJoin(this)) {
      this.sendError(
        `You cannot join the game "${gameId}" right now, because it's already running.`
      );
      return;
    }
    this.gameSession = game;
  }

  leaveSession(reason: PLAYER_LEFT_REASON = PLAYER_LEFT_REASON.SELF_LEAVE) {
    if (!this.gameSession) {
      //TOOD: NO GAME FOUND, THROW SOME ERRORS, OR NOT
      return;
    }

    this.gameSession.playerLeave(this, reason);
    this.gameSession = null;
  }

  updateName(name: string) {
    if (name.length < 3) {
      this.sendError(`Minlength is 3 chars.`);
      return;
    }
    this.name = name.slice(0, 16);
    this.sendSelf();
    if (this.gameSession) this.gameSession.sendPlayerlist();
  }

  setReady(ready: boolean) {
    if (!this.gameSession) {
      //TOOD: NO GAME FOUND, THROW SOME ERRORS, OR NOT
      return;
    }

    this.gameSession.playerReady(this, ready);
  }

  get isInactive(): boolean {
    return this.lastActivity <= Date.now() - ACTIVITY_TIMEOUT;
  }

  updateActivity() {
    this.lastActivity = Date.now();
  }

  updateLastPing() {
    this.lastPing = Date.now();
  }

  disconnect() {
    if (this.socket) {
      this.socket.terminate();
    }
    this.destroy();
  }

  destroy() {
    this.leaveSession();
    allPlayers.delete(this.id);
    this.gameSession = null;
    clearInterval(this.pingInterval);
  }
}
