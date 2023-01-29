import { shuffle } from "fast-shuffle";
import { CharacterOptions, getRandomCharacters } from "../db/characters";
import { ServerQuestion } from "../common/types/question";
import {
  AnimeQuestionGenerator,
  GAME_AVAILABLE_QUESTION_ID,
} from "../common/types/game";

export interface QuestionCharacterOptions extends CharacterOptions {}

export const QuestionCharByPicture: AnimeQuestionGenerator = {
  id: GAME_AVAILABLE_QUESTION_ID.CHAR_BY_PICTURE,
  name: "What's the name of the anime char (by picture)?",
  create: async (
    count: number,
    options: QuestionCharacterOptions = {}
  ): Promise<ServerQuestion[]> => {
    const correctChars = await getRandomCharacters(
      count,
      Object.assign({}, options)
    );

    const otherChars = shuffle(
      await getRandomCharacters(
        count * 3,
        Object.assign({}, options, {
          excludeChars: correctChars.map((c) => c.id),
        })
      )
    );

    return correctChars.map((c, i): ServerQuestion => {
      const wrongAnswers: string[] = otherChars
        .slice(i * 3, i * 3 + 3)
        .map((c) => c.title);
      const correctAnswers: string[] = [c.title];
      const allAnswers = shuffle([...wrongAnswers, ...correctAnswers]);

      const wrongIds = wrongAnswers.map((a) => allAnswers.indexOf(a));
      const correctIds = correctAnswers.map((a) => allAnswers.indexOf(a));

      // TODO: find better names (if original name is too long, try an `alternative_titles` with type `Synonym`)
      // also somehow enable to transmit multiple titles, so we can display the alternatives via tooltip?
      return {
        question: {
          title: {
            template: [
              `What's the name of this character from "`,
              "$animeTitle",
              `"?`,
            ],
            data: {
              $animeTitle: c.animes[0].alternative_titles,
            },
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
