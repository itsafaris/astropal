import React, { useState } from "react";
import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";
import { Button, Flex, Text } from "@chakra-ui/react";

import { SlideHeading, NextButton } from "../components";
import { NatalChartInterpreter } from "../interpreter";

import { astrologyThemes } from "@utils/astrologyThemes";

export function FirstQuestionTrial() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [finishedAnswer, setFinishedAnswer] = useState(false);

  const { submitQuestion } = useQuiz();

  return (
    <Slide id="first-question-trial" type="filler">
      {selectedQuestion ? (
        <>
          <SlideHeading text={`"${selectedQuestion}"`} />

          <NatalChartInterpreter
            question={`${selectedQuestion} (do not mention any planets or signs)`}
            onFinishedAnswer={() => {
              setFinishedAnswer(true);
              setAnsweredQuestions((q) => [...q, selectedQuestion]);
            }}
          />

          {finishedAnswer && (
            <>
              <NextButton mt={8} onClick={() => submitQuestion()}>
                Continue
              </NextButton>

              {answeredQuestions.length < astrologyThemes.length && (
                <Button
                  variant="text"
                  color="brand.600"
                  onClick={() => {
                    setSelectedQuestion(null);
                    setFinishedAnswer(false);
                  }}
                >
                  Try another question
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <SlideHeading text="Here are some questions that people usually care about the most. Try asking them yourself 🕊️" />

          <>
            <Flex flexDirection={"column"} gap={3} alignItems={"center"}>
              {astrologyThemes.map((q) => {
                const wasSelected = answeredQuestions.includes(q.questionExample);

                return (
                  <Question
                    key={q.id}
                    text={q.questionExample}
                    questionTheme={q.title}
                    themecolor={q.color}
                    opacity={wasSelected ? 0.5 : 1}
                    cursor={wasSelected ? "default" : "cursor"}
                    onClick={() => {
                      if (wasSelected) {
                        return;
                      }

                      setSelectedQuestion(q.questionExample);
                    }}
                  />
                );
              })}
              <Selector />
            </Flex>
          </>
        </>
      )}
    </Slide>
  );
}

export function Question({
  text,
  questionTheme,
  themecolor,
  ...rest
}: { text: string; questionTheme: string; themecolor: string } & React.ComponentProps<
  typeof Flex
>) {
  return (
    <Flex
      justifyContent={"center"}
      as="button"
      backgroundColor={"bg.200"}
      p={2}
      px={4}
      borderRadius={"md"}
      cursor={"pointer"}
      width="full"
      {...rest}
    >
      <Flex flexDirection="column" gap={1}>
        <Text
          fontSize={"sm"}
          fontWeight={"semibold"}
          lineHeight={"normal"}
          color={`${themecolor}.500`}
        >
          {questionTheme}
        </Text>

        <Text color="white" fontSize={"md"} fontWeight={"semibold"} lineHeight={"normal"}>
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}
