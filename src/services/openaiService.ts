import OpenAI from "openai";

const ORG_ID = "org-sP7lZMPWGsGm3j2vrN1WD05D";

interface Service {
  stream: (prompt: string, onContent: (content: string) => void) => AbortController["abort"];
}

function createOpenai(): OpenAI {
  return new OpenAI({
    apiKey: process.env.GATSBY_OPENAI_API_KEY,
    organization: ORG_ID,
    dangerouslyAllowBrowser: true,
  });
}

const service: Service = {
  stream: (prompt, onContent) => {
    const openai = createOpenai();
    const s = openai.beta.chat.completions.stream({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: true,
    });

    s.on("content", (_delta, snapshot) => {
      onContent(snapshot);
    });

    s.on("chatCompletion", () => {
      s.controller.abort();
    });

    return s.controller.abort;
  },
};

const serviceMock: Service = {
  stream: (_, onContent) => {
    onContent("Hello");

    return () => {};
  },
};

export function getOpenaiService({ mock = false }: { mock: boolean }) {
  return mock ? serviceMock : service;
}
