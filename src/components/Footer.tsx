import { Stack, Text } from "@chakra-ui/react";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";
import { APP_DATA } from "src/data";

export function Footer() {
  const meta = useSiteMetadata();

  return (
    <Stack py={5} spacing={1} alignItems={"center"} color={"whiteAlpha.600"}>
      <Text fontSize={"sm"}>©2024 {meta.brandName}. All rights reserved.</Text>

      <Stack
        direction={["column", "row"]}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={[1, 3]}
      >
        <Link to={`${meta.siteUrl}/terms-and-conditions`}>
          <Text cursor={"pointer"} as="span" fontSize={"sm"}>
            Terms & Conditions
          </Text>
        </Link>

        <Link to={`${APP_DATA.website.url}/privacy-policy`}>
          <Text cursor={"pointer"} as="span" fontSize={"sm"}>
            Privacy Policy
          </Text>
        </Link>

        <Link to={`${APP_DATA.website.url}/contact-us`}>
          <Text cursor={"pointer"} as="span" fontSize={"sm"}>
            Contact us
          </Text>
        </Link>
      </Stack>
    </Stack>
  );
}
