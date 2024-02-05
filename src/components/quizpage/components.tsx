import React, { ComponentProps, useEffect, useState } from "react";
import {
  Span as SpanRaw,
  Subtitle as SubtitleRaw,
  useQuiz,
  useQuizState,
} from "@martynasj/quiz-lib";

import { Text, Flex, Box, Button, useTheme } from "@chakra-ui/react";
import { getPersonalInfoFromState } from "@utils/state";

export function NextButton(props: ComponentProps<typeof Button>) {
  const theme = useTheme();
  const { submitQuestion } = useQuiz();
  return (
    <Box mx={4} my={4}>
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
        onClick={() => submitQuestion()}
        {...props}
      />
    </Box>
  );
}

export function SpanJust(props: ComponentProps<typeof Text>) {
  return <Text as="span" {...props} />;
}

export function Span(props: React.ComponentProps<typeof SpanRaw>) {
  return <SpanRaw color="orange.400" fontWeight={"semibold"} {...props} />;
}

export function Subtitle(props: React.ComponentProps<typeof Text>) {
  return <Text color="bg.800" fontSize={"lg"} fontWeight={"semibold"} mb={8} {...props} />;
}

export function ImageWithCaptionWrapper(props: React.ComponentProps<typeof Flex>) {
  return <Flex flexDirection={"column"} mb={12} gap={2} {...props} />;
}

export function Caption(props: React.ComponentProps<typeof Text>) {
  return <Text fontSize={"sm"} color="bg.600" {...props} />;
}

export function CustomerMessage(props: { text: string } & ComponentProps<typeof Text>) {
  return (
    <Text mb={8} fontSize={"lg"} fontWeight={"semibold"} color="bg.900" {...props}>
      "{props.text}"
    </Text>
  );
}

export function SlideHeading(props: { text?: React.ReactNode } & ComponentProps<typeof Text>) {
  return (
    <Text my={2} mb={8} {...props} fontSize={"xl"}>
      {props.text ?? props.children}
    </Text>
  );
}

type ChatMessageProps = {
  messageText: string;
  onFinishedTyping?: () => void;
};

export function ChatMessage({
  messageText,
  onFinishedTyping,
  ...rest
}: ChatMessageProps & ComponentProps<typeof Box>) {
  const { quizState } = useQuizState();

  return (
    <TypewriterText
      color="white"
      fontWeight={"medium"}
      fontSize={"md"}
      text={messageText ?? "Typing..."}
      instant
      onFinishedTyping={() => {
        if (messageText) {
          onFinishedTyping?.();
        }
      }}
      {...rest}
    />
  );
}

export type TypewriterTextProps = {
  text: string;
  instant?: boolean;
  onFinishedTyping?: () => void;
} & ComponentProps<typeof Text>;

export function TypewriterText(props: TypewriterTextProps) {
  const { text, instant, onFinishedTyping, ...rest } = props;

  const speed = 80;

  const [words, setWords] = useState<string[]>([]);
  const [nextWord, setNextWord] = useState("");

  useEffect(() => {
    if (instant) {
      const nextWords = text.length === 0 ? [] : text.split(" ");
      setWords(nextWords);

      return () => {
        setWords([]);
        setNextWord("");
      };
    }

    const nextWords = text.split(" ");

    let idx = 0;
    const it = setInterval(() => {
      const nextLetter = nextWords[idx];

      setNextWord(nextLetter);
      setTimeout(() => {
        setWords((w) => [...w, nextLetter]);
        setNextWord("");
      }, speed / 2);

      idx++;
      if (idx === nextWords.length) {
        setTimeout(() => {
          onFinishedTyping?.();
        }, 300);
        clearInterval(it);
      }
    }, speed);

    return () => {
      setWords([]);
      setNextWord("");
      clearInterval(it);
    };
  }, [text, instant]);

  if (words.length === 0) {
    return null;
  }

  return (
    <Text
      fontWeight="semibold"
      textAlign={"start"}
      width={"full"}
      fontSize={"xl"}
      whiteSpace={"pre-wrap"}
      {...rest}
    >
      "{words.join(" ")}
      {words.length !== 0 && (
        <Text as="span" color="whiteAlpha.200">
          {" "}
          {nextWord}
        </Text>
      )}
      "
    </Text>
  );
}
