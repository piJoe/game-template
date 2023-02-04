import { ServerQuestion } from "./question";

export enum GAME_STATUS {
  CREATED = 0,
  GENERATING,
  RUNNING,
  FINISHED,
}

export interface AnimeQuestionGenerator {
  id: GAME_AVAILABLE_QUESTION_ID;
  name: string;
  create: (count: number, any?) => Promise<ServerQuestion[]>;
}

export enum GAME_AVAILABLE_QUESTION_ID {
  ANIME_FROM_CHAR = "animeFromChar",
  ANIME_GENRE = "animeGenre",
  ANIME_STUDIO = "animeStudio",
  CHAR_BY_PICTURE = "charByPicture",
  ANIME_OPENING = "animeOpening",
}

export enum ANSWER_TIMEOUT_MODE {
  ALWAYS_TIMEOUT = "alwaysTimeout",
  // ALWAYS_WAIT_PLAYERS = "alwaysPlayers",
  WAIT_PLAYERS_OR_TIMEOUT = "playersOrTimeout",
  WAIT_FIRST_ANSWER = "firstAnswer",
}

export enum GAME_SETTING {
  QUESTION_COUNT = "questionCount",
  ACTIVE_QUESTIONS = "activeQuestions",
  MAIN_ROLE_ONLY = "mainRoleOnly",
  MIN_POPULARITY = "minPopularity",
  MAX_POPULARITY = "maxPopularity",
  MIN_YEAR = "minYear",
  MAX_YEAR = "maxYear",
  ALLOW_CHANGE_ANSWER = "allowChangeAnswer",
  ANSWER_TIMEOUT_MODE = "answerTimeout",
  SECONDS_AFTER_ANSWER = "secAfterAnswer",
  WRONG_ANSER_PENALTY = "wrongAnswerPenalty",
}

export type GameSettings = {
  [GAME_SETTING.QUESTION_COUNT]: number;
  [GAME_SETTING.ACTIVE_QUESTIONS]: GAME_AVAILABLE_QUESTION_ID[];
  [GAME_SETTING.MAIN_ROLE_ONLY]?: boolean;
  [GAME_SETTING.MIN_POPULARITY]?: number;
  [GAME_SETTING.MAX_POPULARITY]?: number;
  [GAME_SETTING.MIN_YEAR]?: number;
  [GAME_SETTING.MAX_YEAR]?: number;
  [GAME_SETTING.ALLOW_CHANGE_ANSWER]: boolean;
  [GAME_SETTING.ANSWER_TIMEOUT_MODE]: ANSWER_TIMEOUT_MODE;
  [GAME_SETTING.SECONDS_AFTER_ANSWER]: number;
  [GAME_SETTING.WRONG_ANSER_PENALTY]: boolean;
};
