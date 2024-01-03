import React, { useState } from "react";
import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";
import { Button, Flex, Text } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

import { ChatBubble, NextButton, Question } from "./components";
import { NatalChartInterpreter } from "./slide.firstInterpretation";

const predefinedQuestions = [
  "What are my strengths and weaknesses?",
  "How can I achieve success in my career?",
  "What are my challenges in relationships?",
];

export function FirstQuestionTrial() {
  const [showInput, setShowInput] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [finishedAnswer, setFinishedAnswer] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="first-question-trial" type="filler">
      {selectedQuestion ? (
        <>
          <NatalChartInterpreter
            question={selectedQuestion}
            onFinishedAnswer={() => {
              setFinishedAnswer(true);
              setAnsweredQuestions((q) => [...q, selectedQuestion]);
            }}
          />
          {finishedAnswer && (
            <>
              <NextButton onClick={() => submitQuestion()}>Continue</NextButton>
              {answeredQuestions.length < predefinedQuestions.length && (
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
            text="Now I can answer questions based on your Natal Chart"
            instant={showInput}
            onFinishedTyping={() => setShowInput(true)}
          />
          {showInput && (
            <>
              <Flex mb={6} flexDirection={"column"} gap={3} alignItems={"center"}>
                <Text color="whiteAlpha.600" textAlign={"center"} maxWidth={"70%"} mx="auto">
                  Click on a question that you would like to have answered.
                </Text>
                <ArrowDownIcon color="whiteAlpha.600" fontSize={"3xl"} />
              </Flex>
              <Flex flexDirection={"column"} gap={3} alignItems={"center"}>
                {predefinedQuestions.map((q) => {
                  return (
                    <Question
                      key={q}
                      text={q}
                      opacity={answeredQuestions.includes(q) ? 0.5 : 1}
                      onClick={() => setSelectedQuestion(q)}
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
