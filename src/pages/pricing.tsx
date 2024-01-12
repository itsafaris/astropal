import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { PricingSection } from "@components/pricing";

import { SpecialOfferBanner } from "@components/specialOfferBanner";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import { MediaCoverage } from "./summary";

export interface IPricingPageProps {}

export default function PricingPage() {
  return (
    <Box pb={4} bg="bg.100" color="bg.900">
      <SpecialOfferBanner />
      <Container pt={6} flexDirection={"column"} display={"flex"} gap={5}>
        <Heading fontSize={"3xl"} textAlign={"center"} maxW={400} mx="auto">
          Unlock Long-Awaited Answers To Your Burning Questions
        </Heading>

        <Box
          height={[180, 300]}
          width={"full"}
          mx={"auto"}
          borderRadius={10}
          overflow={"hidden"}
          position={"relative"}
        >
          <StaticImage
            src="../images/calm-woman-2.png"
            alt=""
            style={{ position: "relative", top: "-20%" }}
          />
          <Box
            height={100}
            width={"full"}
            position={"absolute"}
            top={0}
            left={0}
            bgGradient="linear(to-b, bg.100, blackAlpha.100)"
          />
        </Box>

        <Stack>
          <Heading fontSize={"3xl"} textAlign={"center"}>
            Choose your plan
          </Heading>
          <Text textAlign={"center"}>To start using your astrologer right now</Text>
        </Stack>

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
