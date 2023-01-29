import { shuffle } from "fast-shuffle";
import { CharacterOptions, getRandomCharacters } from "../db/characters";
import { ServerQuestion } from "../common/types/question";
import { flatten, uniq } from "lodash-es";
import { getRandomAnimesWithCharacters } from "../db/animes";
import {
  AnimeQuestionGenerator,
  GAME_AVAILABLE_QUESTION_ID,
} from "../common/types/game";

export interface QuestionAnimeFromCharacterOptions extends CharacterOptions {
  imageOnly?: boolean;
}

export const QuestionAnimeFromCharacter: AnimeQuestionGenerator = {
  id: GAME_AVAILABLE_QUESTION_ID.ANIME_FROM_CHAR,
  name: "What anime title is the character from?",
  create: async (
    count: number,
    options: QuestionAnimeFromCharacterOptions = {}
  ): Promise<ServerQuestion[]> => {
    const correctChars = await getRandomCharacters(
      count,
      Object.assign({}, options)
    );

    const correctAnimeIds = uniq(
      flatten(correctChars.map((c) => c.animes)).map((a) => a.id)
    );

    const wrongAnimes = shuffle(
      await getRandomAnimesWithCharacters(
        count * 3,
        Object.assign({}, options, {
          excludeChars: correctChars.map((c) => c.id),
          excludeAnimes: correctAnimeIds,
        })
      )
    );

    return correctChars.map((c, i): ServerQuestion => {
      const correctAnswers = [c.animes[0].alternative_titles];
      const wrongAnswers = wrongAnimes
        .slice(i * 3, i * 3 + 3)
        .map((a) => a.alternative_titles);

      const allAnswers = shuffle([...wrongAnswers, ...correctAnswers]);

      const wrongIds = wrongAnswers.map((a) => allAnswers.indexOf(a));
      const correctIds = correctAnswers.map((a) => allAnswers.indexOf(a));

      return {
        question: {
          title: {
            template: [
              "What anime is ",
              options.imageOnly ? "this character" : `"${c.title}"`,
              " from?",
            ],
          },
          image: c.image,
        },
        answers: {
          wrong: wrongIds,
          correct: correctIds,
          all: allAnswers,
        },
        playerAnswers: new Map<string, number>(),
        timeoutMs: 20 * 1000,
      };
    });
  },
};
