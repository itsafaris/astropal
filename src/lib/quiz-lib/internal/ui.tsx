import { Button, Box, useTheme } from "@chakra-ui/react";
import { ComponentProps } from "react";
import { useQuizActions } from "./state";

export function NextButton(props: ComponentProps<typeof Button>) {
  const quiz = useQuizActions();
  const theme = useTheme();

  return (
    <Box px={8}>
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
        Next
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
