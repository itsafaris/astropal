import { Flex, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import { ComponentProps } from "react";

export function TopNavigation(props: ComponentProps<typeof Flex>) {
  return (
    <Flex flexDirection={"row"} alignItems={"center"} gap={3} py={6} px={6} {...props}>
      <StaticImage src={`../images/favicon.png`} alt="Astropal logo" height={35} />
      <Text fontSize={"md"} fontWeight={"semibold"}>
        Astropal
      </Text>
    </Flex>
  );
}
