import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { Box } from "@chakra-ui/react";

import { getPersonalInfoFromState } from "@utils/state";
import { ChatBubble, NextButton } from "../components";

import { AstrologicalProfile } from "../../AstrologicalProfile";

export function NatalChartPreviewSlide() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="natal-chart-preview" type="filler">
      {({ quizState }) => {
        return (
          <Box textColor={"white"}>
            <ChatBubble
              text={`Your Astrological Profile is ready! Below you see a tiny part of it – full profile awaits you at the end ✨`}
              onFinishedTyping={() => {
                setShowInput(true);
              }}
            />

            {showInput && (
              <>
                <AstrologicalProfile quizState={getPersonalInfoFromState(quizState)} />

                <NextButton mt={6} mb={3} onClick={() => submitQuestion()}>
                  Continue
                </NextButton>
              </>
            )}
          </Box>
        );
      }}
    </Slide>
  );
}
