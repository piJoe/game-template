export interface ServerQuestion {
  question: {
    title: string;
    image?: string;
    /**blur the image in question mode, reveal when answer is revealed */
    imageBlurred?: boolean;
    audioUrl?: string;
  };
  answers: {
    wrong: number[];
    correct: number[];
    all: string[];
  };
  playerAnswers: Map<string, number>;
  timeoutMs: number;
}

export interface ClientQuestion {
  question: {
    title: string;
    image?: string;
    /**blur the image in question mode, reveal when answer is revealed */
    imageBlurred?: boolean;
    audioUrl?: string;
  };
  answers: string[];
  timeoutMs: number;
}
