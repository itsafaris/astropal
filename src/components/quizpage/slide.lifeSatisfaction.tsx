import React, { ComponentProps } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { Button, Flex, Grid, chakra, shouldForwardProp, Text, Stack } from "@chakra-ui/react";

import { isValidMotionProp, motion } from "framer-motion";
import { ChatBubble, NextButton } from "./components";

export function LifeSatisfactionSlide() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="life-satisfaction" type="filler">
      <ChatBubble
        text={`How satisfied are you with your life in each of the aspects?`}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <>
          <Stack spacing={3}>
            <Select
              title={{
                text: "Personal Growth  🌱",
                color: "green",
              }}
              options={[
                {
                  value: 1,
                  text: "1",
                },
                {
                  value: 2,
                  text: "2",
                },
                {
                  value: 3,
                  text: "3",
                },
                {
                  value: 4,
                  text: "4",
                },
                {
                  value: 5,
                  text: "5",
                },
              ]}
            />

            <Select
              title={{
                text: "Relationships  💖",
                color: "red",
              }}
              options={[
                {
                  value: 1,
                  text: "1",
                },
                {
                  value: 2,
                  text: "2",
                },
                {
                  value: 3,
                  text: "3",
                },
                {
                  value: 4,
                  text: "4",
                },
                {
                  value: 5,
                  text: "5",
                },
              ]}
            />

            <Select
              title={{
                text: "Career  💼",
                color: "blue",
              }}
              options={[
                {
                  value: 1,
                  text: "1",
                },
                {
                  value: 2,
                  text: "2",
                },
                {
                  value: 3,
                  text: "3",
                },
                {
                  value: 4,
                  text: "4",
                },
                {
                  value: 5,
                  text: "5",
                },
              ]}
            />

            <Select
              title={{
                text: "Emotional Well-Being  🧘",
                color: "teal",
              }}
              options={[
                {
                  value: 1,
                  text: "1",
                },
                {
                  value: 2,
                  text: "2",
                },
                {
                  value: 3,
                  text: "3",
                },
                {
                  value: 4,
                  text: "4",
                },
                {
                  value: 5,
                  text: "5",
                },
              ]}
            />

            <Select
              title={{
                text: "Timing  🎯",
                color: "yellow",
              }}
              options={[
                {
                  value: 1,
                  text: "1",
                },
                {
                  value: 2,
                  text: "2",
                },
                {
                  value: 3,
                  text: "3",
                },
                {
                  value: 4,
                  text: "4",
                },
                {
                  value: 5,
                  text: "5",
                },
              ]}
            />
          </Stack>

          <NextButton mt={6} mb={3} onClick={() => submitQuestion()}>
            Continue
          </NextButton>
        </>
      )}
    </Slide>
  );
}

function Select(input: {
  title: { text: string; color: string };
  options: Array<{ value: number; text: string }>;
}) {
  return (
    <Flex flexDirection={"column"} gap={1}>
      <Text fontSize={"sm"} fontWeight={"semibold"} color={`${input.title.color}.700`}>
        {input.title.text}:
      </Text>

      <Grid gridTemplateColumns={`repeat(${input.options.length}, 1fr)`} width={"full"} gap={3}>
        {input.options.map((it) => {
          return (
            <BaseOption key={it.value} isSelected={false} onClick={() => {}}>
              {it.text}
            </BaseOption>
          );
        })}
      </Grid>
    </Flex>
  );
}

type BaseOptionProps = {
  isSelected: boolean;
} & ComponentProps<typeof Button>;

function BaseOption({ isSelected, children, ...chakraButtonProps }: BaseOptionProps) {
  return (
    <ChakraButton
      px={4}
      py={1}
      as={motion.button}
      borderRadius={"md"}
      outline={`${isSelected ? 3 : 0}px solid`}
      outlineColor={"bg.400"}
      backgroundColor={isSelected ? "bg.300" : "bg.100"}
      // @ts-expect-error
      transition={{
        scale: { type: "spring", stiffness: 800, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
      color={"bg.900"}
      {...chakraButtonProps}
    >
      {children}
    </ChakraButton>
  );
}

const ChakraButton = chakra(motion.button, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});
