import { Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ComponentProps } from "react";

export function TopNavigation(props: ComponentProps<typeof Flex>) {
  return (
    <Flex flexDirection={"row"} alignItems={"center"} gap={3} py={6} {...props}>
      <Link to="/">
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <StaticImage
            src={`../images/favicon.png`}
            alt="Astropal logo"
            height={35}
          />

          <Text fontSize={"md"} fontWeight={"semibold"}>
            Astropal
          </Text>
        </Stack>
      </Link>
    </Flex>
  );
}
