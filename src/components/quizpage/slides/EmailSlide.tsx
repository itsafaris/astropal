import { EmailState, Selector, Slide, useSlideState } from "@martynasj/quiz-lib";
import { FaLock } from "react-icons/fa6";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import { Caption, SlideHeading, NextButton, Span } from "../components";
import { navigate } from "gatsby";
import { validateEmail } from "@utils/email";

export function EmailSlide() {
  return (
    <Slide
      id="your-email"
      type="email"
      placeholder="Enter your email to get your book"
      hideNextButton
    >
      <Content />
    </Slide>
  );
}

function Content() {
  const { value } = useSlideState<EmailState>();

  return (
    <>
      <SlideHeading textAlign={"center"}>
        Enter your email <br /> to get your personal <br />
        <Span>Self-Discovery Guide</Span>
      </SlideHeading>

      <Selector />

      <Flex gap={2}>
        <Box flexShrink={0} color="blackAlpha.700">
          <FaLock size={"0.8em"} />
        </Box>
        <Caption mb={5}>
          We respect your privacy and are committed to protecting your personal data. We will email
          you a copy of your book for convenient access.
        </Caption>
      </Flex>

      <NextButton
        onClick={() => {
          if (!validateEmail(value ?? "")) {
            return;
          }
          navigate("/summary");
        }}
      >
        Continue
      </NextButton>
    </>
  );
}
