import { Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ComponentProps } from "react";

export function TopNavigation({
  theme = "light",
  ...rest
}: { theme?: "light" | "dark" } & ComponentProps<typeof Flex>) {
  return (
    <Flex
      color={theme === "light" ? "white" : "black"}
      flexDirection={"row"}
      alignItems={"center"}
      gap={3}
      py={6}
      {...rest}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <StaticImage src={`../images/favicon.png`} alt="Intuvist logo" height={35} />

          <Text fontSize={"md"} fontWeight={"semibold"}>
            Intuvist
          </Text>
        </Stack>
      </Link>
    </Flex>
  );
}
