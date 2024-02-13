import { Text, Stack, Flex } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { BoltIcon, InfinityIcon, MoonIcon } from "@components/svg/icons";
import { QuizStateParsed } from "@utils/state";

export function ProductSection({ state }: { state: QuizStateParsed }) {
  return (
    <Stack spacing={7} id="product-section" maxW={"350px"} width={"90%"} mx="auto">
      <Text
        fontWeight="semibold"
        textAlign={"center"}
        width={"full"}
        fontSize={"2xl"}
        color="white"
        px={6}
      >
        Receive Daily Guidance. Ask Unlimited Questions
      </Text>

      <StaticImage
        alt=""
        src="../../images/art-4.png"
        style={{ width: 90, opacity: 1, marginLeft: "auto", marginRight: "auto" }}
      />

      <Flex flexDirection={"column"} alignItems={"center"} gap={4}>
        <StaticImage alt="" src="../../images/product/get.png" style={{ borderRadius: "10px" }} />

        <Flex flexDirection={"row"} alignItems={"center"} gap={3} px={5}>
          <InfinityIcon color="brand.500" height={"24px"} width={"24px"} />

          <Text color="bg.800" fontSize={"lg"} width={"100%"} textAlign={"center"}>
            Decide when and what insights you want to get
          </Text>

          <InfinityIcon color="brand.500" height={"24px"} width={"24px"} />
        </Flex>
      </Flex>

      <Flex flexDirection={"column"} alignItems={"center"} gap={4}>
        <StaticImage alt="" src="../../images/product/ask.png" style={{ borderRadius: "10px" }} />

        <Flex flexDirection={"row"} alignItems={"center"} gap={3} px={5}>
          <BoltIcon color="brand.500" height={"24px"} width={"24px"} />

          <Text color="bg.800" fontSize={"lg"} width={"100%"} textAlign={"center"}>
            When in doubt, ask questions and receive immediate answers
          </Text>

          <BoltIcon color="brand.500" height={"24px"} width={"24px"} />
        </Flex>
      </Flex>

      <Flex flexDirection={"column"} alignItems={"center"} gap={4}>
        <StaticImage alt="" src="../../images/product/read.png" style={{ borderRadius: "10px" }} />

        <Flex flexDirection={"row"} alignItems={"center"} gap={3} px={5}>
          <MoonIcon color="brand.500" height={"24px"} width={"24px"} />

          <Text color="bg.800" fontSize={"lg"} width={"100%"} textAlign={"center"}>
            Listen to insights wherever you are
          </Text>

          <MoonIcon color="brand.500" height={"24px"} width={"24px"} />
        </Flex>
      </Flex>
    </Stack>
  );
}
