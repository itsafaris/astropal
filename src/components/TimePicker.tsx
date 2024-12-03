import { ComponentProps } from "react";

import { BsMoonFill, BsMoonStarsFill, BsSunFill, BsSunriseFill } from "react-icons/bs";
import {
  Flex,
  FormControl,
  Grid,
  HStack,
  Icon,
  Select,
  SelectProps,
  Stack,
  Text,
} from "@chakra-ui/react";

import { IconType } from "react-icons";
import React from "react";

export type Time = {
  hour: number;
  minute: number;
  meridiem: "am" | "pm";
  quickPeriod?: "Morning" | "Noon" | "Evening" | "Night";
};

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const meridiem = ["am", "pm"] as const;

const DEFAULT_TIME = { hour: 12, minute: 0, meridiem: "am" as const };

export function TimePicker({ onSelect }: { onSelect: (time: Time) => void }) {
  const [time, setTime] = React.useState<Time>(DEFAULT_TIME);

  const handleSelect = (value: string, part: "hour" | "minute" | "meridiem") => {
    const v = part === "meridiem" ? value : parseInt(value);
    const next: Time = {
      ...time,
      quickPeriod: undefined,
      [part]: v,
    };

    setTime(next);
    onSelect(next);
  };

  return (
    <Stack>
      <HStack>
        <FormControl>
          <MySelect
            id="hour"
            value={time.hour}
            onChange={(e) => {
              handleSelect(e.target.value, "hour");
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
            value={time.minute}
            onChange={(e) => {
              handleSelect(e.target.value, "minute");
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
            value={time.meridiem}
            onChange={(e) => {
              const v = e.target.value as "am" | "pm";
              handleSelect(v, "meridiem");
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
        Or, if you don't know the exact time:
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
          isSelected={time.quickPeriod === "Morning"}
          onClick={async () => {
            const next: Time = {
              hour: 6,
              minute: 0,
              meridiem: "am",
              quickPeriod: "Morning",
            };

            onSelect(next);
            setTime(next);
          }}
          flex={1}
          flexShrink={0}
          title="Morning"
          subtitle="6am - 12pm"
          icon={BsSunriseFill}
        />
        <CustomButton
          isSelected={time.quickPeriod === "Noon"}
          onClick={async () => {
            const next: Time = {
              hour: 12,
              minute: 0,
              meridiem: "pm",
              quickPeriod: "Noon",
            };
            onSelect(next);
            setTime(next);
          }}
          flex={1}
          flexShrink={0}
          title="Noon"
          subtitle="12pm - 6pm"
          icon={BsSunFill}
        />
        <CustomButton
          isSelected={time.quickPeriod === "Evening"}
          onClick={async () => {
            const next: Time = {
              hour: 6,
              minute: 0,
              meridiem: "pm",
              quickPeriod: "Evening",
            };
            onSelect(next);
            setTime(next);
          }}
          flex={1}
          flexShrink={0}
          title="Evening"
          subtitle="6pm - 12am"
          icon={BsMoonFill}
        />
        <CustomButton
          isSelected={time.quickPeriod === "Night"}
          onClick={async () => {
            const next: Time = {
              hour: 12,
              minute: 0,
              meridiem: "am",
              quickPeriod: "Night",
            };
            onSelect(next);
            setTime(next);
          }}
          flex={1}
          flexShrink={0}
          title="Night"
          subtitle="12am - 6am"
          icon={BsMoonStarsFill}
        />
      </Grid>
    </Stack>
  );
}

function CustomButton({
  icon,
  title,
  subtitle,
  isSelected,
  ...rest
}: ComponentProps<typeof Stack> & {
  title: string;
  subtitle: string;
  icon: IconType;
  isSelected: boolean;
}) {
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
      <Stack spacing={0}>
        <Text fontSize={"xs"} fontWeight={"semibold"}>
          {title}
        </Text>
        <Text width={"100%"} fontSize={"2xs"} fontWeight={"semibold"}>
          {subtitle}
        </Text>
      </Stack>
    </Stack>
  );
}

function MySelect(props: ComponentProps<typeof Select>) {
  return <Select {...commonInputStyles()} {...props}></Select>;
}

export function commonInputStyles() {
  return {
    size: "lg",
    _hover: {
      borderColor: "bg.600",
    },
    _placeholder: {
      color: "text.400",
    },
    borderColor: "bg.600",
    borderWidth: 1,
    backgroundColor: "bg.200",
    color: "text.main",
  } satisfies SelectProps;
}
