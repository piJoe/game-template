export enum SESSION_STATUS {
  LOBBY = "LOBBY",
  IN_GAME = "IN_GAME",
}

export interface PlayerListEntry {
  playerId: string;
  name: string;
  ready: boolean;
  score: number;
}
