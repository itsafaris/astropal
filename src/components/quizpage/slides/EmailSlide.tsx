import React from "react";
import { Selector, Slide, useSlideState, EmailState } from "@martynasj/quiz-lib";

import { Caption, SlideHeading, NextButton } from "../components";

import { Text } from "@chakra-ui/react";
import { navigate } from "gatsby";
import { validateEmail } from "@utils/email";

export function EmailSlide() {
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <Content />
    </Slide>
  );
}

function Content() {
  const { value } = useSlideState<EmailState>();
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true);

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
      {!isEmailValid && (
        <Text mt={-6} mb={4} color="red.300" fontSize={"md"}>
          Please enter a valid email address
        </Text>
      )}

      <Caption mb={7}>
        We'll only use your email to send you insights. Keeping it simple and friendly ❣️
      </Caption>

      <NextButton
        onClick={() => {
          if (!validateEmail(value ?? "")) {
            setIsEmailValid(false);
            return;
          }

          navigate("/summary");
        }}
      >
        Get my insights
      </NextButton>
    </>
  );
}
