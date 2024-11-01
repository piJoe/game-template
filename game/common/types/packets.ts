import { GameSettings } from "./game";
import { PlayerListEntry, PLAYER_LEFT_REASON, SESSION_STATUS } from "./session";

export enum ClientPacketType {
  GAME_CREATE = "game.create",
  GAME_JOIN = "game.join",
  GAME_LEAVE = "game.leave",
  GAME_SETTINGS = "game.settings",
  GAME_CHANGE_HOST = "game.change.host",
  ME_CHANGE_NAME = "me.change_name",
  ME_READY = "me.ready",
  // add your client side packages here
  EXAMPLE_GAME_INTERACITON = "example.game.interaction",
}
export type ClientPackets = {
  [ClientPacketType.GAME_CREATE]: undefined;
  [ClientPacketType.GAME_JOIN]: {
    id: string;
  };
  [ClientPacketType.GAME_LEAVE]: undefined;
  [ClientPacketType.GAME_SETTINGS]: {
    settings: GameSettings;
  };
  [ClientPacketType.ME_CHANGE_NAME]: {
    name: string;
  };
  [ClientPacketType.ME_READY]: {
    ready: boolean;
  };
  [ClientPacketType.GAME_CHANGE_HOST]: {
    newHost: string;
  };
  // add your client side packages here
  [ClientPacketType.EXAMPLE_GAME_INTERACITON]: undefined;
};
export type ClientPacketKey = keyof ClientPackets;

export enum ServerPacketType {
  ME = "me",
  ME_LEFT_GAME = "me.game.left",
  GAME_STATUS = "game.status",
  GAME_PLAYERLIST = "game.playerlist",
  GAME_SETTINGS = "game.settings",
  ERROR = "generic.error",
  // add your server side packages here
}
export type ServerPackets = {
  [ServerPacketType.ME]: {
    name: string;
    id: string;
  };
  [ServerPacketType.ME_LEFT_GAME]: {
    reason: PLAYER_LEFT_REASON;
  };
  [ServerPacketType.GAME_STATUS]: {
    id: string;
    status: SESSION_STATUS;
  };
  [ServerPacketType.GAME_PLAYERLIST]: {
    playerlist: PlayerListEntry[];
    host: string;
    count: number;
  };
  [ServerPacketType.GAME_SETTINGS]: {
    currentSettings: GameSettings;
  };
  [ServerPacketType.ERROR]: {
    title: string;
    msg?: string;
  };
  // add your server side packages here
};
export type ServerPacketKey = keyof ServerPackets;
