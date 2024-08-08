import React from "react";
import { useEffect, useRef, useState } from "react";
import { Flex, Progress, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { SlidePropsLoading } from "../../public/types";
import { useQuizActions } from "../state";
import { randomInt } from "../utils";
import { useSlide } from "../..";

const DEFAULT_COLOR = "#dfbe9d96";
const BOX_SHADOW_CSS = `0px 0px 50px 0px ${DEFAULT_COLOR}, 0px 0px 10px 0px ${DEFAULT_COLOR}`;

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
  variant?: SlidePropsLoading["variant"];
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
    variant = "circle",
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

  if (variant === "linear") {
    return (
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Text textAlign={"center"} color="brand.900" fontSize={"md"} fontWeight={"semibold"}>
          {getStatusText()}
        </Text>
        <Text fontWeight={"semibold"} color="brand.900" fontSize={"lg"}>
          {loadingValue === to ? completedText ?? `${loadingValue}%` : `${loadingValue}%`}
        </Text>
        <Progress width={"full"} value={loadingValue} colorScheme="brand" borderRadius={"full"} />
      </Flex>
    );
  }

  return (
    <Flex position={"relative"} boxShadow={BOX_SHADOW_CSS} borderRadius={"50%"}>
      {/* <SpinnerCircleSvg value={loadingValue} /> */}

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
        <Text fontWeight={"semibold"} color="brand.900" fontSize={"2xl"}>
          {loadingValue === to ? completedText ?? `${loadingValue}%` : `${loadingValue}%`}
        </Text>

        <Text textAlign={"center"} color="brand.900" fontSize={"md"} fontWeight={"semibold"}>
          {getStatusText()}
        </Text>
      </Flex>
    </Flex>
  );
}

function SpinnerCircleSvg({
  value = 100,
  size = 200,
}: {
  size?: number;
  value?: number; // 0 - 1
  duration?: number; // in seconds
}) {
  const FULL_DASH_ARRAY = 1571;
  const val = FULL_DASH_ARRAY - FULL_DASH_ARRAY * (value / 100);

  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      style={{
        transform: "rotate(90deg)",
        boxShadow: `inset 0px 0px 20px 10px ${DEFAULT_COLOR}`,
        borderRadius: "50%",
      }}
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="loading-spinner-1">
          <stop stopColor="#dfbe9d" offset="0%" />
          <stop stopColor="white" offset="100%" />
        </linearGradient>
      </defs>

      <g strokeWidth={40} stroke="url(#loading-spinner-1)" fill="none">
        <motion.circle
          r={"50%"}
          cx={"50%"}
          cy={"50%"}
          strokeDasharray={FULL_DASH_ARRAY}
          strokeDashoffset={val}
        />
      </g>
    </svg>
  );
}
