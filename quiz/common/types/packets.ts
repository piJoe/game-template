import { GameSettings, GAME_AVAILABLE_QUESTION_ID } from "./game";
import { AdditionalAnswerMeta, ClientQuestion } from "./question";
import { PlayerListEntry, PLAYER_LEFT_REASON, SESSION_STATUS } from "./session";

export enum MediaType {
  AUDIO = "audio",
}

export enum ClientPacketType {
  GAME_CREATE = "game.create",
  GAME_JOIN = "game.join",
  GAME_LEAVE = "game.leave",
  GAME_SETTINGS = "game.settings",
  GAME_QUESTION_ANSWER = "game.question.answer",
  GAME_CHANGE_HOST = "game.change.host",
  PRELOAD_DONE = "preload.done",
  ME_CHANGE_NAME = "me.change_name",
  ME_READY = "me.ready",
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
  [ClientPacketType.PRELOAD_DONE]: {
    url: string;
  };
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
  [ClientPacketType.GAME_CHANGE_HOST]: {
    newHost: string;
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
  GAME_QUESTION_RESET_TIMEOUT = "game.question.reset.timeout",
  GAME_SETTINGS = "game.settings",
  PRELOAD_URL = "preload.url",
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
    host: string;
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
    additionalAnswerMeta?: AdditionalAnswerMeta;
  };
  [ServerPacketType.GAME_QUESTION_RESET_TIMEOUT]: {
    id: number;
    timeoutMs: number;
    reverse: boolean;
  };
  [ServerPacketType.GAME_SETTINGS]: {
    currentSettings: GameSettings;
    availableQuestions: GAME_AVAILABLE_QUESTION_ID[];
  };
  [ServerPacketType.PRELOAD_URL]: {
    url: string;
    type: MediaType;
  };
  [ServerPacketType.ERROR]: {
    title: string;
    msg?: string;
  };
};
export type ServerPacketKey = keyof ServerPackets;
