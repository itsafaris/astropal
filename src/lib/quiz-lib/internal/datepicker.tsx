import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSlide } from "../public/slide";
import { SlidePropsDate } from "../public/types";
import { DateState, DateValue, useQuizActions, useQuizSnapshot } from "./state";

const DEFAULT_DATE: DateValue = { year: 1990, month: 1, day: 1 };

const days = Array(31)
  .fill(0)
  .map((_, idx) => idx + 1);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array(100)
  .fill(0)
  .map((_, i) => new Date().getFullYear() - i);

export type DatePickerProps = {} & SlidePropsDate;

export function DatePicker(_: DatePickerProps) {
  const slide = useSlide();
  const snap = useQuizSnapshot();
  const actions = useQuizActions();

  useEffect(() => {
    actions.setDateValue(slide.id, {
      ...DEFAULT_DATE,
    });
  }, []);

  const state = snap.slideStateByID[slide.id] as DateState;

  return (
    <Flex width={"full"} gap={2}>
      <Box flex={3} width={"full"}>
        <Text>Day</Text>
        <Select
          onChange={(e) => {
            const v = parseInt(e.target.value);
            actions.setDateValue(slide.id, {
              ...DEFAULT_DATE,
              ...state.value,
              day: v,
            });
          }}
          value={state.value?.day ?? DEFAULT_DATE.day}
        >
          {days.map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
        </Select>
      </Box>
      <Box flex={5} width={"full"}>
        <Text>Month</Text>
        <Select
          onChange={(e) => {
            const v = parseInt(e.target.value);
            actions.setDateValue(slide.id, {
              ...DEFAULT_DATE,
              ...state.value,
              month: v,
            });
          }}
          value={state.value?.month ?? DEFAULT_DATE.month}
        >
          {months.map((month, idx) => (
            <option value={idx + 1} key={month}>
              {month}
            </option>
          ))}
        </Select>
      </Box>
      <Box flex={4} width={"full"}>
        <Text>Year</Text>
        <Select
          onChange={(e) => {
            const v = parseInt(e.target.value);
            actions.setDateValue(slide.id, {
              ...DEFAULT_DATE,
              ...state.value,
              year: v,
            });
          }}
          value={state.value?.year ?? DEFAULT_DATE.year}
        >
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>
  );
}

export default DatePicker;
