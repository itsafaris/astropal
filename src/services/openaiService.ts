import { NatalChart } from "@utils/natalChart";
import OpenAI from "openai";

const ORG_ID = "org-sP7lZMPWGsGm3j2vrN1WD05D";

function createPrompt(natalChart: NatalChart, question: string): string {
  return `
    You are a western astrologer. I am your client. This is a JSON data object of my Natal chart: ${JSON.stringify(
      natalChart
    )}.
    I will ask you a question. Keep your answer short (no longer than 30 words), don't use astrological terms, draw out only most important aspects.
    My question is: ${question}
  `;
}

interface Service {
  stream: (
    natalChart: NatalChart,
    question: string,
    onAnswer: (text: string) => void
  ) => AbortController["abort"];
}

function createOpenai(): OpenAI {
  return new OpenAI({
    apiKey: process.env.GATSBY_OPENAI_API_KEY,
    organization: ORG_ID,
    dangerouslyAllowBrowser: true,
  });
}

const service: Service = {
  stream: (natalChart, question, onAnswer) => {
    const openai = createOpenai();
    const s = openai.beta.chat.completions.stream({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "user",
          content: createPrompt(natalChart, question),
        },
      ],
      stream: true,
    });

    s.on("content", (_delta, snapshot) => {
      onAnswer(snapshot);
    });

    s.on("chatCompletion", () => {
      s.controller.abort();
    });

    return s.controller.abort;
  },
};

const serviceMock: Service = {
  stream: (_natalChart, _question, onAnswer) => {
    onAnswer("Hello");

    return () => {};
  },
};

export function getOpenaiService({ mock = false }: { mock: boolean }) {
  return mock ? serviceMock : service;
}
