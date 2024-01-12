import { Text, Stack, Flex } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

export function MediaCoverageSection() {
  return (
    <Stack id="media-coverage" gap={7} alignItems={"center"} my={10}>
      <Text fontSize={"md"} color="bg.900" fontWeight={"semibold"}>
        Technology used is featured in:
      </Text>

      <Flex width={"100px"} opacity={1}>
        <StaticImage alt="The guardian" src="../../images/media-guardian.svg" />
      </Flex>

      <Flex flexDirection={"row"} alignItems={"center"} gap={6}>
        <Flex width={"120px"} opacity={1}>
          <StaticImage alt="Cosmopolitan" src="../../images/media-cosmopolitan.svg" />
        </Flex>

        <Flex width={"90px"} opacity={1}>
          <StaticImage alt="Vogue" src="../../images/media-vogue.svg" />
        </Flex>
      </Flex>

      <Flex width={"200px"} opacity={1}>
        <StaticImage alt="New york times" src="../../images/media-nyt.svg" />
      </Flex>
    </Stack>
  );
}
