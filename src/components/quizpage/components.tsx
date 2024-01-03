import React, { ComponentProps, useEffect, useState } from "react";
import { Span as SpanRaw, Subtitle as SubtitleRaw } from "@martynasj/quiz-lib";

import { Text, Flex, Box, Button, useTheme } from "@chakra-ui/react";
import orbGif from "@images/gif-6.gif";
// import orbGif from "@images/orb_animated.gif";

export function NextButton(props: ComponentProps<typeof Button>) {
  const theme = useTheme();
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

export function ChatBubble(props: {
  text: string;
  instant?: boolean;
  onFinishedTyping?: () => void;
}) {
  const speed = 120;

  const [words, setWords] = useState<string[]>([]);
  const [nextWord, setNextWord] = useState("");

  useEffect(() => {
    if (props.instant) {
      setWords(props.text.split(" "));
      return;
    }

    const words = props.text.split(" ");

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
          props.onFinishedTyping?.();
        }, 300);
        clearInterval(it);
      }
    }, speed);

    return () => {
      setWords([]);
      setNextWord("");
      clearInterval(it);
    };
  }, [props.text, props.instant]);

  return (
    <Flex my={2} mb={16} flexDirection={"column"} alignItems={"center"} gap={3} color="white">
      <Flex
        borderRadius={"full"}
        overflow={"hidden"}
        height={"60px"}
        width={"60px"}
        boxShadow={"0 0 20px 0 black"}
      >
        <img src={orbGif} />
      </Flex>
      <Text
        fontWeight="bold"
        textAlign={"start"}
        width={"full"}
        fontSize={"xl"}
        p={2}
        borderRadius={"xl"}
        whiteSpace={"pre-wrap"}
      >
        {words.join(" ")}
        {words.length !== 0 && (
          <Text as="span" color="whiteAlpha.200">
            {" "}
            {nextWord}
          </Text>
        )}
      </Text>
    </Flex>
  );
}

export function Question(props: { text: string } & ComponentProps<typeof Text>) {
  return (
    <Text
      border="2px solid"
      borderColor={"bg.500"}
      color="white"
      fontSize={"sm"}
      backgroundColor={"bg.200"}
      p={2}
      px={4}
      borderRadius={"xl"}
      {...props}
    >
      {props.text}
    </Text>
  );
}
