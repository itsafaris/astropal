import { Box, Button, Flex, FlexProps } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { devtools } from "valtio/utils";
import {
  QuizCtx,
  SelectorState,
  createQuizState,
  useQuizActions,
  useQuizSnapshot,
} from "../internal/state";

import { ChildrenArr, omit } from "../internal/utils";
import { ProgressIndicator } from "./progress";
import { QuizErrorEvent, SlideProps } from "./types";

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

export type QuizProps = {
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  containerProps?: FlexProps;
} & QuizConfigType;

type QuizConfigType = {
  locationApiKey: string;
  showDebugUI?: boolean;
  onErrorEvent?: (event: QuizErrorEvent) => void;
  // return only the id for now to not expose the proxied objects
  onSlideChange?: (newSlide: { id: string }) => void;
  onSlideSubmitted?: (state: { id: string; state: SelectorState }) => void;
};

const QuizConfigCtx = createContext<QuizConfigType>(null as any);

export function useQuizConfig() {
  return useContext(QuizConfigCtx);
}

export function Quiz(props: QuizProps) {
  const { children, locationApiKey, showDebugUI, onErrorEvent, onSlideChange, onSlideSubmitted } =
    props;

  const _children = ChildrenArr(children);

  const segments = _children
    .map((c) => c.props)
    .map((c) => ({
      title: c.title,
      slideCount: React.Children.count(c.children),
    }));

  const slides = _children.flatMap(
    (c) =>
      React.Children.map(c.props.children, (c) => omit(c!.props, "children") as SlideProps) ?? []
  );

  const q = useRef(
    (function () {
      return createQuizState({
        initialState: {
          slideID: getInitialSlideID(),
        },
        slides,
        segments,
        onSlideSubmitted,
      });
    })()
  ).current;

  const { state } = q;

  useEffect(() => {
    devtools(state, {});
  }, []);

  return (
    <QuizConfigCtx.Provider
      value={{
        locationApiKey,
        showDebugUI,
        onErrorEvent,
        onSlideChange,
        onSlideSubmitted,
      }}
    >
      <QuizCtx.Provider value={q}>
        <QuizUI {...props} />
      </QuizCtx.Provider>
    </QuizConfigCtx.Provider>
  );
}

export function QuizUI({ children, headerComponent, containerProps }: QuizProps) {
  const $quizRoot = useRef<HTMLDivElement>(null);

  useStateSyncToUrl();

  const config = useQuizConfig();

  const snap = useQuizSnapshot();

  const slideChildren = ChildrenArr(children).flatMap((c) => c.props.children ?? []);
  const currentSlide = slideChildren[snap.currentIdx];

  useEffect(() => {
    config.onSlideChange?.({ id: snap.currentSlideID });
  }, [snap.currentSlideID]);

  useEffect(() => {
    const root = document.body;
    root!.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [snap.currentSlideID]);

  // Change quiz bg color when slide has it defined
  useEffect(() => {
    const bg = snap.currentSlide.quizContainerProps?.bg;
    document.body.style.background = bg ?? "";
  }, [snap.currentSlide]);

  return (
    <Flex id="#quiz-lib-root" ref={$quizRoot} direction={"column"} {...containerProps}>
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
            {currentSlide}
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

function getInitialSlideID() {
  const params = new URLSearchParams(location.search);
  return params.get("slideid") ?? undefined;
}
