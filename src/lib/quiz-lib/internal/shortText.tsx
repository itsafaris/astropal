import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useSlide } from "../public/slide";
import { SlidePropsShortText } from "../public/types";
import { ShortTextState, useQuizActions, useQuizSnapshot } from "./state";
import { commonInputStyles } from "./commonInput";
import { MyFormLabel } from "./ui";

export type ShortTextProps = {} & SlidePropsShortText;

export function ShortText({ placeholder, label }: ShortTextProps) {
  const actions = useQuizActions();
  const slide = useSlide();
  const snap = useQuizSnapshot();

  const state = snap.slideStateByID[slide.id] as ShortTextState;

  return (
    <FormControl>
      {label && <MyFormLabel>{label}</MyFormLabel>}
      <Input
        {...commonInputStyles()}
        size={"lg"}
        placeholder={placeholder}
        value={state.value ?? ""}
        onChange={(e) => {
          actions.setShortTextInputValue(slide.id, e.target.value);
        }}
      />
    </FormControl>
  );
}
