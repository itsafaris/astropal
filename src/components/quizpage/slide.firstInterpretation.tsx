import React from "react";
import { Slide, useQuizSnapshot } from "@martynasj/quiz-lib";

import { getPersonalInfoFromState } from "@utils/state";

import { Subtitle } from "./components";
import { createNatalChartData } from "@utils/natalChart";
import { getOpenaiService, isApiError } from "@services/openaiService";

export function NatalChartInterpretationSlide() {
  return (
    <Slide
      id="natal-chart-interpretation"
      type="filler"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
      nextButtonProps={{ title: "Continue" }}
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

        const openai = getOpenaiService({ mock: false });
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

  return <Subtitle>{interpretation}</Subtitle>;
}
