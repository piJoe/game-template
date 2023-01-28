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

export enum GAME_SETTING {
  QUESTION_COUNT = "questionCount",
  ACTIVE_QUESTIONS = "activeQuestions",
  MAIN_ROLE_ONLY = "mainRoleOnly",
  MIN_POPULARITY = "minPopularity",
  MAX_POPULARITY = "maxPopularity",
  MIN_YEAR = "minYear",
  MAX_YEAR = "maxYear",
}

export type GameSettings = {
  [GAME_SETTING.QUESTION_COUNT]: number;
  [GAME_SETTING.ACTIVE_QUESTIONS]: GAME_AVAILABLE_QUESTION_ID[];
  [GAME_SETTING.MAIN_ROLE_ONLY]?: boolean;
  [GAME_SETTING.MIN_POPULARITY]?: number;
  [GAME_SETTING.MAX_POPULARITY]?: number;
  [GAME_SETTING.MIN_YEAR]?: number;
  [GAME_SETTING.MAX_YEAR]?: number;
};

// export interface GameSettingInput {
//   type: "text" | "number" | "select";
//   name: GAME_SETTING;
//   label: string;
//   placeholder?: string;
//   min?: number;
//   max?: number;
//   minlength?: number;
//   required?: boolean;
//   values?: string[];
// }
