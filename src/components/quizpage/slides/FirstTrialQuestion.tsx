import React, { useState } from "react";
import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";
import { Button, Flex, Text } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

import { ChatBubble, NextButton, Question } from "../components";
import { NatalChartInterpreter } from "../interpreter";

import { astrologyThemes } from "@utils/astrologyThemes";

export function FirstQuestionTrial() {
  const [showInput, setShowInput] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [finishedAnswer, setFinishedAnswer] = useState(false);
  const [finishedTypingQuestion, setFinishedTypingQuestion] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="first-question-trial" type="filler">
      {selectedQuestion ? (
        <>
          <ChatBubble
            text={selectedQuestion}
            onFinishedTyping={() => {
              setFinishedTypingQuestion(true);
            }}
          />

          {finishedTypingQuestion && (
            <NatalChartInterpreter
              question={selectedQuestion}
              onFinishedAnswer={() => {
                setFinishedAnswer(true);
                setAnsweredQuestions((q) => [...q, selectedQuestion]);
              }}
            />
          )}

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
          <ChatBubble
            text="Now, let's try answering some more specific questions about your life"
            instant={showInput}
            onFinishedTyping={() => setShowInput(true)}
          />
          {showInput && (
            <>
              <Flex mb={4} flexDirection={"column"} gap={1} alignItems={"center"}>
                <Text
                  color="whiteAlpha.600"
                  textAlign={"center"}
                  maxWidth={"70%"}
                  mx="auto"
                  lineHeight={"normal"}
                >
                  Click on a question that you would like to have answered.
                </Text>
                <ArrowDownIcon color="whiteAlpha.600" fontSize={"2xl"} />
              </Flex>

              <Flex flexDirection={"column"} gap={2} alignItems={"center"}>
                {astrologyThemes.map((q) => {
                  return (
                    <Question
                      key={q.id}
                      text={q.questionExample}
                      questionTheme={q.title}
                      themecolor={q.color}
                      opacity={answeredQuestions.includes(q.questionExample) ? 0.5 : 1}
                      onClick={() => {
                        setSelectedQuestion(q.questionExample);
                        setFinishedTypingQuestion(false);
                      }}
                    />
                  );
                })}
                <Selector />
              </Flex>
            </>
          )}
        </>
      )}
    </Slide>
  );
}
