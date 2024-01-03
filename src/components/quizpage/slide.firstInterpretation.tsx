import React, { useState } from "react";
import { Slide, Title, useQuiz, useQuizSnapshot } from "@martynasj/quiz-lib";

import { getPersonalInfoFromState } from "@utils/state";

import { ChatBubble, NextButton, Subtitle } from "./components";
import { createNatalChartData } from "@utils/natalChart";
import { getOpenaiService, isApiError } from "@services/openaiService";
import { Box, Text } from "@chakra-ui/react";

export function NatalChartInterpretationSlide() {
  return (
    <Slide
      id="natal-chart-interpretation"
      type="filler"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
      nextButtonProps={{ title: "I am ready" }}
    >
      {/* <NatalChartInterpreter /> */}
    </Slide>
  );
}

export function NatalChartInterpreter(props: { question: string; onFinishedAnswer?: () => void }) {
  const state = useQuizSnapshot();

  const [interpretation, setInterpretation] = React.useState<string>("");

  React.useEffect(() => {
    (async function () {
      const { yourBirthDate, yourBirthTime, yourBirthLocation } = getPersonalInfoFromState(
        state.slideStateByID
      );

      const natalChart = createNatalChartData({
        year: yourBirthDate.year,
        month: yourBirthDate.month,
        date: yourBirthDate.day,
        hour: yourBirthTime.time24.hour,
        minute: yourBirthTime.time24.minute,
        latitude: yourBirthLocation.lat,
        longitude: yourBirthLocation.long,
      });

      const openai = getOpenaiService({ mock: true });

      try {
        const answer = await openai.fetchAnswer(natalChart, props.question);
        setInterpretation(answer);
      } catch (err) {
        if (isApiError(err)) {
          setInterpretation(err.message);
        }
        throw err;
      }
    })();

    return () => {
      setInterpretation("");
    };
  }, [props.question]);

  return (
    <Box>
      <ChatBubble
        text={
          interpretation
            ? `${props.question}\n
        ${interpretation}`
            : "Analysing your Natal Chart..."
        }
        onFinishedTyping={() => {
          if (interpretation) {
            props.onFinishedAnswer?.();
          }
        }}
      />
    </Box>
  );
}
