import React from "react";
import { useEffect, useRef, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { SlidePropsLoading } from "../../public/types";
import { useQuizActions } from "../state";
import { randomInt } from "../utils";
import { useSlide } from "../..";

type LoadingSlideComponentProps = {} & SlidePropsLoading;

export function LoadingSlide(props: LoadingSlideComponentProps) {
  const actions = useQuizActions();
  const slide = useSlide() as SlidePropsLoading;

  return (
    <Flex width={"full"} direction={"column"} gap={4} alignItems={"center"}>
      <SpinnerWihtText
        {...props}
        onProgressValueChange={(value) => {
          actions.setLoadingStateProgress(slide.id, value);
        }}
        onComplete={() => {
          props.onLoadingCompleted?.();
          actions.setLoadingStateComplete(slide.id, true);
          if (slide.autoProceed) {
            setTimeout(() => {
              actions.goToNext();
            }, 1000);
          }
        }}
      />
    </Flex>
  );
}

type SpinnerWihtTextProps = {
  from?: SlidePropsLoading["from"];
  to?: SlidePropsLoading["to"];
  duration?: SlidePropsLoading["duration"];
  completedText?: SlidePropsLoading["completedText"];
  statusText?: SlidePropsLoading["statusText"];
  onProgressValueChange?: (value: number) => void;
  onComplete?: () => void;
};

function SpinnerWihtText(props: SpinnerWihtTextProps) {
  const {
    from = 0,
    to = 100,
    duration = 5,
    completedText,
    statusText,
    onComplete,
    onProgressValueChange,
  } = props;

  const firedOnComplete = useRef(false);
  const [loadingValue, setLoadingValue] = useState(from); // 0 - 100

  const INTERVAL_DURATION = 100;
  const numberOfIntervals = (duration * 1000) / INTERVAL_DURATION;

  const delta = to - from;
  const increment = Math.round(delta / numberOfIntervals);
  const incrRandRange = [Math.round(increment * 0.7), Math.round(increment * 1.5)];

  useEffect(() => {
    let i = 0;
    const updateProgress = () => {
      // last iteration
      // just set the loading value to the desired value
      if (i + 1 === numberOfIntervals) {
        setLoadingValue(to);
        fireOnComplete();
        clearInterval(interval);
        return;
      }

      const randomIncrement = randomInt(incrRandRange[0], incrRandRange[1]);

      setLoadingValue((prevValue) => {
        const nextVal = Math.min(prevValue + randomIncrement, to);
        if (nextVal === to) {
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

  useEffect(() => {
    onProgressValueChange?.(loadingValue);
  }, [loadingValue]);

  function fireOnComplete() {
    if (!firedOnComplete.current) {
      firedOnComplete.current = true;
      onComplete?.();
    }
  }

  function getStatusText() {
    const defaultStatusText: SlidePropsLoading["statusText"] =
      loadingValue === 100 ? "Completed" : "Loading...";
    const _statusText = statusText ?? defaultStatusText;
    return typeof _statusText === "string" ? _statusText : _statusText({ progress: loadingValue });
  }

  return (
    <Flex position={"relative"}>
      <SpinnerCircleSvg
        svgContainerProps={{ width: "200px", height: "200px" }}
        value={loadingValue}
      />
      <Flex
        display={"flex"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"absolute"}
        width={"70%"}
        height={"100%"}
        opacity={0.75}
        transform={"translateX(-50%)"}
        left="50%"
      >
        <Text fontWeight={"semibold"} color="white" fontSize={"xl"}>
          {loadingValue === to ? completedText ?? `${loadingValue}%` : `${loadingValue}%`}
        </Text>

        <Text textAlign={"center"} color="bg.900" fontSize={"sm"} fontWeight={"semibold"}>
          {getStatusText()}
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
          <stop stopColor="#5fb0a1" offset="0%" />
          <stop stopColor="white" offset="100%" />
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
        <filter
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="17 20" x="0%" y="0%" in="SourceGraphic" result="blur" />
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
