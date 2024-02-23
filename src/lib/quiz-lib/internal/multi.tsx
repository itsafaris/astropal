import { useCallback } from "react";
import { Box } from "@chakra-ui/react";

import { useSlide } from "../public/slide";
import { SlidePropsMulti } from "../public/types";
import { CommonSelect } from "./commonSelect";
import { MultiState, SelectorValue, useQuizActions, useQuizSnapshot } from "./state";

import { MyFormLabel } from "./ui";

export type MultiSelectProps = {} & SlidePropsMulti;

export function MultiSelect(props: MultiSelectProps) {
  const actions = useQuizActions();
  const slideCtx = useSlide();
  const snap = useQuizSnapshot();

  const handleClick = useCallback((value: SelectorValue) => {
    actions.toggleMultiOption(slideCtx.id, value);
  }, []);

  const selectorState = snap.slideStateByID[slideCtx.id] as MultiState | undefined;

  return (
    <Box>
      <MyFormLabel>{props.label ?? "Choose one or more"} </MyFormLabel>
      <CommonSelect
        handleOptionClick={handleClick}
        isOptionSelected={(o) => selectorState?.value?.some((v) => v.value === o.value) ?? false}
      />
    </Box>
  );
}
