import { Text, Stack, Flex } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

export function MediaCoverageSection() {
  return (
    <Stack id="media-coverage" gap={6} alignItems={"center"} my={10}>
      <Text fontSize={"md"} color="bg.500" fontWeight={"semibold"}>
        Technology used is featured in:
      </Text>

      <Flex width={"200px"} opacity={0.8}>
        <StaticImage alt="New york times" src="../../images/media-nyt.svg" />
      </Flex>

      <Flex width={"120px"} opacity={0.8}>
        <StaticImage alt="Cosmopolitan" src="../../images/media-cosmopolitan.svg" />
      </Flex>

      <Flex width={"90px"} opacity={0.8}>
        <StaticImage alt="Vogue" src="../../images/media-vogue.svg" />
      </Flex>

      <Flex width={"100px"} opacity={0.8}>
        <StaticImage alt="The guardian" src="../../images/media-guardian.svg" />
      </Flex>
    </Stack>
  );
}
