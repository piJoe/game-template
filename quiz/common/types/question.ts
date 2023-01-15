export interface ServerQuestion {
  question: {
    title: string;
    image?: string;
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
  };
  answers: string[];
  timeoutMs: number;
}
