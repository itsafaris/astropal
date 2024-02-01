import React, { ComponentProps, useEffect, useState } from "react";
import { Span as SpanRaw, Subtitle as SubtitleRaw } from "@martynasj/quiz-lib";

import { Text, Flex, Box, Button, useTheme } from "@chakra-ui/react";

export function NextButton(props: ComponentProps<typeof Button>) {
  const theme = useTheme();
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

export function Subtitle(props: React.ComponentProps<typeof SubtitleRaw>) {
  return <SubtitleRaw {...props} />;
}

export function ImageWithCaptionWrapper(props: React.ComponentProps<typeof Flex>) {
  return <Flex flexDirection={"column"} mb={12} gap={2} {...props} />;
}

export function Caption(props: React.ComponentProps<typeof Text>) {
  return <Text fontSize={"sm"} color="bg.600" {...props} />;
}

export function CustomerMessage(props: { text: string } & ComponentProps<typeof Text>) {
  return (
    <Text fontSize={"lg"} fontWeight={"semibold"} color="bg.900" {...props}>
      "{props.text}"
    </Text>
  );
}

export function SlideHeading(props: { text: React.ReactNode } & ComponentProps<typeof Text>) {
  return (
    <Text my={2} mb={8} color="white" {...props} fontSize={"xl"}>
      {props.text}
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
  return (
    <Flex direction={"column"} alignItems={"stretch"} {...rest}>
      <Flex mb={3} alignItems={"center"}>
        <Flex
          width={"30px"}
          height={"30px"}
          bg="white"
          mr={2}
          borderRadius={"full"}
          border="2px solid"
          borderColor={"orange.400"}
          alignItems={"center"}
          justifyContent={"center"}
          fontSize={"xl"}
        >
          {avatarIcon}
        </Flex>
        <Text color="white" fontWeight={"semibold"}>
          {avatarName}
        </Text>
      </Flex>

      <Box
        p={3}
        px={4}
        borderRadius={"lg"}
        background={"teal.100"}
        border="1px solid"
        borderColor={"blue.600"}
        color="black"
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
