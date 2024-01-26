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
        text={`Hey there! We have helped more than 31,000 souls explore and understand themselves better, so we can help you too 👋`}
        instant={showInput}
        onFinishedTyping={() => {
          setTimeout(() => {
            setShowInput(true);
          }, 300);
        }}
      />
      {showInput && (
        <>
          <Flex
            mb={5}
            height={100}
            width={100}
            borderRadius={"50%"}
            overflow={"hidden"}
            justifyContent={"center"}
            alignItems={"center"}
            mx={"auto"}
          >
            <StaticImage alt="" src="../../../images/astro_profile.png" />
          </Flex>

          <Stack textAlign={"center"} color="white" fontSize={"lg"} mb={5} spacing={1}>
            <Text mb={2}>We are here to:</Text>
            <Text>
              1. Create your{" "}
              <Text as="span" color="brand.600" fontWeight={"bold"}>
                Astrological Profile
              </Text>
            </Text>
            <Text>
              2. Identify{" "}
              <Text as="span" color="brand.600" fontWeight={"bold"}>
                Life Challenges
              </Text>
            </Text>
            <Text>
              3. Craft a{" "}
              <Text as="span" color="brand.600" fontWeight={"bold"}>
                Self-Discovery Guide
              </Text>
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
