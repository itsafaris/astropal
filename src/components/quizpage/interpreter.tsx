import React from "react";
import { useQuizSnapshot } from "@martynasj/quiz-lib";

import { getPersonalInfoFromState } from "@utils/state";

import { ChatBubble, TypewriterText } from "./components";
import { createNatalChartData } from "@utils/natalChart";
import { getOpenaiService, isApiError } from "@services/openaiService";
import { Box } from "@chakra-ui/react";

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

      const openai = getOpenaiService();

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
      <TypewriterText
        text={interpretation || "Analysing your Natal Chart..."}
        onFinishedTyping={() => {
          if (interpretation) {
            props.onFinishedAnswer?.();
          }
        }}
      />
    </Box>
  );
}
