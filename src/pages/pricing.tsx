import { Box, Heading } from "@chakra-ui/react";
import { PricingSection } from "@components/pricing";
import * as React from "react";

export interface IPricingPageProps {}

export default function PricingPage(props: IPricingPageProps) {
  return (
    <Box bg="bg.100" color="bg.900" minHeight={"100vh"} py={12} px={4}>
      <Heading textAlign={"center"} mb={8}>
        Choose your plan
      </Heading>
      <PricingSection />
    </Box>
  );
}
