import { ComponentProps, useEffect } from "react";

import { BsMoonFill, BsMoonStarsFill, BsSunFill, BsSunriseFill } from "react-icons/bs";
import { Flex, FormControl, Grid, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { MySelect } from "./ui";
import { useSlide } from "../public/slide";
import { TimeState, useQuizActions, useQuizSnapshot } from "./state";
import { SlidePropsTime } from "../public/types";

import { IconType } from "react-icons";
import { wait } from "@utils/wait";

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const meridiem = ["am", "pm"] as const;

const DEFAULT_TIME = { hour: 12, minute: 0, meridiem: "am" as const };

export type TimePickerProps = {} & SlidePropsTime;

export function TimePicker(props: TimePickerProps) {
  const slide = useSlide();
  const snap = useQuizSnapshot();
  const actions = useQuizActions();

  const state = snap.slideStateByID[slide.id] as TimeState;

  useEffect(() => {
    if (!state.value) {
      actions.setTimeValue(slide.id, {
        ...DEFAULT_TIME,
      });
    }
  }, [state.value]);

  const handleExactTimePick = (value: string, part: "hour" | "minute" | "meridiem") => {
    const v = part === "meridiem" ? value : parseInt(value);
    actions.setTimeValue(slide.id, {
      ...DEFAULT_TIME,
      ...state.value,
      quickPeriod: undefined,
      [part]: v,
    });
  };

  return (
    <Stack>
      <HStack>
        <FormControl>
          <MySelect
            id="hour"
            value={state.value?.hour ?? 0}
            onChange={(e) => {
              handleExactTimePick(e.target.value, "hour");
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
              handleExactTimePick(e.target.value, "minute");
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
              handleExactTimePick(v, "meridiem");
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

      <Text textAlign={"center"} fontSize={"xs"} my={2}>
        Or, if you don't know the exact hour
      </Text>
      <Grid
        mt={2}
        autoFlow={"row"}
        gridTemplateColumns={"repeat(4, 1fr)"}
        justifyItems={"center"}
        autoColumns={"min-content"}
        gridGap={1}
      >
        <CustomButton
          isSelected={state.value?.quickPeriod === "Morning"}
          onClick={async () => {
            actions.setTimeValue(slide.id, {
              hour: 8,
              minute: 0,
              meridiem: "am",
              quickPeriod: "Morning",
            });
            await wait(150);
            actions.submitQuestion();
          }}
          width={"25%"}
          flex={1}
          flexShrink={0}
          title="Morning"
          icon={BsSunriseFill}
        />
        <CustomButton
          isSelected={state.value?.quickPeriod === "Noon"}
          onClick={async () => {
            actions.setTimeValue(slide.id, {
              hour: 2,
              minute: 0,
              meridiem: "pm",
              quickPeriod: "Noon",
            });
            await wait(150);
            actions.submitQuestion();
          }}
          width={"25%"}
          flex={1}
          flexShrink={0}
          title="Noon"
          icon={BsSunFill}
        />
        <CustomButton
          isSelected={state.value?.quickPeriod === "Evening"}
          onClick={async () => {
            actions.setTimeValue(slide.id, {
              hour: 8,
              minute: 0,
              meridiem: "pm",
              quickPeriod: "Evening",
            });
            await wait(150);
            actions.submitQuestion();
          }}
          width={"25%"}
          flex={1}
          flexShrink={0}
          title="Evening"
          icon={BsMoonFill}
        />
        <CustomButton
          isSelected={state.value?.quickPeriod === "Night"}
          onClick={async () => {
            actions.setTimeValue(slide.id, {
              hour: 2,
              minute: 0,
              meridiem: "am",
              quickPeriod: "Night",
            });
            await wait(150);
            actions.submitQuestion();
          }}
          width={"25%"}
          flex={1}
          flexShrink={0}
          title="Night"
          icon={BsMoonStarsFill}
        />
      </Grid>
    </Stack>
  );
}

function CustomButton({
  icon,
  title,
  isSelected,
  ...rest
}: ComponentProps<typeof Stack> & { title: string; icon: IconType; isSelected: boolean }) {
  return (
    <Stack as="button" alignItems={"center"} {...rest}>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        border="1px solid"
        borderColor={"bg.400"}
        borderRadius={"full"}
        height={12}
        width={12}
        bg={"bg.100"}
        outline={`${isSelected ? 3 : 0}px solid`}
        outlineColor={"brand.500"}
        backgroundColor={isSelected ? "bg.400" : "bg.200"}
      >
        <Icon as={icon} />
      </Flex>
      <Text fontSize={"xs"} fontWeight={"semibold"}>
        {title}
      </Text>
    </Stack>
  );
}
