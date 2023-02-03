import {
  ClientPacketKey,
  ClientPackets,
  ServerPacketKey,
  ServerPackets,
  ServerPacketType,
} from "../../common/types/packets";
import { showDialog } from "./overlay";

class Socket {
  private ws: WebSocket = null;
  private listener = new Map<
    ServerPacketType,
    { callback: (data: any) => void; once: boolean; id: number }[]
  >();
  private listenerId = 0;
  constructor() {}

  public open() {
    if (this.ws) {
      throw new Error("Socket is already open??");
    }
    this.ws = new WebSocket(
      `${location.protocol === "http:" ? "ws:" : "wss:"}//${location.host}/`
    );
    this.ws.addEventListener("message", (m) => {
      const { type, data } = JSON.parse(m.data);
      this.handleMessage(type, data);
    });
    this.ws.addEventListener("close", () => {
      showDialog(
        "You were disconnected",
        "The session was closed by the server.",
        {
          callback: () => {
            window.onbeforeunload = null;
            location.reload();
          },
        }
      );
    });
    return new Promise<void>((res) => {
      this.ws.addEventListener(
        "open",
        () => {
          res();
        },
        { once: true }
      );
    });
  }

  public isOpen(): boolean {
    return this.ws !== null;
  }

  public sendMsg<T extends ClientPacketKey>(type: T, data?: ClientPackets[T]) {
    this.ws.send(JSON.stringify({ type, data }));
  }

  public on<T extends ServerPacketKey>(
    type: T,
    callback: (data: ServerPackets[T]) => void,
    once = false
  ): number {
    if (!this.listener.has(type)) {
      this.listener.set(type, []);
    }
    const id = this.listenerId++;
    this.listener.get(type).push({ callback, once, id });
    return id;
  }

  public once<T extends ServerPacketKey>(
    type: T,
    callback: (data: ServerPackets[T]) => void
  ): number {
    return this.on(type, callback, true);
  }

  private callListeners<T extends ServerPacketKey>(
    type: T,
    data: ServerPackets[T]
  ) {
    const listeners = this.listener.get(type);
    if (!listeners) {
      return;
    }
    [...listeners].forEach((l, i) => {
      l.callback(data);
      if (l.once) {
        listeners.splice(i, 1);
      }
    });
  }

  public off<T extends ServerPacketKey>(type: T, id: number) {
    const listeners = this.listener.get(type);
    if (!listeners) {
      return;
    }
    const idx = listeners.findIndex((o) => o.id === id);
    if (idx > -1) {
      listeners.splice(idx, 1);
    }
  }

  private handleMessage<T extends ServerPacketKey>(
    type: T,
    data: ServerPackets[T]
  ) {
    switch (type) {
      case ServerPacketType.ME:
        this.callListeners(
          ServerPacketType.ME,
          data as ServerPackets[ServerPacketType.ME]
        );
        break;
      case ServerPacketType.ME_LEFT_GAME:
        this.callListeners(
          ServerPacketType.ME_LEFT_GAME,
          data as ServerPackets[ServerPacketType.ME_LEFT_GAME]
        );
        break;
      case ServerPacketType.GAME_STATUS:
        this.callListeners(
          ServerPacketType.GAME_STATUS,
          data as ServerPackets[ServerPacketType.GAME_STATUS]
        );
        break;
      case ServerPacketType.GAME_PLAYERLIST:
        this.callListeners(
          ServerPacketType.GAME_PLAYERLIST,
          data as ServerPackets[ServerPacketType.GAME_PLAYERLIST]
        );
        break;
      case ServerPacketType.GAME_SETTINGS:
        this.callListeners(
          ServerPacketType.GAME_SETTINGS,
          data as ServerPackets[ServerPacketType.GAME_SETTINGS]
        );
        break;
      case ServerPacketType.GAME_QUESTION:
        this.callListeners(
          ServerPacketType.GAME_QUESTION,
          data as ServerPackets[ServerPacketType.GAME_QUESTION]
        );
        break;
      case ServerPacketType.GAME_QUESTION_ACTIVE:
        this.callListeners(
          ServerPacketType.GAME_QUESTION_ACTIVE,
          data as ServerPackets[ServerPacketType.GAME_QUESTION_ACTIVE]
        );
        break;
      case ServerPacketType.GAME_QUESTION_ANSWERS:
        this.callListeners(
          ServerPacketType.GAME_QUESTION_ANSWERS,
          data as ServerPackets[ServerPacketType.GAME_QUESTION_ANSWERS]
        );
        break;
      case ServerPacketType.GAME_QUESTION_RESET_TIMEOUT:
        this.callListeners(
          ServerPacketType.GAME_QUESTION_RESET_TIMEOUT,
          data as ServerPackets[ServerPacketType.GAME_QUESTION_RESET_TIMEOUT]
        );
        break;
      case ServerPacketType.ERROR:
        this.callListeners(
          ServerPacketType.ERROR,
          data as ServerPackets[ServerPacketType.ERROR]
        );
        break;
      default:
        throw Error("Not yet implemented" + type);
    }
  }
}

export const socket = new Socket();
