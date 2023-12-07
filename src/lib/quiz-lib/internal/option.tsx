import { Button, Flex, Image, Text, chakra, shouldForwardProp } from "@chakra-ui/react";

import { isValidMotionProp, motion } from "framer-motion";
import { ComponentProps } from "react";
import { CheckIcon, CheckIconEmpty } from "./icons";

const ChakraButton = chakra(motion.button, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});

export type OptionProps = OptionPropsSimple | OptionPropsPicture;

function OptionInput({ type, isSelected }: { type: "radio" | "checkbox"; isSelected: boolean }) {
  const size = "20px";
  switch (type) {
    case "checkbox": {
      return isSelected ? (
        <CheckIcon width={size} height={size} />
      ) : (
        <CheckIconEmpty width={size} height={size} />
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
  imgUrl: string;
} & BaseOptionProps;

export function OptionWithPicture({ imgHeight, text, imgUrl, ...rest }: OptionPropsPicture) {
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
      <Image width={"100%"} height={imgHeight} src={imgUrl} objectFit={"contain"} />
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
      fontWeight="semibold"
      outline={`${isSelected ? 3 : 0}px solid`}
      outlineColor={"secondary.400"}
      backgroundColor={isSelected ? "secondary.100" : "secondary.50"}
      // @ts-expect-error
      transition={{
        scale: { type: "spring", stiffness: 800, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
      {...chakraButtonProps}
    >
      {children}
    </ChakraButton>
  );
}
