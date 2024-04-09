import React from "react";
import { Callout, Selector, Slide } from "@martynasj/quiz-lib";

import { Box, Flex } from "@chakra-ui/react";

import { NextButton, SlideHeading } from "../components";

export function Loading_SavingAstrologerPreferences() {
  const [showInput, setShowInput] = React.useState<boolean>(false);

  return (
    <Slide
      id="saving-preferences"
      type="loading"
      duration={3}
      onLoadingCompleted={() => setShowInput(true)}
    >
      <SlideHeading>Adjusting your astrologer to your preferences.</SlideHeading>

      <Callout title="💡 Hint">
        You can always adjust these settings later on in your profile settings
      </Callout>

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box my={5}>
          <Selector />
        </Box>

        {showInput && <NextButton mb={5}>Continue</NextButton>}
      </Flex>
    </Slide>
  );
}
