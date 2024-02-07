import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";
import { FaLock } from "react-icons/fa6";
import { Box, Flex } from "@chakra-ui/react";

import { Caption, SlideHeading, NextButton, Span } from "../components";

export function EmailSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide
      id="your-email"
      type="email"
      placeholder="Enter your email to get your book"
      hideNextButton
    >
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
          submitQuestion();
        }}
      >
        Continue
      </NextButton>
    </Slide>
  );
}
