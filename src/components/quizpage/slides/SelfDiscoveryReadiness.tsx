import React, { useState, useRef, useEffect } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";
import { SlideHeading, NextButton } from "../components";
import { StaticImage } from "gatsby-plugin-image";

import { motion } from "framer-motion";
import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";

export function SelfDiscoveryReadiness() {
  const [showNext, setShowNext] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="self-discovery-readiness" type="filler">
      <SlideHeading
        text={`Based on your responses, let us assess your readiness for Self-Discovery ✨`}
      />

      <Flex position={"relative"}>
        <StaticImage alt="" src="../../../images/readiness.jpg" />

        <ReadinessChart
          onComplete={() => setShowResult(true)}
          position={"absolute"}
          top={"40%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
        />
      </Flex>

      {showResult && (
        <Box mt={6}>
          <SlideHeading
            text={`You are fully ready! Let's create your Self-Discovery guide and get started`}
          />
        </Box>
      )}

      {showResult && (
        <NextButton mb={3} onClick={() => submitQuestion()}>
          Create my Self-Discovery guide
        </NextButton>
      )}
    </Slide>
  );
}

function ReadinessChart({ onComplete, ...rest }: { onComplete?: () => void } & FlexProps) {
  const from = 0;
  const to = 83;
  const firedOnComplete = useRef(false);
  const [loadingValue, setLoadingValue] = useState(from);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      if (i + 1 === to) {
        fireOnComplete();
        clearInterval(interval);
      }

      const nextValue = i + 1;

      setLoadingValue(nextValue);

      i = nextValue;
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function fireOnComplete() {
    if (!firedOnComplete.current) {
      firedOnComplete.current = true;
      onComplete?.();
    }
  }

  return (
    <Flex
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
      width={300}
      height={150}
      {...rest}
    >
      <SpinnerCircleSvg value={loadingValue} />

      <Flex
        display={"flex"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"absolute"}
        transform={"translate(-50%, 50%)"}
        left={"50%"}
        top={"30%"}
      >
        <Text fontWeight={"bold"} color="white" fontSize={"5xl"}>
          {`${loadingValue}%`}
        </Text>
      </Flex>
    </Flex>
  );
}

function SpinnerCircleSvg({
  value = 100,
  svgContainerProps,
}: {
  value?: number; // 0 - 1
  duration?: number; // in seconds
  svgContainerProps?: React.SVGProps<SVGSVGElement>;
}) {
  const FULL_DASH_ARRAY = 1998; // this value is hardcoded, it depends on the radius of SVG (2*PI*r)
  const val = FULL_DASH_ARRAY - FULL_DASH_ARRAY * (value / 100 / 2);

  return (
    <svg
      {...svgContainerProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      style={{
        transform: "rotate(180deg)",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
          <stop stopColor="#d2a879" offset="0%" />
          <stop stopColor="#d2a879" offset="100%" />
        </linearGradient>

        <filter
          id="b"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="25 25" x="0%" y="0%" in="SourceGraphic" result="blur" />
        </filter>
      </defs>

      <g strokeWidth={35} stroke="url(#a)" fill="none">
        <motion.circle
          r={318}
          cx={400}
          cy={400}
          filter="url(#b)"
          strokeDasharray={FULL_DASH_ARRAY}
          strokeDashoffset={val}
        />
        <motion.circle
          r={318}
          cx={400}
          cy={400}
          strokeDasharray={FULL_DASH_ARRAY}
          strokeDashoffset={val}
        />
      </g>
    </svg>
  );
}
