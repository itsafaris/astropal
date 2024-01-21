import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { Box } from "@chakra-ui/react";

import { getPersonalInfoFromState } from "@utils/state";
import { ChatBubble, NextButton } from "./components";

import { AstrologicalProfile } from "../AstrologicalProfile";

export function NatalChartPreviewSlide() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="natal-chart-preview" type="filler" nextButtonProps={{ title: "Let's go!" }}>
      {({ quizState }) => {
        return (
          <Box textColor={"white"}>
            <ChatBubble
              text={`Here is a preview of your Astrological Profile! We will use it as our foundation going forward.`}
              onFinishedTyping={() => {
                setShowInput(true);
              }}
            />

            {showInput && (
              <>
                <AstrologicalProfile quizState={getPersonalInfoFromState(quizState)} />

                <NextButton mt={6} mb={3} onClick={() => submitQuestion()}>
                  Next
                </NextButton>
              </>
            )}
          </Box>
        );
      }}
    </Slide>
  );
}
