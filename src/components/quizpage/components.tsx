import React, { ComponentProps, useEffect, useState } from "react";
import { Span as SpanRaw, Subtitle as SubtitleRaw } from "@martynasj/quiz-lib";

import { Text, Flex, Box, Button, useTheme } from "@chakra-ui/react";
import orbGif from "@images/orb_animated.gif";

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
  const [visibleText, setVisibleText] = useState(props.instant ? props.text : "");

  useEffect(() => {
    if (props.instant) {
      setVisibleText(props.text);
      return;
    }

    const letters = props.text.split("");

    let idx = 0;
    const it = setInterval(() => {
      const nextLetter = letters[idx];
      setVisibleText((t) => {
        return t + nextLetter;
      });

      idx++;
      if (idx === letters.length) {
        setTimeout(() => {
          props.onFinishedTyping?.();
        }, 300);
        clearInterval(it);
      }
    }, 30);

    return () => {
      setVisibleText("");
      clearInterval(it);
    };
  }, [props.text, props.instant]);

  return (
    <Flex my={2} mb={16} flexDirection={"column"} alignItems={"center"} gap={3} color="white">
      <Flex>
        <img height={50} width={50} src={orbGif} />
      </Flex>
      <Text
        fontWeight="bold"
        textAlign={"center"}
        fontSize={"xl"}
        p={2}
        borderRadius={"xl"}
        whiteSpace={"pre-wrap"}
      >
        {visibleText}
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
