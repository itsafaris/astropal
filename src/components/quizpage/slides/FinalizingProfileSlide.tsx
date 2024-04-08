import React, { useEffect, useState } from "react";
import { Selector, Slide, useQuizState } from "@martynasj/quiz-lib";

import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import { NextButton, SlideHeading } from "../components";
import { createNewUserProfile } from "@utils/createUser";
import { getPersonalInfoFromState } from "@utils/state";

export function FinalizingProfileSlide() {
  return (
    <Slide id="finalizing-profile" type="filler">
      <Content />
    </Slide>
  );
}

export function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

const cycles = [
  "initial",
  "creating-user",
  "creating-natal-chart",
  "creating-todays-horoscope",
  "done",
] as const;

type CycleID = (typeof cycles)[number];

function Content() {
  const { quizState } = useQuizState();
  const p = getPersonalInfoFromState(quizState);
  const [loadingResult, setLoadingResult] = React.useState<{
    isLoading: boolean;
    error?: Error;
    result?: any;
  }>({ isLoading: true });
  const [cycle, setCycle] = useState<CycleID>("initial");

  async function startCycle() {
    setCycle(cycles[1]);
    await wait(1000);
    setCycle(cycles[2]);
    await wait(2000);
    setCycle(cycles[3]);
    await wait(2000);
    setCycle(cycles[4]);
  }

  async function startLoading() {
    setLoadingResult({ isLoading: true, result: undefined, error: undefined });
    createNewUserProfile(p)
      .then((result) => {
        setLoadingResult({ isLoading: false, error: undefined, result });
      })
      .catch((err) => {
        console.error(err);
        setLoadingResult({ isLoading: false, error: err, result: undefined });
      });
  }

  useEffect(() => {
    void startCycle();
  }, []);

  useEffect(() => {
    void startLoading();
  }, []);

  function renderStatusText() {
    switch (cycle) {
      case "initial":
        return "";
      case "creating-user":
        return "Creating user";
      case "creating-natal-chart":
        return "Creating natal chart reading";
      case "creating-todays-horoscope":
      case "done":
        return "Creating today's horoscope";
    }
  }

  return (
    <>
      <SlideHeading textAlign={"center"}>We're now creating your personal astrologer</SlideHeading>

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box my={5}>
          <Selector />
        </Box>

        {loadingResult.error ? (
          <Box>
            Error has occured when creating your profile. {JSON.stringify(loadingResult.error)}
          </Box>
        ) : loadingResult.isLoading || cycle !== "done" ? (
          <Box width={"100%"}>
            <Progress isIndeterminate />
            <Text color="text.main">{renderStatusText()}</Text>
          </Box>
        ) : (
          <Box>
            <SlideHeading>Your personal astrologer is now ready!</SlideHeading>
            <NextButton
              mb={5}
              onClick={() => {
                const params = new URLSearchParams();
                params.append("userID", loadingResult.result!.id);
                const url = `${process.env.GATSBY_WEBAPP_URL}?${params.toString()}`;
                location.href = url;
              }}
            >
              Take me to my astrologer
            </NextButton>
          </Box>
        )}
      </Flex>
    </>
  );
}
