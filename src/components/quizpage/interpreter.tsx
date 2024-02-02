import React from "react";
import { useQuizSnapshot } from "@martynasj/quiz-lib";

import { getPersonalInfoFromState } from "@utils/state";

import { ChatMessage } from "./components";
import { createNatalChartData } from "@utils/natalChart";
import { getOpenaiService, isApiError } from "@services/openaiService";
import { Box, Fade, Flex, Text } from "@chakra-ui/react";
import { Orb } from "@components/Orb";

export function NatalChartInterpreter(props: {
  title?: string;
  prompt: string;
  onFinishedAnswer?: () => void;
}) {
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
        const answer = await openai.fetchAnswer(natalChart, props.prompt);
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
  }, [props.prompt]);

  React.useEffect(() => {
    if (interpretation) {
      setTimeout(() => {
        props.onFinishedAnswer?.();
      }, 800);
    }
  }, [interpretation]);

  return (
    <Flex flexDirection={"column"} alignItems={"center"} position={"relative"}>
      <Box
        height={0}
        width={0}
        borderRadius={"50%"}
        boxShadow={"0px 0px 170px 100px #a2e0ffb3"}
        position={"absolute"}
        zIndex={10}
        top={"140px"}
        left={"50%"}
        transform={"translateX(-50%)"}
        opacity={0.7}
      />

      <Fade in={!Boolean(interpretation)} transition={{ exit: { duration: 0.3 } }} unmountOnExit>
        <Box mt={"40px"}>
          <Orb size={200} enableAnimation text="Loading..." />
        </Box>
      </Fade>

      <Fade in={Boolean(interpretation)} transition={{ enter: { duration: 0.3, delay: 0.5 } }}>
        <Flex
          flexDirection={"column"}
          backgroundColor={"white"}
          px={5}
          py={7}
          position={"relative"}
          color="black"
          borderRadius={"lg"}
        >
          {props.title && (
            <Text
              textAlign={"center"}
              fontStyle="italic"
              fontSize={"2xl"}
              color={"brand.300"}
              mb={5}
              fontWeight={"bold"}
            >
              {props.title}
            </Text>
          )}

          <ChatMessage
            fontSize={"lg"}
            fontStyle="italic"
            fontWeight={"semibold"}
            textAlign={"center"}
            color={"brand.300"}
            messageText={interpretation}
            onFinishedTyping={() => {
              // if (interpretation) {
              //   props.onFinishedAnswer?.();
              // }
            }}
          />
        </Flex>
      </Fade>
    </Flex>
  );
}
