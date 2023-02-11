import { shuffle } from "fast-shuffle";
import { flatten } from "lodash-es";
import {
  AnimeQuestionGenerator,
  GAME_AVAILABLE_QUESTION_ID,
} from "../common/types/game";
import { ServerQuestion } from "../common/types/question";
import { AnimeOptions, getRandomAnimesWithOpenings } from "../db/animes";

export interface QuestionAnimeOpeningOptions extends AnimeOptions {
  imageOnly?: boolean;
  openingType: "OP" | "ED";
}

export const QuestionAnimeOpening: AnimeQuestionGenerator = {
  id: GAME_AVAILABLE_QUESTION_ID.ANIME_OPENING,
  name: "Guess anime from opening",
  create: async (
    count: number,
    options: QuestionAnimeOpeningOptions = { openingType: "OP" }
  ): Promise<ServerQuestion[]> => {
    const animes = await getRandomAnimesWithOpenings(
      count,
      Object.assign({}, options)
    );

    const validOpeningIds = flatten(
      animes.map((a) => a.openings.map((o) => o.id))
    );

    const otherAnimes = await getRandomAnimesWithOpenings(
      count * 3,
      Object.assign({}, options, {
        excludeOpenings: validOpeningIds,
      })
    );

    return animes.map((a, i): ServerQuestion => {
      const opening = shuffle(a.openings)[0];

      const openingUrl = new URL(
        opening.filename + ".ogg",
        process.env["MEDIA_SERVER"]
      ).toString();

      const correctAnswers = [a.alternative_titles];
      const wrongAnswers = otherAnimes
        .slice(i * 3, i * 3 + 3)
        .map((a) => a.alternative_titles);

      const allAnswers = shuffle([...wrongAnswers, ...correctAnswers]);

      const wrongIds = wrongAnswers.map((a) => allAnswers.indexOf(a));
      const correctIds = correctAnswers.map((a) => allAnswers.indexOf(a));

      return {
        question: {
          title: {
            template: [
              `What anime is this ${
                opening.type === "OP" ? "opening" : "ending"
              } from?`,
            ],
          },
          image: a.image,
          imageBlurred: true,
          audioUrl: openingUrl,
        },
        answers: {
          wrong: wrongIds,
          correct: correctIds,
          all: allAnswers,
        },
        playerAnswers: new Map<string, number>(),
        timeoutMs: 30 * 1000,
        sleepAfterAnswerMs: 5 * 1000,
        additionalAnswerMeta: {
          type: opening.type,
          artist: opening.artist,
          title: opening.title,
          number: opening.number,
        },
      };
    });
  },
};
