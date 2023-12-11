import { createContext, useContext } from "react";
import { INTERNAL_Snapshot, proxy, ref, useSnapshot } from "valtio";
import { ISelectorType, LogicDefinition, SlideProps } from "../public/types";
import { getPosInBounds } from "./utils";

// E.g. GetSlideStateType<'multi'>
export type GetSlideStateType<T extends ISelectorType> = Extract<SelectorState, { type: T }>;

// re-export valtio utility to create a snapshot type
export type Snapshot<T> = INTERNAL_Snapshot<T>;

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
  progressValue?: number;
  isComplete?: boolean;
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

export function createQuizState(input: {
  initialState?: {
    slideID?: string;
  };
  // segments: SegmentDescriptor[];
  // slides: SlideProps[];
  onSlideSubmitted?: (slideState: { id: string; state: SelectorState }) => void;
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
        throw new Error(`duplicate slide id: ${slide.id}`);
      }
      if (!state.currentSlideID) {
        state.currentSlideID = slide.id;
      }
      state.slides.push(slide);
      state.slideStateByID[slide.id] = createSlideState(slide.type);
    },

    registerSegment(segment: SegmentDescriptor) {
      if (state.segments.some((s) => s.title === segment.title)) {
        throw new Error(`duplicate slide id: ${segment.title}`);
      }
      state.segments.push(segment);
    },

    /** Validate everything and go to next question */
    submitQuestion() {
      if (!state.currentSlide || !state.currentSlideState) {
        return;
      }

      const currentSlideState = state.slideStateByID[state.currentSlideID!];
      const currentSlide = state.currentSlide;

      if (!isSlideStateValid(state.currentSlideState)) {
        currentSlideState.attempts++;
        currentSlideState.confirmed = false;
        return;
      }

      currentSlideState.confirmed = true;
      currentSlideState.attempts = 0;
      input.onSlideSubmitted?.({
        id: currentSlide.id,
        state: currentSlideState,
      });

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
      if (!state.currentSlide) {
        return;
      }
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
      actions.goToSlideIdx(idx);
    },

    goToSlideIdx(idx: number) {
      if (idx >= state.slides.length || idx < 0) {
        return;
      }
      state.direction = idx < state.currentIdx ? -1 : 1;
      const slideId = state.slides[idx];
      state.currentSlideID = slideId.id;
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
