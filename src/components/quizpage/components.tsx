import React, { ComponentProps, useEffect, useState } from "react";
import {
  Span as SpanRaw,
  Subtitle as SubtitleRaw,
  useQuiz,
  useQuizState,
} from "@martynasj/quiz-lib";

import { Text, Flex, Box, Button, useTheme } from "@chakra-ui/react";
import { getPersonalInfoFromState } from "@utils/state";
import { Orb2 } from "@components/Orb";

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
    <Text my={2} mb={8} color="white" {...props} fontSize={"xl"}>
      {props.text ?? props.children}
    </Text>
  );
}

type ChatMessageProps = {
  avatarName: string;
  avatarIcon: string;
  messageText: string;
  bubleProps?: ComponentProps<typeof Box>;
  onFinishedTyping?: () => void;
};

export function ChatMessage({
  avatarIcon,
  avatarName,
  messageText,
  onFinishedTyping,
  bubleProps,
  ...rest
}: ChatMessageProps & ComponentProps<typeof Box>) {
  const { quizState } = useQuizState();
  const { astrologer } = getPersonalInfoFromState(quizState);

  return (
    <Flex direction={"column"} alignItems={"stretch"} my={12} {...rest}>
      <Flex mb={2} mx={"auto"} alignItems={"center"}>
        <Orb2 enableAnimation size={64} p={2} colorTheme="#b2f5ea">
          {astrologer.image}
        </Orb2>
      </Flex>

      <Box
        p={3}
        px={4}
        borderRadius={"lg"}
        bgGradient={"linear(to-b, teal.200, teal.100)"}
        color="black"
        position={"relative"}
        mt={4}
        _before={{
          content: `""`,
          position: "absolute",
          top: "-9px",
          left: "50%",
          width: "0",
          height: "0",
          borderLeft: "30px solid transparent",
          borderRight: "30px solid transparent",
          borderBottom: "10px solid",
          borderBottomColor: "teal.200",
          marginLeft: "-30px",
        }}
        {...bubleProps}
      >
        <TypewriterText
          fontWeight={"medium"}
          fontSize={"md"}
          text={messageText ?? "Typing..."}
          onFinishedTyping={() => {
            if (messageText) {
              onFinishedTyping?.();
            }
          }}
        />
      </Box>
    </Flex>
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
      setWords(text.split(" "));
      return () => {
        setWords([]);
        setNextWord("");
      };
    }

    const words = text.split(" ");

    let idx = 0;
    const it = setInterval(() => {
      const nextLetter = words[idx];

      setNextWord(nextLetter);
      setTimeout(() => {
        setWords((w) => [...w, nextLetter]);
        setNextWord("");
      }, speed / 2);

      idx++;
      if (idx === words.length) {
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

  return (
    <Text
      fontWeight="semibold"
      textAlign={"start"}
      width={"full"}
      fontSize={"xl"}
      whiteSpace={"pre-wrap"}
      {...rest}
    >
      {words.join(" ")}
      {words.length !== 0 && (
        <Text as="span" color="whiteAlpha.200">
          {" "}
          {nextWord}
        </Text>
      )}
    </Text>
  );
}
