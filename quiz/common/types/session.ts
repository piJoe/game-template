export enum SESSION_STATUS {
  LOBBY = "LOBBY",
  IN_GAME = "IN_GAME",
}

export enum PLAYER_LEFT_REASON {
  SELF_LEAVE = "SELF_LEAVE",
  KICKED_INACTIVITY = "KICKED_INACTIVITY",
}

export interface PlayerListEntry {
  playerId: string;
  name: string;
  ready: boolean;
  score: number;
}
