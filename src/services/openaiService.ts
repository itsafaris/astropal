import OpenAI from "openai";

// const API_KEY = "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";
const ORG_ID = "org-sP7lZMPWGsGm3j2vrN1WD05D";

interface Service {
  stream: (prompt: string, onContent: (content: string) => void) => AbortController["abort"];
}

function createOpenai(): OpenAI {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: ORG_ID,
    dangerouslyAllowBrowser: true,
  });
}

// const service: Service = {
//   stream: (prompt, onContent) => {
//     const openai = createOpenai();
//     const s = openai.beta.chat.completions.stream({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       stream: true,
//     });

//     s.on("content", (_delta, snapshot) => {
//       onContent(snapshot);
//     });

//     s.on("chatCompletion", () => {
//       s.controller.abort();
//     });

//     return s.controller.abort;
//   },
// };

const service = {
  stream: () => {
    console.log(process.env.GATSBY_OPENAI_API_KEY);
  },
};

export function getOpenaiService({ mock = false }: { mock: boolean }) {
  return mock ? service : service;
}
