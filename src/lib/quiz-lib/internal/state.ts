import { createContext, useContext } from "react";
import { INTERNAL_Snapshot, proxy, ref, snapshot, useSnapshot } from "valtio";
import { ISelectorType, LogicDefinition, SlideProps, TrackingEventCallback } from "../public/types";
import { getPosInBounds, validateEmail } from "./utils";
import { getSlideProperties } from "./tracking";

// E.g. GetSlideStateType<'multi'>
export type GetSlideStateType<T extends ISelectorType> = Extract<SelectorState, { type: T }>;

// re-export valtio utility to create a snapshot type
export type Snapshot<T> = INTERNAL_Snapshot<T>;

export type SelectorState =
  | MultiState
  | SingleState
  | ShortTextState
  | DateState
  | TimeState
  | LocationState
  | LoadingState
  | FillerState
  | EmailState;

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

export type EmailState = {
  type: "email";
  value?: string;
} & BaseSelectorState;

export type LocationState = {
  type: "location";
  value?: LocationValue;
} & BaseSelectorState;

export type LocationValue = Readonly<{
  formattedText: string;
  placeID: string;
  lat: number;
  long: number;
}>;

export type DateState = {
  type: "date";
  value?: DateValue;
} & BaseSelectorState;

export type TimeState = {
  type: "time";
  value?: TimeValue;
} & BaseSelectorState;

export type LoadingState = {
  type: "loading";
  progressValue?: number;
  isComplete?: boolean;
} & BaseSelectorState;

export type FillerState = {
  type: "filler";
} & BaseSelectorState;

export type BaseSelectorState = {
  attempts: number;
  confirmed: boolean;
  isValueValid: boolean;
};

export type SelectorValue = Readonly<{ value: string; idx: number }>;

export type DateValue = { year: number; month: number; day: number };

const QUICK_TIME_PERIODS = ["Morning", "Noon", "Evening", "Night"] as const;

export type QuickTimePeriod = (typeof QUICK_TIME_PERIODS)[number];

export type TimeValue = {
  hour: number;
  minute: number;
  meridiem: "am" | "pm";
  quickPeriod?: QuickTimePeriod;
};

export type SelectorDescriptor = {
  id: string;
  type: ISelectorType;
};

export type SegmentDescriptor = {
  title: string;
  slideCount: number;
};

export type QuizState = ReturnType<typeof createQuizState>;

export type QuizSlideState = QuizState["state"]["slideStateByID"];

function createSlideState(type: ISelectorType): SelectorState {
  return {
    type,
    attempts: 0,
    confirmed: false,
    isValueValid: true,
  };
}

export function createQuizState(input: {
  initialState?: {
    slideID?: string;
  };
  // segments: SegmentDescriptor[];
  // slides: SlideProps[];
  onSlideSubmitted?: (slideState: {
    id: string;
    state: SelectorState;
    getQuizState: () => Promise<QuizSlideState>;
  }) => void;
  onTrackingEvent?: TrackingEventCallback;
}) {
  // let validationError = validateSegments(input.segments);
  // if (validationError) {
  //   throw new Error(validationError);
  // }

  // validationError = validateSlides(input.slides);
  // if (validationError) {
  //   throw new Error(validationError);
  // }

  const state = proxy({
    currentSlideID: input.initialState?.slideID,
    direction: 0, // -1 or 1
    slideStateByID: {} as Record<string, SelectorState>,
    segments: [] as SegmentDescriptor[],
    slides: [] as SlideProps[],

    get currentIdx() {
      return this.slides.findIndex((s) => s.id === this.currentSlideID);
    },

    get slideCount() {
      return Object.keys(this.slideStateByID).length;
    },

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

    get currentSlide(): SlideProps | undefined {
      return this.slides[this.currentIdx];
    },

    get currentSlideState() {
      if (!this.currentSlide) {
        return;
      }
      if (!this.slideStateByID[this.currentSlide.id]) {
        this.slideStateByID[this.currentSlide.id] = createSlideState(this.currentSlide.type);
      }
      const state = this.slideStateByID[this.currentSlide.id];
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

  const actions = {
    registerSlide(slide: SlideProps) {
      if (state.slides.some((s) => s.id === slide.id)) {
        // throw new Error(`duplicate slide id: ${slide.id}`);
        return;
      }

      state.slides.push(ref(slide));
      state.slideStateByID[slide.id] = createSlideState(slide.type);

      if (!state.currentSlideID) {
        actions.goToSlideID(slide.id);
      }
    },

    registerSegment(segment: SegmentDescriptor) {
      if (state.segments.some((s) => s.title === segment.title)) {
        // throw new Error(`duplicate slide id: ${segment.title}`);
        return;
      }
      state.segments.push(segment);
    },

    checkQuestion(): boolean {
      if (!state.currentSlide || !state.currentSlideState) {
        return false;
      }

      const currentSlideState = state.slideStateByID[state.currentSlideID!];

      if (!isSlideStateValid(state.currentSlideState)) {
        currentSlideState.attempts++;
        currentSlideState.confirmed = false;
        currentSlideState.isValueValid = false;
        return false;
      }

      return true;
    },

    /** Validate everything and go to next question */
    submitQuestion(): boolean {
      if (!state.currentSlide || !state.currentSlideState) {
        return false;
      }

      const currentSlideState = state.slideStateByID[state.currentSlideID!];
      const currentSlide = state.currentSlide;

      if (!isSlideStateValid(state.currentSlideState)) {
        currentSlideState.attempts++;
        currentSlideState.confirmed = false;
        currentSlideState.isValueValid = false;
        return false;
      }

      currentSlideState.confirmed = true;
      currentSlideState.attempts = 0;
      currentSlideState.isValueValid = true;

      input.onSlideSubmitted?.({
        id: currentSlide.id,
        state: currentSlideState,
        // @ts-expect-error
        getQuizState: () => {
          return snapshot(state.slideStateByID);
        },
      });

      input.onTrackingEvent?.({
        name: "slide-submitted",
        properties: {
          ...getSlideProperties(currentSlide),
          slideValue: "value" in currentSlideState ? currentSlideState.value : null,
        },
      });

      if (currentSlide.type === "single" && currentSlide.logic) {
        const slideState = state.currentSlideState as SingleState;
        const slideId = evalLogic(slideState, currentSlide.logic);
        if (slideId != null) {
          actions.goToSlideID(slideId);
          return true;
        }
      }

      actions.goToNext();
      return true;
    },

    skipQuestion() {
      const slide = state.currentSlide;
      if (!slide) {
        return;
      }
      if (!slide.optional) {
        throw new Error("only optional question can be skipped");
      }

      input.onTrackingEvent?.({
        name: "slide-skipped",
        properties: {
          ...getSlideProperties(slide),
        },
      });

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
      actions.goToSlideIdx(idx);
    },

    goToSlideIdx(idx: number) {
      if (idx >= state.slides.length || idx < 0) {
        return;
      }

      const direction = idx < state.currentIdx ? -1 : 1;
      state.direction = direction;
      const nextSlide = state.slides[idx];
      state.currentSlideID = nextSlide.id;
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
      const optionIdx = slideState.value.findIndex((o) => o.value === value.value);
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

    setEmailValue(selectorID: string, value: string) {
      const slideState = state.slideStateByID[selectorID] as EmailState;
      slideState.value = value;
    },

    setDateValue(selectorID: string, value: DateValue) {
      const slideState = state.slideStateByID[selectorID] as DateState;
      slideState.value = value;
    },

    setTimeValue(selectorID: string, value: TimeValue) {
      const slideState = state.slideStateByID[selectorID] as TimeState;
      slideState.value = value;
    },

    setLocationValue(selectorID: string, value: LocationValue | undefined) {
      const slideState = state.slideStateByID[selectorID] as LocationState;
      slideState.value = value == null ? value : ref(value);
    },

    setLoadingStateComplete(selectorID: string, value: boolean) {
      const slideState = state.slideStateByID[selectorID] as LoadingState;
      slideState.isComplete = value;
    },

    setLoadingStateProgress(selectorID: string, value: number) {
      const slideState = state.slideStateByID[selectorID] as LoadingState;
      slideState.progressValue = value;
    },
  };

  return { state, actions };
}

type QuizCtxType = QuizState;

export function isSlideStateValid(state: SelectorState): boolean {
  switch (state.type) {
    case "single": {
      return state.value != null;
    }
    case "multi": {
      return state.value != null && state.value.length > 0;
    }
    case "date": {
      return state.value != null;
    }
    case "location": {
      return state.value != null;
    }
    case "short-text": {
      return state.value != null && state.value.trim() !== "";
    }
    case "email": {
      return state.value != null && validateEmail(state.value);
    }
    default: {
      return true;
    }
  }
}

export const QuizCtx = createContext<QuizCtxType>(null as any);

export type QuizSnapshot = ReturnType<typeof useQuizSnapshot>;

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
