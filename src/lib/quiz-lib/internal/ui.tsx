import { Button } from "@chakra-ui/react";
import { ComponentProps } from "react";
import { useQuizActions } from "./state";

export function NextButton(props: ComponentProps<typeof Button>) {
  const quiz = useQuizActions();
  return (
    <Button
      px={6}
      variant={"solid"}
      colorScheme="brand"
      width={"full"}
      onClick={() => {
        quiz.submitQuestion();
      }}
      {...props}
    >
      Next
    </Button>
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
