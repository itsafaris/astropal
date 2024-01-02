import React from "react";
import { Slide, Title, useQuizSnapshot } from "@martynasj/quiz-lib";

import { getPersonalInfoFromState } from "@utils/state";

import { ChatBubble, Subtitle } from "./components";
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
      <NatalChartInterpreter />
    </Slide>
  );
}

function NatalChartInterpreter() {
  const state = useQuizSnapshot();

  const [interpretation, setInterpretation] = React.useState<string>("");

  React.useEffect(() => {
    if (state.currentSlideID === "natal-chart-interpretation") {
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
        const PROMPT = "Describe my personality";

        try {
          const answer = await openai.fetchAnswer(natalChart, PROMPT);
          setInterpretation(answer);
        } catch (err) {
          if (isApiError(err)) {
            setInterpretation(err.message);
          }
          throw err;
        }
      })();
    }
  }, [state.currentSlideID]);

  return (
    <Box>
      {/* <ChatBubble text="Thinking..." /> */}
      <ChatBubble
        text={`"What am I as a person?"\n\n You're a passionate leader, adventurous at heart, caring, practical-minded, and you value security and personal growth. Sometimes, you experience internal conflicts about freedom versus responsibility.`}
      />

      <Text my={6} color="whiteAlpha.400" textAlign={"center"} maxWidth={"70%"} mx="auto">
        Now you are ready to ask any question you desire.
      </Text>
    </Box>
  );
}
