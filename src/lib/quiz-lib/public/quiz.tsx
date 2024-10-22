import { Box, Button, Flex, FlexProps, Grid, Select, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useQuizActions, useQuizSnapshot } from "../internal/state";
import { ProgressIndicator } from "./progress";
import { useQuizConfig } from "./quizProvider";
import { getSlideProperties } from "../internal/tracking";

export type QuizUIProps = {
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  containerProps?: FlexProps;
  progressContainerProps?: { showTitle?: boolean } & FlexProps;
};

export function QuizUI({
  children,
  headerComponent,
  containerProps,
  progressContainerProps,
}: QuizUIProps) {
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
          // @ts-expect-error
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

      <ProgressIndicator {...progressContainerProps} />

      <Flex position={"relative"} flexGrow={1} width={"100%"} justifyContent={"center"}>
        {children}
      </Flex>
    </Flex>
  );
}

function DebugUI() {
  const quiz = useQuizSnapshot();
  const actions = useQuizActions();
  return (
    <Grid
      style={{ background: "black" }}
      gap={2}
      p={1}
      autoFlow={"column"}
      color="text.invert"
      zIndex={1000}
    >
      <Text>total: {quiz.slideCount}</Text>
      <Button
        size="xs"
        onClick={() => {
          actions.goToPrev();
        }}
      >
        prev
      </Button>
      <Button
        size="xs"
        onClick={() => {
          actions.goToNext();
        }}
      >
        next
      </Button>
      <Select
        size="xs"
        onChange={(e) => {
          actions.goToSlideID(e.target.value);
        }}
        value={quiz.currentSlideID}
      >
        {quiz.slides.map((s, idx) => {
          return (
            <option key={s.id} value={s.id}>
              {idx + 1} - {s.id}
            </option>
          );
        })}
      </Select>
    </Grid>
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
        customBgGradient ? customBgGradient : customBg ? undefined : "radial(bg.50, bg.50)"
      }
    />
  );
}
