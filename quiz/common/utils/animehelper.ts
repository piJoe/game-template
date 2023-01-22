import { GAME_AVAILABLE_QUESTION_ID } from "../types/game";

export function chooseBestAnimeTitle(
  title: string,
  alternatives: {
    type: string;
    title: string;
  }
) {}

export function fixCharacterName(name: string): string {
  if (name.split(",").length === 2) {
    return name.split(",").reverse().join(" ").trim();
  }
  return name;
}

export function getQuestionNameById(qId: GAME_AVAILABLE_QUESTION_ID) {
  switch (qId) {
    case GAME_AVAILABLE_QUESTION_ID.ANIME_FROM_CHAR:
      return "Guess anime title by character";
    case GAME_AVAILABLE_QUESTION_ID.ANIME_GENRE:
      return "Guess the anime's genre";
    case GAME_AVAILABLE_QUESTION_ID.ANIME_STUDIO:
      return "Guess the anime's studio";
    case GAME_AVAILABLE_QUESTION_ID.CHAR_BY_PICTURE:
      return "Guess character from picture";
    case GAME_AVAILABLE_QUESTION_ID.ANIME_OPENING:
      return "Guess anime from opening";
    default:
      throw Error("Id not recognized: " + qId);
  }
}
