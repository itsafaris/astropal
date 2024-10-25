import React from "react";
import { Button, VStack, Heading } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

export function AppShowcase() {
  return (
    <VStack spacing={6} width="100%">
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Begin your astrological journey now!
      </Heading>

      <StaticImage src={`../../images/lp-product-image.jpg`} alt="Intuvist webapp" width={400} />

      <Button mt={6} colorScheme="teal" size="lg">
        Access Your Account
      </Button>
    </VStack>
  );
}
