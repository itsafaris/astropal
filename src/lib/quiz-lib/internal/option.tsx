import { Box, Button, Flex, Text, chakra, shouldForwardProp, useTheme } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import React, { ComponentProps } from "react";

import { CheckIcon, CheckIconEmpty } from "./icons";

const ChakraButton = chakra(motion.button, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});

export type OptionProps = OptionPropsSimple | OptionPropsPicture;

function OptionInput({ type, isSelected }: { type: "radio" | "checkbox"; isSelected: boolean }) {
  const size = "20px";
  const theme = useTheme();
  switch (type) {
    case "checkbox": {
      return isSelected ? (
        <CheckIcon width={size} height={size} color={theme.colors.bg["700"]} />
      ) : (
        <CheckIconEmpty width={size} height={size} color={theme.colors.bg["400"]} />
      );
    }
    case "radio": {
      return null;
    }
    default: {
      return null;
    }
  }
}

type OptionPropsSimple = {
  text: string;
  icon?: React.ReactNode;
  selectorIconType: "radio" | "checkbox";
} & BaseOptionProps;

export function OptionSimple({ text, icon, selectorIconType, ...rest }: OptionPropsSimple) {
  return (
    <BaseOption display="flex" alignItems="center" px={4} py={1} {...rest}>
      {icon && (
        <Flex width={10} height={10} alignItems={"center"} justifyContent={"center"}>
          {typeof icon === "string" ? <Text fontSize={"3xl"}>{icon}</Text> : icon}
        </Flex>
      )}
      <Text textAlign={"start"} flexGrow={1} my={3} ml={4} mr={2}>
        {text}
      </Text>
      <OptionInput type={selectorIconType} isSelected={rest.isSelected} />
    </BaseOption>
  );
}

type OptionPropsPicture = {
  text: string;
  imgHeight: number;
  imgComponent: React.ReactNode;
} & BaseOptionProps;

export function OptionWithPicture({ imgHeight, text, imgComponent, ...rest }: OptionPropsPicture) {
  return (
    <BaseOption
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      p={4}
      width={"full"}
      {...rest}
    >
      <Box maxHeight={imgHeight}>{imgComponent}</Box>
      <Text>{text}</Text>
    </BaseOption>
  );
}

type BaseOptionProps = {
  isSelected: boolean;
} & ComponentProps<typeof Button>;

function BaseOption({ isSelected, children, ...chakraButtonProps }: BaseOptionProps) {
  return (
    <ChakraButton
      as={motion.button}
      borderRadius={"md"}
      outline={`${isSelected ? 3 : 0}px solid`}
      outlineColor={"bg.400"}
      backgroundColor={isSelected ? "bg.300" : "bg.200"}
      // @ts-expect-error
      transition={{
        scale: { type: "spring", stiffness: 800, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
      color={"bg.900"}
      {...chakraButtonProps}
    >
      {children}
    </ChakraButton>
  );
}
