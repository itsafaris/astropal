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
        <CheckIcon width={size} height={size} color={theme.colors.text["700"]} />
      ) : (
        <CheckIconEmpty width={size} height={size} color={theme.colors.text["200"]} />
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
  size?: "small" | "medium";
} & BaseOptionProps;

export function OptionSimple({
  text,
  icon,
  selectorIconType,
  size = "medium",
  ...rest
}: OptionPropsSimple) {
  const iconSize = size === "small" ? 5 : 10;
  return (
    <BaseOption
      display="flex"
      alignItems="center"
      px={size === "small" ? 2 : 4}
      py={size === "small" ? 1 : 2}
      {...rest}
    >
      {icon && (
        <Flex width={iconSize} height={iconSize} alignItems={"center"} justifyContent={"center"}>
          {typeof icon === "string" ? (
            <Text fontSize={size === "small" ? "lg" : "3xl"}>{icon}</Text>
          ) : (
            icon
          )}
        </Flex>
      )}
      <Text
        textAlign={"start"}
        fontSize={size === "small" ? "sm" : "md"}
        flexGrow={1}
        my={size === "small" ? 1 : 2}
        ml={size === "small" ? 2 : 3}
        mr={2}
      >
        {text}
      </Text>
      {size === "medium" && <OptionInput type={selectorIconType} isSelected={rest.isSelected} />}
    </BaseOption>
  );
}

type OptionPropsPicture = {
  text: string;
  hideText?: boolean;
  imgHeight: number;
  imgComponent: React.ReactNode;
} & BaseOptionProps;

export function OptionWithPicture({
  imgHeight,
  text,
  imgComponent,
  hideText,
  ...rest
}: OptionPropsPicture) {
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
      {!hideText && <Text fontWeight={"bold"}>{text}</Text>}
    </BaseOption>
  );
}

type BaseOptionProps = {
  isSelected: boolean;
} & Omit<ComponentProps<typeof Button>, "size">;

function BaseOption({ isSelected, children, ...chakraButtonProps }: BaseOptionProps) {
  return (
    <ChakraButton
      as={motion.button}
      borderRadius={"md"}
      outline={`${isSelected ? 3 : 0}px solid`}
      outlineColor={"brand.500"}
      backgroundColor={isSelected ? "bg.400" : "bg.200"}
      // @ts-expect-error
      transition={{
        scale: { type: "spring", stiffness: 800, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
      color={"text.main"}
      {...chakraButtonProps}
    >
      {children}
    </ChakraButton>
  );
}
