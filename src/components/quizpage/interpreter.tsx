import React from "react";
import { useQuizSnapshot } from "@martynasj/quiz-lib";
import { Flex, Fade, Box, Text, Stack } from "@chakra-ui/react";
import { getPersonalInfoFromState } from "@utils/state";

import { ChatMessage, TypewriterText } from "./components";
import { createNatalChartData } from "@utils/natalChart";
import { getOpenaiService, isApiError } from "@services/openaiService";

import { Orb2 } from "@components/Orb";

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

export function NatalChartInterpreter2(props: { question: string; onFinishedAnswer?: () => void }) {
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
    <Flex width={"full"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
      <Fade
        in={!Boolean(interpretation)}
        unmountOnExit={true}
        transition={{ enter: { duration: 1 }, exit: { duration: 0.4 } }}
      >
        <Orb2 size={200} enableAnimation />
      </Fade>

      <Fade in={Boolean(interpretation)} transition={{ enter: { duration: 1, delay: 0.4 } }}>
        <TypewriterText
          fontSize={"xl"}
          fontStyle={"italic"}
          fontWeight={"bold"}
          color="white"
          fontFamily={"serif"}
          text={interpretation || "Analysing your Natal Chart..."}
          onFinishedTyping={() => {
            if (interpretation) {
              props.onFinishedAnswer?.();
            }
          }}
        />
      </Fade>
    </Flex>
  );
}
