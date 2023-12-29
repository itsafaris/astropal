import { Button, Box, useTheme, FormLabel, Select } from "@chakra-ui/react";
import { ComponentProps } from "react";

import { useQuizActions } from "./state";
import { useSlide } from "../public/slide";
import { commonInputStyles } from "./commonInput";

export function NextButton(props: ComponentProps<typeof Button>) {
  const quiz = useQuizActions();
  const theme = useTheme();
  const { nextButtonProps } = useSlide();

  const title = nextButtonProps?.title ?? "Next";

  return (
    <Box mx={4} mb={4}>
      <Button
        px={6}
        py={4}
        variant={"solid"}
        backgroundColor="brand.600"
        _hover={{
          backgroundColor: "brand.500",
        }}
        width={"full"}
        boxShadow={`0 0 0 6px ${theme.colors.brand["800"]}`}
        onClick={() => {
          quiz.submitQuestion();
        }}
        {...props}
      >
        {title}
      </Button>
    </Box>
  );
}

export function SkipButton(props: ComponentProps<typeof Button>) {
  const quiz = useQuizActions();
  return (
    <Button
      px={6}
      variant={"link"}
      colorScheme="brand"
      width={"full"}
      onClick={() => {
        quiz.skipQuestion();
      }}
      {...props}
    >
      Skip this question
    </Button>
  );
}

export function MyFormLabel(props: ComponentProps<typeof FormLabel>) {
  return <FormLabel color="bg.800" fontWeight={"semibold"} {...props} />;
}

export function MySelect(props: ComponentProps<typeof Select>) {
  return <Select {...commonInputStyles()} {...props}></Select>;
}
