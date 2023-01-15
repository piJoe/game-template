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
import { generateUniqueId } from "../utils/uid";
import { getGameSessionById, GameSession } from "./session";

const allPlayers = new Map<string, Player>();

export class Player {
  public id = generateUniqueId(6, { lookupMap: allPlayers, prefix: "p_" });
  public socket: WebSocket;
  public name: string;
  public gameSession: GameSession | null = null;
  public lastActivity: number;

  constructor(socket: WebSocket, name = generateUniqueId(5)) {
    console.log("PLAYER CONNECTED", this.id);
    this.socket = socket;
    this.name = name;

    this.socket.once("close", () => {
      console.log("PLAYER DISCONNECTED", this.id);
      this.socket.terminate();
      this.destroy();
    });

    allPlayers.set(this.id, this);
    this.sendSelf();
    this.updateActivity();
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
      case ClientPacketType.GAME_QUESTION_ANSWER:
        const { questionId, answer } =
          data as ClientPackets[ClientPacketType.GAME_QUESTION_ANSWER];
        this.answerQuestion(questionId, answer);
        break;
      case ClientPacketType.ME_CHANGE_NAME:
        const { name } = data as ClientPackets[ClientPacketType.ME_CHANGE_NAME];
        this.updateName(escapeHTML(name));
        break;
      case ClientPacketType.ME_READY:
        const { ready } = data as ClientPackets[ClientPacketType.ME_READY];
        this.setReady(ready);
        break;
    }
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

  leaveSession() {
    if (!this.gameSession) {
      //TOOD: NO GAME FOUND, THROW SOME ERRORS, OR NOT
      return;
    }

    this.gameSession.playerLeave(this);
    this.gameSession = null;
  }

  answerQuestion(qId: number, answer: number) {
    if (!this.gameSession?.game) {
      //TOOD: NO GAME FOUND, THROW SOME ERRORS, OR NOT
      return;
    }
    this.gameSession.game.setPlayerAnswer(this, qId, answer);
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

  updateActivity() {
    this.lastActivity = Date.now();
  }

  destroy() {
    this.leaveSession();
    allPlayers.delete(this.id);
    this.gameSession = null;
  }
}
