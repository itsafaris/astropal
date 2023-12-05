import React from "react";
import { useEffect, useRef, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { SlidePropsLoading } from "../../public/types";
import { LoadingState, useQuizActions, useQuizSnapshot } from "../state";
import { randomInt } from "../utils";
import { useSlide } from "../..";
import { NextButton } from "../ui";

type LoadingSlideComponentProps = {} & SlidePropsLoading;

export function LoadingSlide({ phases }: LoadingSlideComponentProps) {
  const actions = useQuizActions();
  const slide = useSlide();
  const snap = useQuizSnapshot();

  const state = snap.currentSlideState as LoadingState;

  return (
    <Flex width={"full"} direction={"column"} gap={4} alignItems={"center"}>
      <SpinnerWihtText
        fromValue={0}
        toValue={70}
        duration={5}
        completedText={"✅ Done"}
        onComplete={() => {
          actions.setLoadingStateComplete(slide.id, true);
        }}
      />
      {state.isComplete && <NextButton />}
    </Flex>
  );
}

type SpinnerWihtTextProps = {
  fromValue?: number; // 0 - 100
  toValue?: number; // 0 - 100
  duration?: number; // seconds
  completedText?: string;
  onComplete?: () => void;
};

function SpinnerWihtText(props: SpinnerWihtTextProps) {
  const {
    fromValue = 0,
    toValue = 100,
    duration = 5,
    completedText,
    onComplete,
  } = props;

  const firedOnComplete = useRef(false);
  const [loadingValue, setLoadingValue] = useState(fromValue); // 0 - 100

  const INTERVAL_DURATION = 100;
  const numberOfIntervals = (duration * 1000) / INTERVAL_DURATION;

  const delta = toValue - fromValue;
  const increment = Math.round(delta / numberOfIntervals);
  const incrRandRange = [
    Math.round(increment * 0.7),
    Math.round(increment * 1.5),
  ];

  useEffect(() => {
    let i = 0;
    const updateProgress = () => {
      // last iteration
      // just set the loading value to the desired value
      if (i + 1 === numberOfIntervals) {
        setLoadingValue(toValue);
        fireOnComplete();
        clearInterval(interval);
        return;
      }

      const randomIncrement = randomInt(incrRandRange[0], incrRandRange[1]);

      setLoadingValue((prevValue) => {
        const nextVal = Math.min(prevValue + randomIncrement, toValue);
        if (nextVal === toValue) {
          fireOnComplete();
        }
        return nextVal;
      });

      i++;
    };

    const interval = setInterval(updateProgress, INTERVAL_DURATION);

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
    <Flex position={"relative"}>
      <SpinnerCircleSvg
        svgContainerProps={{ width: "300px", height: "300px" }}
        value={loadingValue}
      />
      <Flex
        display={"flex"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"absolute"}
        width={"100%"}
        height={"100%"}
        opacity={0.75}
      >
        <Text fontWeight={"bold"} color="white" fontSize={"2xl"}>
          {loadingValue === toValue ? completedText : `${loadingValue}%`}
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
  const val = FULL_DASH_ARRAY - FULL_DASH_ARRAY * (value / 100);

  return (
    <svg
      {...svgContainerProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      style={{
        transform: "rotate(90deg)",
      }}
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
          <stop stopColor="hsl(184, 74%, 44%)" offset="0%" />
          <stop stopColor="hsl(332, 87%, 70%)" offset="100%" />
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
          <feGaussianBlur
            stdDeviation="25 25"
            x="0%"
            y="0%"
            in="SourceGraphic"
            result="blur"
          />
        </filter>
        <filter
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="17 20"
            x="0%"
            y="0%"
            in="SourceGraphic"
            result="blur"
          />
        </filter>
      </defs>
      <g strokeWidth={30} stroke="url(#a)" fill="none" rotate={90}>
        <motion.circle r={318} cx={400} cy={400} filter="url(#b)" />
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
