import React, { useEffect, useRef, useState } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";
import {
  Button,
  Flex,
  Grid,
  chakra,
  shouldForwardProp,
  Text,
  Stack,
  Box,
  Fade,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ChatBubble, NextButton } from "./components";
import { Orb } from "@components/Orb";

export function LifeSatisfactionScoreSlide() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="life-satisfaction-score" type="filler">
      <ChatBubble
        text={`Heres your life satisfaction score`}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <Fade
          in={true}
          unmountOnExit={true}
          transition={{ enter: { duration: 1 }, exit: { duration: 0.4 } }}
        >
          <SpinnerWihtText onComplete={() => {}} />
        </Fade>
      )}

      {/* {showInput && (
        <>
          <SpinnerWihtText onComplete={() => {}} />

          <NextButton mt={6} mb={3} onClick={() => submitQuestion()}>
            Continue
          </NextButton>
        </>
      )} */}
    </Slide>
  );
}

type SpinnerWihtTextProps = {
  onComplete?: () => void;
};

function SpinnerWihtText(props: SpinnerWihtTextProps) {
  const { onComplete } = props;

  const from = 0;
  const to = 63;
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
    }, 20);

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
    <Box position={"relative"}>
      <Orb size={200} position={"absolute"} zIndex={0} left={"11px"} top={"11px"} enableAnimation />
      <SpinnerCircleSvg
        svgContainerProps={{ width: "222px", height: "222px" }}
        value={loadingValue}
      />
    </Box>
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
  const val = FULL_DASH_ARRAY - FULL_DASH_ARRAY * (value / 100);

  return (
    <svg
      {...svgContainerProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      style={{
        transform: "rotate(0deg)",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
          <stop stopColor="#cdfdff" offset="0%" />
          <stop stopColor="#cdfdff" offset="100%" />
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

      <g strokeWidth={50} stroke="url(#a)" fill="none" rotate={90}>
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
