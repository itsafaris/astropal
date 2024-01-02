import React from "react";
import { Span as SpanRaw, Subtitle as SubtitleRaw } from "@martynasj/quiz-lib";

import { Text, Flex, Box } from "@chakra-ui/react";

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

export function ChatBubble(props: { text: string }) {
  return (
    <Flex my={2} mb={4} flexDirection={"column"} alignItems={"center"} gap={3} color="white">
      <Flex>
        <Box width={10} height={10} borderRadius={"full"} backgroundColor={"white"}></Box>
      </Flex>
      <Text
        fontWeight="bold"
        textAlign={"center"}
        backgroundColor={"black"}
        p={2}
        borderRadius={"xl"}
        whiteSpace={"pre-wrap"}
      >
        {props.text}
      </Text>
    </Flex>
  );
}

export function Question(props: { text: string }) {
  return (
    <Text
      border="1px solid"
      borderColor={"bg.500"}
      color="white"
      fontSize={"sm"}
      backgroundColor={"bg.200"}
      p={2}
      borderRadius={"xl"}
    >
      {props.text}
    </Text>
  );
}
