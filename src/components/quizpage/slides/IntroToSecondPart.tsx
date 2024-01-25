import React, { useState } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";
import { Text, Flex } from "@chakra-ui/react";

import { ChatBubble, NextButton } from "../components";

export function IntroToSecondPart() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="intro-to-second-part" type="filler">
      <ChatBubble
        text={`I'm glad to have helped you answer your first questions. How did you `}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <>
          <Text color="bg.900" fontSize={"lg"} fontWeight={"bold"} textAlign={"center"} mb={6}>
            After this, you will be able to:
          </Text>
          <Flex
            flexDirection={"column"}
            gap={1}
            color="bg.700"
            mx={6}
            alignItems={"center"}
            mb={12}
          >
            <Text>+ Ask questions about any topic</Text>
            <Text>+ Receive super accurate reading</Text>
            <Text>+ Future predictions</Text>
          </Flex>
          <NextButton
            onClick={() => {
              submitQuestion();
            }}
          >
            Continue
          </NextButton>
        </>
      )}
    </Slide>
  );
}
