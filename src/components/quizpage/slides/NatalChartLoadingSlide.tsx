import React, { useEffect, useState } from "react";
import { Slide, useQuizState } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";
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
        return "Creating natal chart reading";
    }
  }

  function renderContent() {
    if (cycle !== "done" || userProfile.isLoading) {
      return (
        <Box width={"100%"}>
          <Progress isIndeterminate />
          <Text color="text.main">{renderStatusText()}</Text>
        </Box>
      );
    }

    if (cycle === "done" && !userProfile.isLoading) {
      if (userProfile.error || !userProfile.result) {
        return (
          <Box width={"100%"}>
            <Text color="text.main">
              Unfortunatelly we could not create your profile. Please try again!
            </Text>
          </Box>
        );
      }

      return (
        <Box width={"100%"}>
          <SlideHeading>Your natal chart reading is prepared!</SlideHeading>
          <NextButton my={8}>Continue</NextButton>
        </Box>
      );
    }

    return null;
  }

  return (
    <>
      <SlideHeading textAlign={"center"} text="Just a moment... finding your cosmic identity" />
      {renderContent()}
    </>
  );
}
