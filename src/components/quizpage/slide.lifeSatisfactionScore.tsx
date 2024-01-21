import React from "react";
import { Box, Text, Flex, Grid } from "@chakra-ui/react";
import { HarmonyChart, COLORS } from "../HarmonyChart/HarmonyChart";

import { Slide, useQuiz } from "@martynasj/quiz-lib";
import { ChatBubble, NextButton } from "./components";

export function LifeSatisfactionScoreSlide() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide
      id="life-satisfaction"
      type="filler"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
      nextButtonProps={{ title: "Let's go!" }}
    >
      <Box textColor={"white"}>
        <ChatBubble
          text={`Below is your life satisfaction diagriam`}
          onFinishedTyping={() => {
            setShowInput(true);
          }}
        />

        {showInput && (
          <>
            <HarmonyChartContainer />

            <NextButton my={3} onClick={() => submitQuestion()}>
              Next
            </NextButton>
          </>
        )}
      </Box>
    </Slide>
  );
}

function HarmonyChartContainer() {
  return (
    <Flex flexDirection={"column"} gap={3} p={4} borderRadius={"xl"}>
      <Flex width={"full"} height={500} justifyContent={"center"} alignItems={"center"} p={4}>
        <HarmonyChart
          size={300}
          items={[
            {
              id: "a",
              title: "Personal growth",
              value: 1,
            },
            {
              id: "b",
              title: "Career",
              value: 5,
            },

            {
              id: "e",
              title: "Relationship",
              value: 3,
            },
            {
              id: "d",
              title: "Emotional well-being",
              value: 2,
            },
            {
              id: "c",
              title: "Timing",
              value: 3,
            },
          ]}
        />
      </Flex>

      <Grid
        mx="auto"
        my={3}
        alignItems={"center"}
        gap={2}
        gridTemplateColumns={"auto 1fr auto"}
        maxWidth={300}
        width={"100%"}
      >
        <Text fontWeight={"bold"} color="whiteAlpha.700">
          Low (0)
        </Text>
        <Box
          height={"10px"}
          width={"full"}
          borderRadius={6}
          bgGradient={`linear(to-r, ${COLORS[0]}, ${COLORS[COLORS.length - 1]})`}
        />
        <Text fontWeight={"bold"} color="whiteAlpha.700">
          High (100)
        </Text>
      </Grid>
    </Flex>
  );
}
