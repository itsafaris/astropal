import React, { ComponentProps, useEffect, useState } from "react";
import { Span as SpanRaw, Subtitle as SubtitleRaw } from "@martynasj/quiz-lib";

import { Text, Flex, Box, Button, useTheme, Stack } from "@chakra-ui/react";
import { Orb } from "@components/Orb";

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

export function Span(props: React.ComponentProps<typeof SpanRaw>) {
  return <SpanRaw color="brand.500" fontWeight={"semibold"} {...props} />;
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

export function ChatBubble(props: {} & TypewriterTextProps) {
  return (
    <Flex my={2} mb={8} flexDirection={"column"} alignItems={"center"} gap={4}>
      <Orb />

      <TypewriterText {...props} />
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

  const speed = 60;

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
      color="white"
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

export function Question({
  text,
  questionTheme,
  themecolor,
  ...rest
}: { text: string; questionTheme: string; themecolor: string } & ComponentProps<typeof Text>) {
  return (
    <Stack spacing={1}>
      <Text fontSize={"xs"} color={`${themecolor}.500`}>
        {questionTheme}
      </Text>
      <Text
        as={Button}
        border="2px solid"
        borderColor={"bg.500"}
        color="white"
        fontSize={"sm"}
        backgroundColor={"bg.200"}
        _hover={{
          bg: "bg.300",
        }}
        p={2}
        px={4}
        borderRadius={"xl"}
        cursor={"pointer"}
        {...rest}
      >
        {text}
      </Text>
    </Stack>
  );
}
