import React, { useEffect, useState } from "react";
import { Selector, Slide, useQuizState } from "@martynasj/quiz-lib";

import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import { NextButton, SlideHeading } from "../components";
import { createNewUserProfile } from "@utils/coreApi";
import { getPersonalInfoFromState } from "@utils/state";
import { wait } from "@utils/wait";

export function FinalizingProfileSlide() {
  return (
    <Slide id="finalizing-profile" type="filler">
      <Content />
    </Slide>
  );
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

  const [cycle, setCycle] = useState<CycleID>("initial");
  const [userProfile, setUserProfile] = React.useState<{
    isLoading: boolean;
    error?: Error;
    result?: { id?: string };
  }>({ isLoading: true });

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
    setUserProfile({ isLoading: true, result: undefined, error: undefined });
    createNewUserProfile(p)
      .then((result) => {
        setUserProfile({ isLoading: false, error: undefined, result });
      })
      .catch((err) => {
        setUserProfile({ isLoading: false, error: err, result: undefined });
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

  function renderContent() {
    if (cycle !== "done" || userProfile.isLoading) {
      return (
        <Box width={"100%"}>
          <Progress isIndeterminate />
          <Text color="white">{renderStatusText()}</Text>
        </Box>
      );
    }

    if (cycle === "done" && !userProfile.isLoading) {
      if (userProfile.error || !userProfile.result) {
        return (
          <Box width={"100%"}>
            <Text color="white">
              Unfortunatelly we could not create your profile. Please try again!
            </Text>
          </Box>
        );
      }

      return (
        <Box width={"100%"}>
          <SlideHeading>Your personal astrologer is now ready!</SlideHeading>
          <NextButton
            mb={5}
            onClick={() => {
              const params = new URLSearchParams();
              params.append("userID", userProfile.result!.id!);
              const url = `${process.env.GATSBY_WEBAPP_URL}?${params.toString()}`;
              location.href = url;
            }}
          >
            Take me to my astrologer
          </NextButton>
        </Box>
      );
    }

    return null;
  }

  return (
    <>
      <SlideHeading textAlign={"center"}>We're now creating your personal astrologer</SlideHeading>

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box my={5}>
          <Selector />
        </Box>

        {renderContent()}
      </Flex>
    </>
  );
}
