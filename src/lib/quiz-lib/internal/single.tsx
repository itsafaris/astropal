import { useCallback } from "react";
import { useSlide } from "../public/slide";
import { SlidePropsSingle } from "../public/types";
import { CommonSelect } from "./commonSelect";
import { SelectorValue, SingleState, useQuizActions, useQuizSnapshot } from "./state";

export type SingleSelectProps = {} & SlidePropsSingle;

export function SingleSelect(_: SingleSelectProps) {
  const actions = useQuizActions();
  const slideCtx = useSlide();
  const snap = useQuizSnapshot();

  const handleClick = useCallback((value: SelectorValue) => {
    actions.toggleRadioOption(slideCtx.id, value);
  }, []);

  const selectorState = snap.slideStateByID[slideCtx.id] as SingleState | undefined;

  return (
    <CommonSelect
      handleOptionClick={handleClick}
      isOptionSelected={(optionID) => selectorState?.value?.formattedValue === optionID}
    />
  );
}
