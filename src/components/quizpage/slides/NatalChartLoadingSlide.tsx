import React, { useEffect, useState } from "react";
import { Callout, Slide, useQuizState } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton, Span } from "../components";
import { createNewUserProfile } from "@utils/coreApi";
import { wait } from "@utils/wait";
import { getPersonalInfoFromState } from "@utils/state";
import { Box, Progress, Text } from "@chakra-ui/react";

import { useUserProfileState } from "src/appState";

export function NatalChartLoadingSlide() {
  return (
    <Slide id="natal-chart-loading" type="filler">
      <Content />
    </Slide>
  );
}

const cycles = [
  "initial",
  "acquiring-natal-data",
  "creating-user",
  "creating-natal-chart",
  "done",
] as const;
type CycleID = (typeof cycles)[number];

function Content() {
  const { quizState } = useQuizState();
  const [userProfile, setUserProfile] = useUserProfileState();
  const p = getPersonalInfoFromState(quizState);

  const [cycle, setCycle] = useState<CycleID>("initial");

  async function startCycle() {
    setCycle(cycles[1]);
    await wait(2000);
    setCycle(cycles[2]);
    await wait(3000);
    setCycle(cycles[3]);
    await wait(3000);
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
    if (userProfile.result || userProfile.error) {
      setCycle("done");
      return;
    }
    void startCycle();
    void startLoading();
  }, []);

  function renderStatusText() {
    switch (cycle) {
      case "initial":
        return "";
      case "acquiring-natal-data":
        return "Acquiring natal data";
      case "creating-user":
        return "Creating user";
      case "creating-natal-chart":
      case "done":
        return userProfile.isLoading ? "Creating natal chart reading" : "Cosmic identity is ready";
    }
  }

  return (
    <>
      <SlideHeading textAlign={"center"}>
        Hold on while we calculate your cosmic identity
      </SlideHeading>
      <Callout title="Did you know?">
        A <Span>cosmic identity</Span> is a unique astrological map that outlines the positions of
        the planets and stars at the exact moment and location of your birth, shaping your
        personality, potential, and life path.
      </Callout>

      <Box width={"100%"}>
        <Progress
          isIndeterminate={cycle !== "done" || userProfile.isLoading}
          value={cycle === "done" && !userProfile.isLoading ? 100 : undefined}
        />

        {userProfile.error && (
          <Text color="text.main">
            Unfortunatelly we could not create your profile. Please try again!
          </Text>
        )}
        <Text color="text.main">{renderStatusText()}</Text>

        {userProfile.result && cycle === "done" && <NextButton my={8}>Continue</NextButton>}
      </Box>
    </>
  );
}
