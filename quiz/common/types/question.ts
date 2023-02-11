export enum AnimeTitleType {
  DEFAULT = "Default",
  SYNONYM = "Synonym",
  ENGLISH = "English",
  JAPANESE = "Japanese",
  GERMAN = "German",
  SPANISH = "Spanish",
  FRENCH = "French",
}

export interface AnimeTitle {
  type: AnimeTitleType;
  title: string;
}

export interface QuestionTitleTemplate {
  template: string[];
  data?: { [key: string]: string | AnimeTitle[] };
}

interface CommonQuestion {
  question: {
    title: QuestionTitleTemplate;
    image?: string;
    /**blur the image in question mode, reveal when answer is revealed */
    imageBlurred?: boolean;
    audioUrl?: string;
  };
}

export interface AdditionalAnswerMeta {
  type: "OP" | "ED";
  [key: string]: any;
}

export interface ServerQuestion extends CommonQuestion {
  answers: {
    wrong: number[];
    correct: number[];
    all: (string | AnimeTitle[])[];
  };
  playerAnswers: Map<string, number>;
  timeoutMs: number;
  sleepAfterAnswerMs?: number;
  additionalAnswerMeta?: AdditionalAnswerMeta;
}

export interface ClientQuestion extends CommonQuestion {
  answers: (string | AnimeTitle[])[];
  timeoutMs: number;
}
