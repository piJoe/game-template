export enum GAME_STATUS {
  CREATED = 0,
  GENERATING,
  RUNNING,
  FINISHED,
}

export interface GameSetting {
  name: string;
  value: string | number;
}

export interface GameSettingInput {
  type: "text" | "number";
  name: string;
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  minlength?: number;
  required?: boolean;
}
