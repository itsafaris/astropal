import React from "react";
import { Span as SpanRaw, Subtitle as SubtitleRaw } from "@martynasj/quiz-lib";

import { Text, Flex } from "@chakra-ui/react";

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
