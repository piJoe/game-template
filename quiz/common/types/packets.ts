import { GameSetting, GameSettingInput } from "./game";
import { ClientQuestion } from "./question";
import { PlayerListEntry, PLAYER_LEFT_REASON, SESSION_STATUS } from "./session";

export enum ClientPacketType {
  GAME_CREATE = "game.create",
  GAME_JOIN = "game.join",
  GAME_LEAVE = "game.leave",
  GAME_QUESTION_ANSWER = "game.question.answer",
  ME_CHANGE_NAME = "me.change_name",
  ME_READY = "me.ready",
}
export type ClientPackets = {
  [ClientPacketType.GAME_CREATE]: undefined;
  [ClientPacketType.GAME_JOIN]: {
    id: string;
  };
  [ClientPacketType.GAME_LEAVE]: undefined;
  [ClientPacketType.ME_CHANGE_NAME]: {
    name: string;
  };
  [ClientPacketType.ME_READY]: {
    ready: boolean;
  };
  [ClientPacketType.GAME_QUESTION_ANSWER]: {
    questionId: number;
    answer: number;
  };
};
export type ClientPacketKey = keyof ClientPackets;

export enum ServerPacketType {
  ME = "me",
  ME_LEFT_GAME = "me.game.left",
  GAME_STATUS = "game.status",
  GAME_PLAYERLIST = "game.playerlist",
  GAME_QUESTION = "game.question",
  GAME_QUESTION_ACTIVE = "game.question.active",
  GAME_QUESTION_ANSWERS = "game.question.answers",
  GAME_AVAILABLE_SETTINGS = "game.settings.available",
  GAME_SETTINGS_CHANGE = "game.settings.change",
  ERROR = "generic.error",
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
    count: number;
  };
  [ServerPacketType.GAME_QUESTION]: {
    id: number;
    question: ClientQuestion;
  };
  [ServerPacketType.GAME_QUESTION_ACTIVE]: {
    id: number;
    question: ClientQuestion;
  };
  [ServerPacketType.GAME_QUESTION_ANSWERS]: {
    id: number;
    answers: {
      wrong: number[];
      correct: number[];
    };
    playerAnswers: {
      [key: string]: number;
    };
  };
  [ServerPacketType.GAME_AVAILABLE_SETTINGS]: {
    inputs: GameSettingInput[];
    currentSettings: GameSetting[];
  };
  [ServerPacketType.GAME_SETTINGS_CHANGE]: {
    settings: GameSetting[];
  };
  [ServerPacketType.ERROR]: {
    title: string;
    msg?: string;
  };
};
export type ServerPacketKey = keyof ServerPackets;
