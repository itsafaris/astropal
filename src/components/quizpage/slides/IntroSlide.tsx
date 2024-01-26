import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { ChatBubble, NextButton } from "../components";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

export function IntroSlide() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="intro" type="filler">
      <ChatBubble
        text={`Hey, there! 👋 We have helped more than 31000 souls to explore and understand themselves better so we can help you too. By the end of the quiz you will have:`}
        instant={showInput}
        onFinishedTyping={() => {
          setTimeout(() => {
            setShowInput(true);
          }, 300);
        }}
      />
      {showInput && (
        <>
          <Stack textAlign={"center"} color="white" fontSize={"lg"}>
            <Text>
              1. Created full{" "}
              <Text as="span" color="brand.600" fontWeight={"bold"}>
                Astrological Profile
              </Text>
            </Text>
            <Text>
              2. Identified{" "}
              <Text as="span" color="brand.600" fontWeight={"bold"}>
                Life Challenges
              </Text>
            </Text>
            <Text>
              3. Crafted{" "}
              <Text as="span" color="brand.600" fontWeight={"bold"}>
                Self-Discovery Guide
              </Text>
            </Text>
          </Stack>

          <Flex
            my={5}
            height={100}
            width={100}
            borderRadius={"50%"}
            overflow={"hidden"}
            justifyContent={"center"}
            alignItems={"center"}
            mx={"auto"}
          >
            <StaticImage alt="" src="../../../images/calm-woman-2.png" />
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
