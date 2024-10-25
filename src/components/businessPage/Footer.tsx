import React from "react";
import { HStack, VStack, Text, Flex, Box } from "@chakra-ui/react";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

export function Footer() {
  const meta = useSiteMetadata();

  return (
    <Box as="footer" width="100%" py={8}>
      <Flex
        direction={["column", "column", "row"]}
        justifyContent="space-between"
        alignItems="center"
        gap={3}
      >
        <VStack alignItems={["center", "center", "flex-start"]} mb={[4, 0]}>
          <StaticImage
            src={`../../images/intuvist-logo-black-h.png`}
            alt="Intuvist logo"
            height={35}
          />
          <Text fontSize={"sm"} color="gray.500">
            ©2024 {meta.brandName}. All rights reserved.
          </Text>
          <Text fontSize="sm" color="gray.500">
            Crafted with passion.
          </Text>
        </VStack>

        <HStack spacing={4}>
          <Link to={`/terms-and-conditions`}>
            <Text cursor={"pointer"} as="span" fontSize={"sm"}>
              Terms & Conditions
            </Text>
          </Link>

          <Link to={`/privacy-policy`}>
            <Text cursor={"pointer"} as="span" fontSize={"sm"}>
              Privacy Policy
            </Text>
          </Link>

          <Link to={`/contact-us`}>
            <Text cursor={"pointer"} as="span" fontSize={"sm"}>
              Contact us
            </Text>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
