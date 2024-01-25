import React, { useState } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";
import { Text, Stack } from "@chakra-ui/react";

import { ChatBubble, NextButton } from "../components";
import { BoltIcon, InfinityIcon, MoonIcon } from "@components/svg/icons";

export function IntroToFinetuningPart() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="intro-to-finetuning-part" type="filler">
      <ChatBubble
        text={`In order to deliver you the best advice possible, I will ask you a few more questions. This time - about your personality 🧘‍♂️.`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <>
          <Text
            color="brand.700"
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            maxW={200}
            mx="auto"
          >
            Knowing you better will allow me to:
          </Text>

          <Stack my={10} alignItems={"start"} color="brand.700">
            <Text fontWeight={"semibold"} fontSize="md">
              <InfinityIcon color="brand.500" height={"24px"} width={"24px"} mr={2} />
              Answer all the questions you have
            </Text>

            <Text fontWeight={"semibold"} fontSize="md">
              <BoltIcon color="brand.500" height={"24px"} width={"24px"} mr={2} />
              Deliver accurate astrological insights
            </Text>

            <Text fontWeight={"semibold"} fontSize="md">
              <MoonIcon color="brand.500" height={"24px"} width={"24px"} mr={2} />
              Prepare a plan for the spiritual growth
            </Text>
          </Stack>

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
