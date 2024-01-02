import { Selector, Slide } from "@martynasj/quiz-lib";
import { Button, Flex, Text } from "@chakra-ui/react";
import { ChatBubble, Question } from "./components";

const predefinedQuestions = [
  "What is the meaning of my astrological sign?",
  "What are the compatibility traits of my sign with other signs?",
  "How does astrology affect my love life?",
  "Can you give me more information about my rising sign?",
  "How does astrology impact my career path?",
  "Can you tell me about the astrological events happening this week?",
];

export function AstrologerSlide() {
  return (
    <Slide id="full-astrologer" type="short-text" placeholder="Ask me anything...">
      <ChatBubble text="Now ask me something" />
      <Selector />
      <Button>Ask</Button>
      <Text my={6} color="whiteAlpha.400" textAlign={"center"} maxWidth={"70%"} mx="auto">
        Or try some of these questions
      </Text>
      <Flex flexDir={"column"} gap={2}>
        {predefinedQuestions.map((q) => (
          <Question key={q} text={q} />
        ))}
      </Flex>
    </Slide>
  );
}
