import React from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { Box, Flex, Text } from "@chakra-ui/react";
import { NextButton, SlideHeading } from "../components";

export function FinalizingProfileSlide() {
  const [showInput, setShowInput] = React.useState<boolean>(false);

  return (
    <Slide
      id="finalizing-profile"
      type="loading"
      duration={7}
      onLoadingCompleted={() => setShowInput(true)}
    >
      <SlideHeading
        textAlign={"center"}
        text="Finalizing your Natal Chart to provide the most accurate insight"
      />

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box my={5}>
          <Selector />
        </Box>

        {showInput && <NextButton mb={5}>Continue</NextButton>}

        <Text textAlign={"center"} color="brand.600" fontSize={"3xl"} fontWeight={"bold"}>
          310'000+ people
        </Text>

        <Text textAlign={"center"} color="white" fontWeight={"bold"} fontSize={"lg"} mb={5}>
          have chosen Astropal as their Personal Astrologer
        </Text>
      </Flex>
    </Slide>
  );
}
