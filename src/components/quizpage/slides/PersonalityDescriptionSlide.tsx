import React, { createElement, useState } from "react";
import { QuizQuestionsState, Slide, useQuiz, useQuizSnapshot } from "@martynasj/quiz-lib";
import { Flex, Text } from "@chakra-ui/react";

import { SlideHeading, NextButton, SpanJust, Span } from "../components";
import { Interpreter } from "../interpreter";
import { LoadingPulse } from "../LoadingPulse";
import { AstrologicalProfile } from "@components/AstrologicalProfile";
import { getPersonalInfoFromState } from "@utils/state";

export function PersonalityDescriptionSlide() {
  const quizSnapshot = useQuizSnapshot();
  const slideID = "personality-description";

  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [showResultsSlide, setShowResultsSlide] = useState<boolean>(false);
  const [startInterpreting, setStartInterpreting] = useState<boolean>(false);

  React.useEffect(() => {
    if (quizSnapshot.currentSlideID === slideID) {
      setStartInterpreting(true);
    } else {
      setInterpretation(null);
      setShowResultsSlide(false);
      setStartInterpreting(false);
    }
  }, [quizSnapshot.currentSlideID]);

  return (
    <Slide id={slideID} type="filler">
      {({ quizState }) => {
        return (
          <>
            {startInterpreting && (
              <Interpreter
                prompt={
                  "What is my personality like? Provide a short list of my strenghts and weaknesses"
                }
                onComplete={(val) => setInterpretation(val)}
                onError={() => {}}
              />
            )}

            {!showResultsSlide && (
              <LoadingSlide
                isLoading={!Boolean(interpretation)}
                onNextClick={() => {
                  setShowResultsSlide(true);
                }}
              />
            )}

            {showResultsSlide && interpretation && (
              <ResultsSlide interpretation={interpretation} quizState={quizState} />
            )}
          </>
        );
      }}
    </Slide>
  );
}

function LoadingSlide({ isLoading, onNextClick }: { isLoading: boolean; onNextClick: () => void }) {
  return (
    <>
      <SlideHeading text="Take a brief pause while we prepare your Astrological Profile 😌" />

      <LoadingPulse isLoading={isLoading} my={4} />

      {!isLoading && (
        <NextButton onClick={() => onNextClick()} my={8}>
          Continue
        </NextButton>
      )}
    </>
  );
}

function ResultsSlide({
  interpretation,
  quizState,
}: {
  interpretation: string;
  quizState: QuizQuestionsState;
}) {
  const quiz = useQuiz();
  const info = getPersonalInfoFromState(quizState);

  return (
    <Flex flexDirection={"column"} position={"relative"} width={"full"}>
      <SlideHeading
        text={
          <SpanJust>
            Here is brief preview of your <Span>Astrological Profile</Span>. It contains a snapshot
            of the sky data at the time you were born
          </SpanJust>
        }
      />

      <Flex
        flexDirection={"column"}
        backgroundColor={"white"}
        px={5}
        py={7}
        position={"relative"}
        color="black"
        borderRadius={"lg"}
      >
        <Text
          textAlign={"center"}
          fontStyle="italic"
          fontSize={"2xl"}
          color={"brand.300"}
          mb={5}
          fontWeight={"bold"}
        >
          Your personality
        </Text>

        <Text>{interpretation}</Text>
      </Flex>

      {createElement(info.yourZodiac.svgComponent, {
        height: 150,
        width: 150,
        stroke: "#f2bf79",
        fill: "red",
        strokeWidth: 4,
      })}

      <AstrologicalProfile quizState={info} />

      <NextButton
        position={"fixed"}
        maxWidth={"300px"}
        bottom={0}
        left={"50%"}
        transform={"translateX(-50%)"}
        onClick={() => {
          quiz.submitQuestion();
        }}
        my={8}
      >
        Continue
      </NextButton>
    </Flex>
  );
}
