import { Box, Text, VStack, Flex } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { ComponentProps } from "react";

export const BookCover = ({
  height = 400,
  author,
  gender = "male",
  ...rest
}: {
  height?: number;
  author: string;
  gender?: "male" | "female";
} & ComponentProps<typeof Flex>) => {
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
      {...rest}
    >
      {gender === "male" ? (
        <StaticImage
          alt="book cover of a personalised astrology guide, birth chart book"
          style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0 }}
          src="../../images/book_cover_male.png"
        />
      ) : (
        <StaticImage
          alt="book cover of a personalised astrology guide, birth chart book"
          style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0 }}
          src="../../images/book_cover_female.png"
        />
      )}
      <Flex position={"absolute"} left={0} top={0} height={"100%"} width={"100%"}>
        <Box
          height={"100%"}
          bgGradient="linear(to-r,whiteAlpha.400, whiteAlpha.200)"
          width={"4%"}
        ></Box>
        <Box height={"100%"} bg="blackAlpha.300" width={"2%"}></Box>
      </Flex>

      <Flex position={"absolute"} left={0} top={0} pt="40%" height={"100%"} width={"50%"}>
        <VStack flex={1} pl={"0.8em"} align="start" height={"100%"} width={"40%"}>
          <Box>
            <Text fontSize={"1.6em"} fontWeight={"black"} lineHeight={"0.9"} textAlign={"left"}>
              The
              <br /> Guide
            </Text>
            <Text
              fontSize={"1em"}
              fontWeight={"semibold"}
              lineHeight={"1.5"}
              textAlign={"left"}
              color="red.400"
            >
              Of
            </Text>
            <Text
              fontSize="0.8em"
              noOfLines={5}
              lineHeight={"1.2"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
            >
              {author}
            </Text>
          </Box>
        </VStack>
      </Flex>
    </Flex>
  );
};
