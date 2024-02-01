import React from "react";
import { useQuizSnapshot } from "@martynasj/quiz-lib";

import { getPersonalInfoFromState } from "@utils/state";

import { ChatMessage } from "./components";
import { createNatalChartData } from "@utils/natalChart";
import { getOpenaiService, isApiError } from "@services/openaiService";

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
    <ChatMessage
      avatarIcon="🧙‍♂️"
      avatarName="Starlyn"
      messageText={interpretation || "Analysing your Astrological Profile..."}
      onFinishedTyping={() => {
        if (interpretation) {
          props.onFinishedAnswer?.();
        }
      }}
    ></ChatMessage>
  );
}
