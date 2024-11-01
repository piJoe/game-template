export enum GAME_STATUS {
  CREATED = 0,
  INITIALIZING,
  RUNNING,
  FINISHED,
  // customzie game status as you desire
}

export enum GAME_SETTING {
  RANDOM_SETTING = "randomSetting",
  // add more game settings here
}

export type GameSettings = {
  [GAME_SETTING.RANDOM_SETTING]: number;
  // add more game settings here
};
