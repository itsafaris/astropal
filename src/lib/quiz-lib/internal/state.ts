import { createContext, useContext } from "react";
import { proxy, ref, useSnapshot } from "valtio";
import { ISelectorType, LogicDefinition, SlideProps } from "../public/types";
import { findDuplicates, getPosInBounds } from "./utils";

export type SelectorState =
  | MultiState
  | SingleState
  | ShortTextState
  | DateState
  | LocationState
  | LoadingState
  | FillerState;

export type MultiState = {
  type: "multi";
  value?: SelectorValue[];
} & BaseSelectorState;

export type SingleState = {
  type: "single";
  value?: SelectorValue;
} & BaseSelectorState;

export type ShortTextState = {
  type: "short-text";
  value?: string;
} & BaseSelectorState;

export type LocationState = {
  type: "location";
  value?: LocationValue;
} & BaseSelectorState;

export type LocationValue = Readonly<{
  formattedText: string;
  placeID: string;
  lat: string;
  long: string;
}>;

export type DateState = {
  type: "date";
  value?: DateValue;
} & BaseSelectorState;

export type LoadingState = {
  type: "loading";
} & BaseSelectorState;

export type FillerState = {
  type: "filler";
} & BaseSelectorState;

export type BaseSelectorState = {
  attempts: number;
  confirmed: boolean;
};

export type SelectorValue = Readonly<{ idx: number; formattedValue: string }>;

export type DateValue = { year: number; month: number; day: number };

export type SelectorDescriptor = {
  id: string;
  type: ISelectorType;
};

export type SegmentDescriptor = {
  title: string;
  slideCount: number;
};

export type QuizState = ReturnType<typeof createQuizState>;

function createSlideState(type: ISelectorType): SelectorState {
  return {
    type,
    attempts: 0,
    confirmed: false,
  };
}

function validateSegments(segments: SegmentDescriptor[]): string | undefined {
  const ids = segments.map((s) => s.title);
  const duplicateIds = findDuplicates(ids);
  // check if all segments have unique ids
  if (duplicateIds.length !== 0) {
    return `more than one segment is using the same id: ${duplicateIds.join(", ")}`;
  }
}

function validateSlides(slides: SlideProps[]): string | undefined {
  const ids = slides.map((c) => c.id);
  const duplicateIds = findDuplicates(ids);
  // check if all slides have unique ids
  if (duplicateIds.length !== 0) {
    return `more than one slide is using the same id: ${duplicateIds.join(", ")}`;
  }
}

export function createQuizState(input: {
  initialState?: {
    slideID?: string;
  };
  segments: SegmentDescriptor[];
  slides: SlideProps[];
  onSlideSubmitted?: (slideState: { id: string; state: SelectorState }) => void;
}) {
  let validationError = validateSegments(input.segments);
  if (validationError) {
    throw new Error(validationError);
  }

  validationError = validateSlides(input.slides);
  if (validationError) {
    throw new Error(validationError);
  }

  // use provided initial slide id
  let initialSlideIdx = 0;
  if (input.initialState?.slideID) {
    const idx = input.slides.findIndex((s) => s.id === input.initialState?.slideID);
    if (idx !== -1) {
      initialSlideIdx = idx;
    }
  }

  const state = proxy({
    currentIdx: initialSlideIdx,
    direction: 0, // -1 or 1
    slideStateByID: {} as Record<string, SelectorState>,
    segments: input.segments,
    slides: input.slides,
    slideCount: input.slides.length,

    get segmentsFull() {
      let accLength = 0;
      return this.segments.map((s) => {
        const start = accLength;
        const end = accLength + s.slideCount;
        const bounds = [start, end] as const;
        accLength = end;

        return {
          bounds: bounds,
          ...s,
        };
      });
    },

    get currentSlideID() {
      const s = this.slides[this.currentIdx];
      return s.id;
    },

    get currentSlide() {
      return this.slides[this.currentIdx];
    },

    get currentSlideState() {
      if (!this.slideStateByID[this.currentSlideID]) {
        this.slideStateByID[this.currentSlideID] = createSlideState(this.currentSlide.type);
      }
      const state = this.slideStateByID[this.currentSlideID];
      return {
        ...state,
        isValid: isSlideStateValid(state),
      };
    },

    get currentSegmentIdx() {
      return this.segmentsFull.findIndex((s) => {
        const pos = getPosInBounds(this.currentIdx, s.bounds);
        return pos === "inside";
      });
    },

    get currentSegment() {
      return this.segmentsFull[this.currentSegmentIdx];
    },
  });

  input.slides.forEach((s) => {
    state.slideStateByID[s.id] = createSlideState(s.type);
  });

  const actions = {
    /** Validate everything and go to next question */
    submitQuestion() {
      const currentSlideState = state.slideStateByID[state.currentSlideID];
      const currentSlide = state.currentSlide;

      if (!isSlideStateValid(state.currentSlideState)) {
        currentSlideState.attempts++;
        currentSlideState.confirmed = false;
        return;
      }

      currentSlideState.confirmed = true;
      currentSlideState.attempts = 0;
      input.onSlideSubmitted?.({ id: currentSlide.id, state: currentSlideState });

      if (currentSlide.type === "single" && currentSlide.logic) {
        const slideState = state.currentSlideState as SingleState;
        const slideId = evalLogic(slideState, currentSlide.logic);
        if (slideId != null) {
          actions.goToSlideID(slideId);
          return;
        }
      }

      actions.goToNext();
    },

    skipQuestion() {
      if (!state.currentSlide.optional) {
        throw new Error("only optional question can be skipped");
      }
      actions.goToNext();
    },

    /** Go to next question without any validation */
    goToNext() {
      actions.goToSlideIdx(state.currentIdx + 1);
    },

    goToPrev() {
      actions.goToSlideIdx(state.currentIdx - 1);
    },

    goToSlideID(id: string) {
      const idx = state.slides.findIndex((s) => s.id === id);
      if (idx === -1) {
        console.warn(`Go to slide id '${id}' impossible: slide with this id does not exist`);
        return;
      }

      actions.goToSlideIdx(idx);
    },

    goToSlideIdx(idx: number) {
      if (idx >= state.slides.length || idx < 0) {
        return;
      }
      state.direction = idx < state.currentIdx ? -1 : 1;
      state.currentIdx = idx;
    },

    toggleRadioOption(selectorID: string, value: SelectorValue) {
      const slideState = state.slideStateByID[selectorID] as SingleState;
      slideState.value = value;
      setTimeout(() => {
        actions.submitQuestion();
      }, 200);
    },

    toggleMultiOption(selectorID: string, value: SelectorValue) {
      const slideState = state.slideStateByID[selectorID] as MultiState;
      if (!slideState.value) {
        slideState.value = [];
      }
      const optionIdx = slideState.value.findIndex(
        (o) => o.formattedValue === value.formattedValue
      );
      if (optionIdx === -1) {
        slideState.value.push(value);
      } else {
        slideState.value.splice(optionIdx, 1);
      }
    },

    setShortTextInputValue(selectorID: string, value: string) {
      const slideState = state.slideStateByID[selectorID] as ShortTextState;
      slideState.value = value;
    },

    setDateValue(selectorID: string, value: DateValue) {
      const slideState = state.slideStateByID[selectorID] as DateState;
      slideState.value = value;
    },

    setLocationValue(selectorID: string, value: LocationValue | undefined) {
      const slideState = state.slideStateByID[selectorID] as LocationState;
      slideState.value = value == null ? value : ref(value);
    },
  };

  return { state, actions };
}

type QuizCtxType = QuizState;

export function isSlideStateValid(state: SelectorState) {
  switch (state.type) {
    case "single": {
      return state.value != null;
    }
    case "multi": {
      return state.value && state.value.length > 0;
    }
    case "date": {
      return state.value != null;
    }
    case "location": {
      return state.value != null;
    }
    case "short-text": {
      return state.value && state.value.trim() !== "";
    }
    default: {
      return true;
    }
  }
}

export const QuizCtx = createContext<QuizCtxType>(null as any);

export function useQuizSnapshot() {
  return useSnapshot(useContext(QuizCtx).state);
}

export function useQuizActions() {
  return useContext(QuizCtx).actions;
}

function evalLogic(slideState: SingleState, logic: LogicDefinition) {
  for (const gate of logic) {
    if (gate.optionIdx === slideState.value?.idx) {
      return gate.slideID;
    }
  }
}
