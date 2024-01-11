import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { PricingSection } from "@components/pricing";
import { TopNavigation } from "@components/topnavigation";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import { MediaCoverage } from "./summary";

export interface IPricingPageProps {}

export default function PricingPage() {
  return (
    <Box py={4} bg="bg.100" color="bg.900">
      <Container flexDirection={"column"} display={"flex"} gap={5}>
        <TopNavigation />

        <Flex
          width={"full"}
          position={"relative"}
          overflow={"hidden"}
          borderRadius={16}
          mb={4}
          zIndex={0}
          minH={350}
        >
          <Flex
            width={"100%"}
            position={"absolute"}
            zIndex={1}
            top={0}
            flexDirection={"column"}
            alignItems={"center"}
            gap={4}
          >
            <Heading fontSize={"3xl"} textAlign={"center"} maxW={400} mx="auto">
              Unlock Long-Awaited Answers To Your Burning Questions
            </Heading>

            <Flex
              my={4}
              mx="auto"
              borderRadius={"full"}
              overflow={"hidden"}
              height={"130px"}
              width={"130px"}
              boxShadow={"inset 0 0 50px 0 #d2890052, 0 0 50px 0 #d289006e"}
              opacity={0.8}
            >
              <StaticImage alt="" src="../images/astro-avatar.png" />
            </Flex>
          </Flex>

          <StaticImage alt="" src="../images/pricing-hero.png" layout="constrained" />
        </Flex>

        <Heading fontSize={"3xl"} textAlign={"center"}>
          Choose your plan
        </Heading>
        <Text textAlign={"center"}>To start using your astrologer right now</Text>

        <PricingSection />
        <TermsAgreement />
        <RiskFreeGuaranteed />
        <SafeCheckout />
        <MediaCoverage />
      </Container>
    </Box>
  );
}

function TermsAgreement() {
  return (
    <Flex flexDirection={"column"} alignItems={"flex-start"}>
      <Text color="bg.500" fontSize={"xs"}>
        By choosing a payment method, you agree to the Terms & Conditions and Privacy Policy
      </Text>
    </Flex>
  );
}

function RiskFreeGuaranteed() {
  return (
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      gap={3}
      mx="auto"
      px={3}
      py={2}
      borderRadius={8}
      border={"1px solid"}
      borderColor="bg.200"
      width={"full"}
      justifyContent={"center"}
    >
      <Flex height={"80px"} width={"80px"} flexShrink={0}>
        <StaticImage alt="Risk free guarantee" src="../images/risk-free-widget.png" />
      </Flex>

      <Flex flexDirection={"column"} alignItems={"flex-start"} maxWidth={300}>
        <Text fontSize={"xs"} color="green.400" fontWeight={"semibold"} lineHeight={"normal"}>
          Risk-Free Guarantee
        </Text>
        <Text color="bg.500" fontSize={"xs"}>
          No commitment, cancel anytime ✨
        </Text>
      </Flex>
    </Flex>
  );
}

function SafeCheckout() {
  return (
    <Flex
      px={3}
      py={2}
      borderRadius={8}
      border={"1px solid"}
      borderColor="bg.200"
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap={2}
    >
      <Text fontSize={"xs"} color="bg.500" fontWeight={"semibold"} lineHeight={"normal"}>
        Safe Checkout Guarantee
      </Text>
      <Flex width={"full"}>
        <StaticImage alt="Safe checkout" src="../images/safe-checkout.png" layout="constrained" />
      </Flex>
    </Flex>
  );
}
