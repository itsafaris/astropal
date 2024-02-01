import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton, SpanJust, Span } from "../components";
import { StaticImage } from "gatsby-plugin-image";
import { Flex } from "@chakra-ui/react";

export function IntroSlide() {
  const { submitQuestion } = useQuiz();
  const imgStyle = {
    width: 64,
    height: 64,
    borderRadius: "100%",
    border: "2px solid orange",
  };
  return (
    <Slide id="intro" type="filler">
      <SlideHeading
        text={
          <SpanJust>
            Hey there! We have helped more than <Span>31,000 souls</Span> explore and understand
            themselves better, so we can help you too 👋
          </SpanJust>
        }
      />

      <Flex gap={4} flexWrap={"wrap"} justifyContent={"center"}>
        {Array(2)
          .fill("")
          .map(() => {
            return (
              <>
                <StaticImage
                  src="../../../images/user1.png"
                  alt="user of Astropal"
                  style={{ ...imgStyle, transform: "scale(0.8)" }}
                />
                <StaticImage
                  src="../../../images/user2.png"
                  alt="user of Astropal"
                  style={{ ...imgStyle, transform: "scale(1.1)" }}
                />
                <StaticImage
                  src="../../../images/user3.png"
                  alt="user of Astropal"
                  style={{ ...imgStyle, transform: "scale(1)" }}
                />
                <StaticImage
                  src="../../../images/user4.png"
                  alt="user of Astropal"
                  style={{ ...imgStyle, transform: "scale(0.6)" }}
                />
                <StaticImage
                  src="../../../images/user5.png"
                  alt="user of Astropal"
                  style={{ ...imgStyle, transform: "scale(1)" }}
                />
              </>
            );
          })}
      </Flex>

      <NextButton
        mt={8}
        onClick={() => {
          submitQuestion();
        }}
      >
        Continue
      </NextButton>
    </Slide>
  );
}
