import React from "react";
import { Box, Text, VStack, Stack, Flex } from "@chakra-ui/react";

import { GenericNatalChart } from "@components/svg/genericNatalChart";

export const BookCover = ({
  height = 400,
  author,
  birthDate,
}: {
  height?: number;
  author: string;
  birthDate?: string;
}) => {
  const width = height * 0.75;

  return (
    <Flex
      maxW="sm"
      borderRadius={height * 0.01}
      overflow="hidden"
      bg="#16111d"
      boxShadow={"6px 7px 9px 1px #0000004f"}
      position="relative"
      height={height}
      width={width}
      fontSize={`${height * 0.05}px`}
      color="whiteAlpha.800"
    >
      <Box height={"100%"} bg="whiteAlpha.400" width={"5%"}></Box>
      <Box height={"100%"} bg="whiteAlpha.200" width={"2%"}></Box>
      <VStack
        flex={1}
        bgGradient={"linear(to-r, whiteAlpha.400, whiteAlpha.100)"}
        p={5}
        align="center"
        justifyContent={"space-around"}
        height={"100%"}
      >
        <Box>
          <Text
            fontSize={"0.8em"}
            fontWeight={"bold"}
            lineHeight="tight"
            textAlign={"center"}
            noOfLines={1}
          >
            Self-Discovery Guide
          </Text>
          <Text
            fontSize={"0.8em"}
            lineHeight="tight"
            textAlign={"center"}
            noOfLines={1}
            color="whiteAlpha.600"
          >
            Through Astrology
          </Text>
        </Box>
        <GenericNatalChart boxSize={height * 0.4} />
        <Stack textAlign={"center"} spacing={"0.5em"}>
          <Text fontSize="0.9em" noOfLines={1}>
            {author}
          </Text>
          <Text fontSize="0.8em">{birthDate}</Text>
        </Stack>
      </VStack>
    </Flex>
  );
};
