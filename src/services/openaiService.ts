import { NatalChart } from "@utils/natalChart";

const GPT_MODEL = "gpt-4-1106-preview";

type ApiError = {
  message: string;
  type: string;
};

export function isApiError(err: unknown): err is ApiError {
  return typeof err == "object" && err != null && "message" in err;
}

function createPrompt(natalChart: NatalChart, question: string): string {
  return `
    You are a western astrologer. I am your client. This is a JSON data object of my Natal chart: ${JSON.stringify(
      natalChart
    )}.
    I will ask you a question. Keep your answer short (no longer than 30 words), don't use astrological terms, draw out only most important aspects.
    My question is: ${question}
  `;
}

type Service = typeof service;

const service = {
  async fetchAnswer(natalChart: NatalChart, question: string) {
    const prompt = createPrompt(natalChart, question);
    return fetchCompletion({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
  },

  stream: (natalChart: NatalChart, question: string, onAnswer: (msg: string) => void) => {
    // const openai = createOpenai();
    // const s = openai.beta.chat.completions.stream({
    //   model: GPT_MODEL,
    //   messages: [
    //     {
    //       role: "user",
    //       content: createPrompt(natalChart, question),
    //     },
    //   ],
    //   stream: true,
    // });
    // s.on("content", (_delta, snapshot) => {
    //   onAnswer(snapshot);
    // });
    // s.on("chatCompletion", () => {
    //   s.controller.abort();
    // });
    // return s.controller.abort;
  },
};

async function fetchCompletion(input: {
  messages: Array<{ role: "user" | "system"; content: string }>;
}): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GATSBY_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GPT_MODEL,
        messages: input.messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      const err = data.error as ApiError;
      throw err;
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("There was an error fetching the completion:", error);
    throw error;
  }
}

const serviceMock: Service = {
  fetchAnswer: async () => {
    return "hello, this is a mocked advice";
  },

  stream: (_natalChart, _question, onAnswer) => {
    onAnswer("Hello");

    return () => {};
  },
};

export function getOpenaiService({ mock = false }: { mock: boolean }) {
  return mock ? serviceMock : service;
}
