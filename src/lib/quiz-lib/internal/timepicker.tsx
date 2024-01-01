import { useEffect } from "react";
import { FormControl, HStack } from "@chakra-ui/react";
import { MySelect } from "./ui";
import { useSlide } from "../public/slide";
import { TimeState, useQuizActions, useQuizSnapshot } from "./state";
import { SlidePropsTime } from "../public/types";

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const meridiem = ["am", "pm"] as const;

const DEFAULT_TIME = { hour: 12, minute: 0, meridiem: "am" as const };

export type TimePickerProps = {} & SlidePropsTime;

function formatTo24Hour(timeObj: { hour: number; meridiem: string; minute: number }): {
  hour: number;
  minute: number;
} {
  let { hour, minute, meridiem } = timeObj;

  if (meridiem === "pm" && hour !== 12) {
    hour += 12;
  } else if (meridiem === "am" && hour === 12) {
    hour = 0;
  }

  return { hour, minute };
}

export function TimePicker(props: TimePickerProps) {
  const slide = useSlide();
  const snap = useQuizSnapshot();
  const actions = useQuizActions();

  const state = snap.slideStateByID[slide.id] as TimeState;

  useEffect(() => {
    if (!state.value) {
      actions.setTimeValue(slide.id, {
        ...DEFAULT_TIME,
        hour24format: formatTo24Hour(DEFAULT_TIME),
      });
    }
  }, [state.value]);

  return (
    <HStack>
      <FormControl>
        <MySelect
          id="hour"
          value={state.value?.hour ?? 0}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            const timeValue = {
              ...DEFAULT_TIME,
              ...state.value,
              hour: v,
            };

            actions.setTimeValue(slide.id, {
              ...timeValue,
              hour24format: formatTo24Hour(timeValue),
            });
          }}
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </MySelect>
      </FormControl>
      <FormControl>
        <MySelect
          id="minute"
          value={state.value?.minute ?? 0}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            const timeValue = {
              ...DEFAULT_TIME,
              ...state.value,
              minute: v,
            };

            actions.setTimeValue(slide.id, {
              ...timeValue,
              hour24format: formatTo24Hour(timeValue),
            });
          }}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m.toString().padStart(2, "0")}
            </option>
          ))}
        </MySelect>
      </FormControl>
      <FormControl>
        <MySelect
          id="meridiem"
          value={state.value?.meridiem ?? "am"}
          onChange={(e) => {
            const v = e.target.value as "am" | "pm";
            const timeValue = {
              ...DEFAULT_TIME,
              ...state.value,
              meridiem: v,
            };

            actions.setTimeValue(slide.id, {
              ...timeValue,
              hour24format: formatTo24Hour(timeValue),
            });
          }}
        >
          {meridiem.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </MySelect>
      </FormControl>
    </HStack>
  );
}
