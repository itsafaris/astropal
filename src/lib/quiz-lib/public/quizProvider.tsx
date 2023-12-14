import React, { createContext, useContext, useEffect, useRef } from "react";
import { devtools } from "valtio/utils";

import { QuizCtx, SelectorState, createQuizState } from "../internal/state";
import { QuizErrorEvent, TrackingEventCallback } from "./types";

export type QuizProps = {
  children?: React.ReactNode;
} & QuizConfigType;

export type QuizConfigType = {
  locationApiKey: string;
  showDebugUI?: boolean;
  onErrorEvent?: (event: QuizErrorEvent) => void;
  // return only the id for now to not expose the proxied objects
  onSlideChange?: (newSlide: { id: string }) => void;
  onSlideSubmitted?: (state: { id: string; state: SelectorState }) => void;
  onTrackingEvent?: TrackingEventCallback;
};

const QuizConfigCtx = createContext<QuizConfigType>(null as any);

export function useQuizConfig() {
  return useContext(QuizConfigCtx);
}

function getInitialSlideID() {
  const params = new URLSearchParams(location.search);
  return params.get("slideid") ?? undefined;
}

export function QuizProvider(props: QuizProps) {
  const { children, ...rest } = props;
  const { onSlideSubmitted, onTrackingEvent } = rest;

  const q = useRef(
    (function () {
      return createQuizState({
        initialState: {
          slideID: getInitialSlideID(),
        },
        onSlideSubmitted,
        onTrackingEvent,
      });
    })()
  ).current;

  const { state } = q;

  useEffect(() => {
    devtools(state, {});
  }, []);

  return (
    <QuizConfigCtx.Provider value={{ ...rest }}>
      <QuizCtx.Provider value={q}>{children}</QuizCtx.Provider>
    </QuizConfigCtx.Provider>
  );
}
