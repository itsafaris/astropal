import React, { useState } from "react";
import { QuizQuestionsState, Slide, useQuiz, useQuizSnapshot } from "@martynasj/quiz-lib";
import { Flex, Text } from "@chakra-ui/react";

import { SlideHeading, NextButton } from "../components";
import { Interpreter } from "../interpreter";
import { LoadingPulse } from "../LoadingPulse";
import { AstrologicalProfile, Interpretation } from "@components/AstrologicalProfile";
import { getPersonalInfoFromState } from "@utils/state";

export function PersonalityDescriptionSlide() {
  const quizSnapshot = useQuizSnapshot();
  const slideID = "personality-description";

  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
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
                prompt={`
                    What is my personality like?
                    Answer should be short and include a description of personality as well as strenghts and weaknesses.
                    Answer should not reference celestial bodies.
                    Strenghts and weaknesses should returned as lists with 3 items.
                    Each item should be 2-3 word long.
                    Answer should be formatted as JSON:
                    {
                      about: string;
                      strengths: string[];
                      weaknesses: string[];
                    }.
                  `}
                onComplete={(val) => {
                  try {
                    const json = JSON.parse(val);
                    setInterpretation(json);
                  } catch {}
                }}
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
      <SlideHeading textAlign={"center"} text="Just a moment... finding your cosmic identity" />

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
  interpretation: Interpretation;
  quizState: QuizQuestionsState;
}) {
  const quiz = useQuiz();
  const info = getPersonalInfoFromState(quizState);

  return (
    <Flex flexDirection={"column"} position={"relative"} width={"full"}>
      <SlideHeading>
        Your{" "}
        <Text as="span" color="brand.600">
          Natal Chart is unique cosmic identify that stores your life's story.{" "}
        </Text>{" "}
        Before we go, scroll down to see it all
      </SlideHeading>

      <AstrologicalProfile quizState={info} interpretation={interpretation} />

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
