import { Box, Button, Flex, FlexProps } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";

import { useQuizActions, useQuizSnapshot } from "../internal/state";
import { ProgressIndicator } from "./progress";
import { useQuizConfig } from "./quizProvider";
import { getSlideProperties } from "../internal/tracking";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export type QuizUIProps = {
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  containerProps?: FlexProps;
};

export function QuizUI({ children, headerComponent, containerProps }: QuizUIProps) {
  useStateSyncToUrl();

  const config = useQuizConfig();
  const snap = useQuizSnapshot();

  useEffect(() => {
    if (snap.currentSlide) {
      const slide = snap.currentSlide;
      config.onSlideChange?.({ id: snap.currentSlide.id });
      config.onTrackingEvent?.({
        name: "slide-entered",
        properties: {
          ...getSlideProperties(slide),
        },
      });
    }
  }, [snap.currentSlide]);

  useEffect(() => {
    const root = document.body;
    root!.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [snap.currentSlideID]);

  return (
    <Flex id="#quiz-lib-root" direction={"column"} {...containerProps}>
      <QuizBg />
      {config.showDebugUI && <DebugUI />}
      {headerComponent && <Box id="header-wrapper">{headerComponent}</Box>}
      <ProgressIndicator />
      <Flex position={"relative"} flexGrow={1} width={"100%"}>
        <AnimatePresence initial={false} custom={snap.direction}>
          <motion.div
            style={{
              width: "100%",
              position: "absolute",
            }}
            key={snap.currentSlideID}
            custom={snap.direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Flex>
    </Flex>
  );
}

function DebugUI() {
  const quiz = useQuizSnapshot();
  const actions = useQuizActions();
  return (
    <Flex style={{ background: "yellow" }} gap={2} p={1}>
      <span>debug </span>
      <span>current idx: {quiz.currentIdx}</span>
      <span>total: {quiz.slideCount}</span>
      <Button
        variant={"outline"}
        size="xs"
        onClick={() => {
          actions.goToPrev();
        }}
      >
        prev
      </Button>
      <Button
        variant={"outline"}
        size="xs"
        onClick={() => {
          actions.goToNext();
        }}
      >
        next
      </Button>
    </Flex>
  );
}

const PARAM_SLIDE_ID = "slideid";

function useStateSyncToUrl() {
  const snap = useQuizSnapshot();
  const actions = useQuizActions();

  // update URL parameter when state changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get(PARAM_SLIDE_ID);
    if (paramValue === snap.currentSlideID) {
      return;
    }
    if (!snap.currentSlideID) {
      return;
    }
    history.pushState(null, "", `?${PARAM_SLIDE_ID}=${snap.currentSlideID}`);
  }, [snap.currentSlideID]);

  // Effect to update the state when the URL parameter changes
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const paramValue = params.get(PARAM_SLIDE_ID);
      if (paramValue) {
        actions.goToSlideID(paramValue);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
}

/**
 * Renders a full screen background below the quiz
 * It's a separate component for performance reasons
 */
function QuizBg() {
  const snap = useQuizSnapshot();
  const customBg = snap.currentSlide?.quizContainerProps?.bg;
  const customBgGradient = snap.currentSlide?.quizContainerProps?.bgGradient;

  return (
    <Box
      id="bg-div"
      zIndex={-1}
      width={"100%"}
      height={"100vh"}
      position={"fixed"}
      background={customBg}
      bgGradient={
        customBgGradient ? customBgGradient : customBg ? undefined : "radial(bg.100, bg.50)"
      }
    />
  );
}
