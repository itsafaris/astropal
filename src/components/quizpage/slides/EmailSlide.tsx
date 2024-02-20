import React from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { Caption, SlideHeading, NextButton } from "../components";

import { Text } from "@chakra-ui/react";

export function EmailSlide() {
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <Content />
    </Slide>
  );
}

function Content() {
  return (
    <>
      <SlideHeading>
        Your first{" "}
        <Text as="span" color={"brand.600"}>
          Personalized Insight
        </Text>{" "}
        is ready! ✨
      </SlideHeading>

      <Text color="white" fontSize={"md"} mt={-3} mb={7}>
        Before we continue, please tell us where to send the next ones ✉️
      </Text>

      <Selector />

      <Caption mt={-6} mb={7}>
        We'll only use your email to send you insights. Keeping it simple and friendly ❣️
      </Caption>

      <NextButton>Get my insight</NextButton>
    </>
  );
}
