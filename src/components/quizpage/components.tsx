import React, { ComponentProps } from "react";
import { Span as SpanRaw, useQuiz } from "@martynasj/quiz-lib";

import { Text, Button, useTheme } from "@chakra-ui/react";

export function NextButton(props: ComponentProps<typeof Button>) {
  const theme = useTheme();
  const { submitQuestion } = useQuiz();
  return (
    <Button
      px={8}
      py={6}
      variant={"solid"}
      colorScheme="brand"
      width={"full"}
      boxShadow={`inset 0 0 0 6px ${theme.colors.brand["400"]}, 0px 5px 30px 0px rgba(0,0,0,0.2)`}
      borderRadius={8}
      onClick={() => submitQuestion()}
      {...props}
    />
  );
}

export function Span(props: React.ComponentProps<typeof SpanRaw>) {
  return <SpanRaw {...props} />;
}

export function SlideHeading(props: { text?: React.ReactNode } & ComponentProps<typeof Text>) {
  return (
    <Text my={2} mb={8} color="text.main" fontSize={"xl"} {...props}>
      {props.text ?? props.children}
    </Text>
  );
}
