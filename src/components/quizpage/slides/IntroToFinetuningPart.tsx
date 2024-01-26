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
        text={`To prepare your Self-Discovery guide, we need to identify the Life Challenges you face. Shall we begin? 🌿`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <>
          <Stack mb={6} alignItems={"center"} color="teal.300">
            <Text mb={3}>With Self-Discovery guide you:</Text>
            <Text fontWeight={"semibold"} fontSize="lg">
              <BoltIcon color="brand.500" height={"20px"} width={"20px"} mr={1} />
              Get astrological insights daily
              <BoltIcon color="brand.500" height={"20px"} width={"20px"} ml={1} />
            </Text>

            <Text fontWeight={"semibold"} fontSize="lg">
              <InfinityIcon color="brand.500" height={"20px"} width={"20px"} mr={2} />
              Ask any questions
              <InfinityIcon color="brand.500" height={"20px"} width={"20px"} ml={2} />
            </Text>

            <Text fontWeight={"semibold"} fontSize="lg">
              <MoonIcon color="brand.500" height={"20px"} width={"20px"} mr={1} />
              Track your spiritual growth
              <MoonIcon color="brand.500" height={"20px"} width={"20px"} ml={1} />
            </Text>
          </Stack>

          <NextButton
            onClick={() => {
              submitQuestion();
            }}
          >
            Let's begin
          </NextButton>
        </>
      )}
    </Slide>
  );
}
