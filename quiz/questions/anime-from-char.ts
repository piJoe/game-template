import { shuffle } from "fast-shuffle";
import { CharacterOptions, getRandomCharacters } from "../db/characters";
import { ServerQuestion } from "../common/types/question";
import { flatten, uniq } from "lodash-es";
import { getRandomAnimesWithCharacters } from "../db/animes";

export interface QuestionAnimeFromCharacterOptions extends CharacterOptions {
  imageOnly?: boolean;
}

export const QuestionAnimeFromCharacter = {
  name: "What /anime title/ is /character/ from?",
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
      const correctAnswers: string[] = [c.animes[0].title];
      const wrongAnswers: string[] = wrongAnimes
        .slice(i * 3, i * 3 + 3)
        .map((a) => a.title);

      const allAnswers = shuffle([...wrongAnswers, ...correctAnswers]);

      const wrongIds = wrongAnswers.map((a) => allAnswers.indexOf(a));
      const correctIds = correctAnswers.map((a) => allAnswers.indexOf(a));

      // TODO: find better names (if original name is too long, try an `alternative_titles` with type `Synonym`)
      // also somehow enable to transmit multiple titles, so we can display the alternatives via tooltip?
      return {
        question: {
          title: `What anime title is ${
            options.imageOnly ? "this character" : `"${c.title}"`
          } from?`,
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
