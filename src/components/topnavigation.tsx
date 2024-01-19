import { Flex, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

export function TopNavigation() {
  return (
    <Flex flexDirection={"row"} alignItems={"center"} gap={3} py={6}>
      <StaticImage src={`../images/favicon.png`} alt="Astropal logo" height={35} />
      <Text fontSize={"md"} fontWeight={"semibold"}>
        Astropal
      </Text>
    </Flex>
  );
}
