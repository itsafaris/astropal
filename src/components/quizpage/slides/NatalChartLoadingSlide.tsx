import React, { useEffect, useState } from "react";
import { Callout, Slide } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton, Span } from "../components";

import { Progress, Text } from "@chakra-ui/react";

export function NatalChartLoadingSlide() {
  return (
    <Slide id="natal-chart-loading" type="filler">
      <Content />
    </Slide>
  );
}

function Content() {
  const [loadedValue, setLoadedValue] = useState(0);

  useEffect(() => {
    const it = setInterval(() => {
      setLoadedValue((v) => {
        if (v === 100) {
          clearInterval(it);
          return 100;
        }
        return v === 100 ? 100 : v + 1;
      });
    }, 70);

    return () => {
      clearInterval(it);
    };
  }, []);

  function renderStatusText() {
    if (loadedValue <= 0) {
      return "";
    }

    if (loadedValue <= 30) {
      return "Acquiring natal data";
    }

    if (loadedValue <= 60) {
      return "Calculating your chart";
    }

    if (loadedValue < 100) {
      return "Creating cosmic identity";
    }

    if (loadedValue === 100) {
      return "Done";
    }
  }

  return (
    <>
      <SlideHeading>Hold on while we calculate your cosmic identity</SlideHeading>
      <Callout title="What's a cosmic identity?">
        It's a unique astrological <Span whiteSpace={"nowrap"}>🌌 map</Span> that outlines the
        positions of the <Span whiteSpace={"nowrap"}>🪐 planets</Span> and{" "}
        <Span whiteSpace={"nowrap"}>⭐ stars</Span> at the exact moment and location of your birth,
        shaping your personality, potential, and life path.
      </Callout>

      <Text fontSize="sm" fontWeight={"semibold"} mb={2}>
        {renderStatusText()}
      </Text>
      <Progress
        value={loadedValue}
        size="sm"
        colorScheme={loadedValue === 100 ? "green" : "bg"}
        borderRadius={"full"}
      />
      <Text
        fontWeight={"semibold"}
        color={loadedValue === 100 ? "text.main" : "text.300"}
        fontSize={"sm"}
        mt={2}
      >
        {loadedValue === 100 ? "Cosmic identity is ready" : `${loadedValue} / 100`}
      </Text>

      {loadedValue === 100 && <NextButton my={8}>Continue</NextButton>}
    </>
  );
}
