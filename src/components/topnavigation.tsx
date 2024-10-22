import { Flex, Stack } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import { ComponentProps } from "react";

export function TopNavigation({
  theme = "light",
  ...rest
}: { theme?: "light" | "dark" } & ComponentProps<typeof Flex>) {
  return (
    <Flex
      color={theme === "light" ? "black" : "white"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      borderBottom={"1px solid"}
      borderColor={theme === "light" ? "blackAlpha.200" : "whiteAlpha.300"}
      gap={3}
      py={3}
      {...rest}
    >
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        {theme === "light" ? (
          <StaticImage
            src={`../images/intuvist-logo-black-h.png`}
            alt="Intuvist logo"
            height={35}
          />
        ) : (
          <StaticImage
            src={`../images/intuvist-logo-white-h.png`}
            alt="Intuvist logo"
            height={35}
          />
        )}
      </Stack>
    </Flex>
  );
}
