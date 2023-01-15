import { shuffle } from "fast-shuffle";
import { ServerQuestion } from "../common/types/question";
import {
  AnimeOptions,
  getAllAnimeStudios,
  getRandomAnimesWithStudio,
} from "../db/animes";

export interface QuestionAnimeStudioOptions extends AnimeOptions {
  imageOnly?: boolean;
}

export const QuestionAnimeStudio = {
  name: "Guess the anime's /studio/",
  create: async (
    count: number,
    options: QuestionAnimeStudioOptions = {}
  ): Promise<ServerQuestion[]> => {
    const animes = await getRandomAnimesWithStudio(
      count,
      Object.assign({}, options)
    );

    const allStudios = await getAllAnimeStudios();

    return animes.map((a, i): ServerQuestion => {
      const correctAnswers: string[] = [a.studio];
      const wrongAnswers: string[] = shuffle(
        allStudios.filter((s) => s !== a.studio)
      ).slice(0, 3);

      const allAnswers = shuffle([...wrongAnswers, ...correctAnswers]);

      const wrongIds = wrongAnswers.map((a) => allAnswers.indexOf(a));
      const correctIds = correctAnswers.map((a) => allAnswers.indexOf(a));

      // TODO: find better names (if original name is too long, try an `alternative_titles` with type `Synonym`)
      // also somehow enable to transmit multiple titles, so we can display the alternatives via tooltip?
      return {
        question: {
          title: `What's the name of the studio that made ${
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
