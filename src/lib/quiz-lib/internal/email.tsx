import { FormControl, Input, Text } from "@chakra-ui/react";
import { useSlide } from "../public/slide";
import { SlidePropsEmail } from "../public/types";
import { EmailState, useQuizActions, useQuizSnapshot } from "./state";
import { commonInputStyles } from "./commonInput";
import { MyFormLabel } from "./ui";
import { useState } from "react";

export type Email = {} & SlidePropsEmail;

export function Email({ placeholder, label }: Email) {
  const [localEmailValue, setLocalEmailValue] = useState("");

  const actions = useQuizActions();
  const slide = useSlide();
  const snap = useQuizSnapshot();

  const state = snap.slideStateByID[slide.id] as EmailState;

  return (
    <FormControl>
      {label && <MyFormLabel>{label}</MyFormLabel>}

      <Input
        {...commonInputStyles()}
        size={"lg"}
        placeholder={placeholder}
        value={localEmailValue}
        type="email"
        onChange={(e) => {
          setLocalEmailValue(e.target.value);
          actions.setEmailValue(slide.id, e.target.value);
        }}
        mb={7}
      />

      {!state.isValueValid && state.attempts > 0 && (
        <Text position={"absolute"} bottom={0} color="red.300" fontSize={"md"}>
          Please enter a valid email address
        </Text>
      )}
    </FormControl>
  );
}
