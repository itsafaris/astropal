import React, { useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { useSlide } from "../public/slide";
import { SlidePropsSingle } from "../public/types";
import { CommonSelect } from "./commonSelect";
import { SelectorValue, SingleState, useQuizActions, useQuizSnapshot } from "./state";

import { MyFormLabel } from "./ui";

export type SingleSelectProps = {} & SlidePropsSingle;

export function SingleSelect(props: SingleSelectProps) {
  const actions = useQuizActions();
  const slideCtx = useSlide();
  const snap = useQuizSnapshot();

  const handleClick = useCallback((value: SelectorValue) => {
    actions.toggleRadioOption(slideCtx.id, value);
  }, []);

  const selectorState = snap.slideStateByID[slideCtx.id] as SingleState | undefined;

  return (
    <Box>
      <MyFormLabel>{props.label ?? "Choose one"}</MyFormLabel>
      <CommonSelect
        handleOptionClick={handleClick}
        isOptionSelected={(o) => selectorState?.value?.value === o.value}
      />
    </Box>
  );
}
