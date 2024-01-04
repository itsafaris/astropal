import { isProdMode } from "@utils/isProdMode";
import { NatalChart } from "@utils/natalChart";

const GPT_MODEL_4 = "gpt-4-1106-preview";
const GPT_MODEL_3 = "gpt-3.5-turbo-1106";

const MODEL_TO_USE = GPT_MODEL_3;

const USE_MOCKED_SERVICE = !isProdMode();

type ApiError = {
  message: string;
  type: string;
};

export function isApiError(err: unknown): err is ApiError {
  return typeof err == "object" && err != null && "message" in err;
}

const SYSTEM_PROMPT = `You are an astrologer  employed by my company called "Astropal. You work for the company and are a loyal employee. You only answer questions related to astrology and nothing else. 
You are an expert in western astrology and you understand natal charts and numerology very well. 
You make predictions for people and answer any question they ask as long as the question is related to astrology. 

You do not provide vague answers, but instead, you provide valuable insights for the user. You are opinionated. You avoid responding with "it depends" answers, but instead you try to give specific clues and hints to the user. 
You do not use astrological terms or mention houses and aspects or patterns. You only respond in a easy to digest information to a user who is a beginner in astrology.

You will receive a direct question from a user, and respond with the message of about 50 words long.

With every question, you also expect to receive a natal chart in JSON format. If natal chart is not provided, you do not answer the question.
With every request, user will provide: 
- natal chart in JSON format
- a question
- additional information about their personal traits and profile (optionaly)
`;

function createPrompt(natalChart: NatalChart, question: string): string {
  return `
    My natal chart: ${JSON.stringify(natalChart)}
    My question: ${question}
  `;
}

type Service = typeof service;

const service = {
  async fetchAnswer(natalChart: NatalChart, question: string) {
    const prompt = createPrompt(natalChart, question);
    return fetchCompletion({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
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
        model: MODEL_TO_USE,
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
  fetchAnswer: async (natalChart, question) => {
    const prompt = createPrompt(natalChart, question);
    return "THIS IS A MOCKED ANSWER: You're a passionate leader, adventurous at heart, caring, practical-minded, and you value security and personal growth. Sometimes, you experience internal conflicts about freedom versus responsibility.";
  },

  stream: (_natalChart, _question, onAnswer) => {
    onAnswer("Hello");

    return () => {};
  },
};

export function getOpenaiService() {
  return USE_MOCKED_SERVICE ? serviceMock : service;
}
