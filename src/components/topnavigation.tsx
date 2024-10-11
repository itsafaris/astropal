import { Flex, Stack } from "@chakra-ui/react";
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
          {theme === "light" ? (
            <StaticImage
              src={`../images/intuvist-logo-white-h.png`}
              alt="Intuvist logo"
              height={35}
            />
          ) : (
            <StaticImage
              src={`../images/intuvist-logo-black-h.png`}
              alt="Intuvist logo"
              height={35}
            />
          )}
        </Stack>
      </Link>
    </Flex>
  );
}
