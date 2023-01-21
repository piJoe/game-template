import { shuffle } from "fast-shuffle";
import { ServerQuestion } from "../common/types/question";
import {
  AnimeOptions,
  getAllAnimeGenres,
  getRandomAnimesWithGenres,
} from "../db/animes";
import { getRandomEntryInArray } from "../utils/random";

export interface QuestionAnimeGenreOptions extends AnimeOptions {
  imageOnly?: boolean;
}

export const QuestionAnimeGenre = {
  name: "Guess the anime's genre",
  create: async (
    count: number,
    options: QuestionAnimeGenreOptions = {}
  ): Promise<ServerQuestion[]> => {
    const animes = await getRandomAnimesWithGenres(
      count,
      Object.assign({}, options)
    );

    const allGenres = await getAllAnimeGenres();

    return animes.map((a, i): ServerQuestion => {
      const correctAnswers: string[] = a.genres;
      const wrongAnswers: string[] = shuffle(
        allGenres.filter((g) => !a.genres.includes(g))
      ).slice(0, 3);

      const singleCorrectAnswer = getRandomEntryInArray(correctAnswers);

      const allAnswers = shuffle([...wrongAnswers, singleCorrectAnswer]);

      const wrongIds = wrongAnswers.map((a) => allAnswers.indexOf(a));
      const correctIds = [allAnswers.indexOf(singleCorrectAnswer)];

      // TODO: find better names (if original name is too long, try an `alternative_titles` with type `Synonym`)
      // also somehow enable to transmit multiple titles, so we can display the alternatives via tooltip?
      return {
        question: {
          title: `What genre is ${
            options.imageOnly ? "this anime" : `"${a.title}"`
          }?`,
          image: a.image,
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
