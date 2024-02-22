import React from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { Box, Flex } from "@chakra-ui/react";
import { NextButton, SlideHeading, Span } from "../components";

export function FinalizingProfileSlide() {
  const [showInput, setShowInput] = React.useState<boolean>(false);

  return (
    <Slide
      id="finalizing-profile"
      type="loading"
      duration={5}
      onLoadingCompleted={() => setShowInput(true)}
    >
      <SlideHeading textAlign={"center"}>
        Adjusting your <Span>Astrological Self-Discovery Mentorship Program</Span> based on your
        answers
      </SlideHeading>

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box my={5}>
          <Selector />
        </Box>

        {showInput && <NextButton mb={5}>Continue</NextButton>}
      </Flex>
    </Slide>
  );
}
