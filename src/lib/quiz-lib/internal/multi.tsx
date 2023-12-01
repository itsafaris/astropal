import { useCallback } from "react";
import { useSlide } from "../public/slide";
import { SlidePropsMulti } from "../public/types";
import { CommonSelect } from "./commonSelect";
import { MultiState, SelectorValue, useQuizActions, useQuizSnapshot } from "./state";

export type MultiSelectProps = {} & SlidePropsMulti;

export function MultiSelect({}: MultiSelectProps) {
  const actions = useQuizActions();
  const slideCtx = useSlide();
  const snap = useQuizSnapshot();

  const handleClick = useCallback((value: SelectorValue) => {
    actions.toggleMultiOption(slideCtx.id, value);
  }, []);

  const selectorState = snap.slideStateByID[slideCtx.id] as MultiState | undefined;

  return (
    <CommonSelect
      handleOptionClick={handleClick}
      isOptionSelected={(optionID) =>
        selectorState?.value?.some((v) => v.formattedValue === optionID) ?? false
      }
    />
  );
}
