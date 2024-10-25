import React from "react";
import { Box, Container, Flex, Grid, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { Header } from "@components/businessPage/Header";
import { Footer } from "@components/businessPage/Footer";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { AppShowcase } from "@components/businessPage/AppShowcase";
import { StaticImage } from "gatsby-plugin-image";

export default function PricingPage() {
  return (
    <Container maxW={"container.xl"}>
      <VStack spacing={[8, 12, 16]}>
        <Header />
        <HeroSection />
        <PricingTable />
        <AppShowcase />
        <Footer />
      </VStack>
    </Container>
  );
}

const HeroSection: React.FC = () => {
  return (
    <Stack align="center" mb={10}>
      <Flex direction={["column", "row"]} alignItems={"center"} gap={3}>
        <Stack flex={1} pr={{ base: 0, md: 8 }} alignItems={"flex-start"}>
          <Heading as="h2" size="xl" textAlign="center" mb={6}>
            Pricing options for all
          </Heading>

          <Text fontSize="lg" mb={4}>
            Financial constraints shouldn't hinder your access to effective astrological insights.
            Select a plan that aligns with your expectations and give us a chance.
          </Text>
        </Stack>

        <Box flex={1} borderRadius={"xl"} overflow={"hidden"}>
          <StaticImage src="../images/lp-pricing-image.jpg" alt="Astrological shopping" />
        </Box>
      </Flex>
    </Stack>
  );
};

const PricingTable: React.FC = () => {
  const meta = useSiteMetadata();

  return (
    <Box mb={10} width={"full"}>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        {meta.brandName} Pricing Tiers
      </Heading>

      <Grid
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr 1fr"]}
        gridTemplateRows={["1fr 1fr 1fr", "1fr 1fr 1fr", "1fr"]}
        gap={3}
        width={"full"}
      >
        <PricingCard
          title={`${meta.brandName} Free`}
          price="($0.00)"
          features={[
            {
              title: "Daily Celestial Forecast:",
              text: "Basic Information Only",
            },
            {
              title: "Comprehensive Romance & Companionship Analysis:",
              text: "Basic Information Only",
            },
            {
              title: "Personal Astrological Profile Interpretation:",
              text: "Basic Information Only",
            },
            {
              title: "Unlimited Consultation with Personal Astrologer:",
              text: "✗",
            },
          ]}
        />

        <PricingCard
          title={`${meta.brandName} Premium Weekly`}
          price="($19.99/week)"
          features={[
            {
              title: "Daily Celestial Forecast:",
              text: "✓",
            },
            {
              title: "Comprehensive Romance & Companionship Analysis:",
              text: "✓",
            },
            {
              title: "Personal Astrological Profile Interpretation:",
              text: "✓",
            },
            {
              title: "Unlimited Consultation with Personal Astrologer:",
              text: "✓",
            },
          ]}
        />

        <PricingCard
          title={`${meta.brandName} Premium Monthly`}
          price="($49.99/month)"
          features={[
            {
              title: "Daily Celestial Forecast:",
              text: "✓",
            },
            {
              title: "Comprehensive Romance & Companionship Analysis:",
              text: "✓",
            },
            {
              title: "Personal Astrological Profile Interpretation:",
              text: "✓",
            },
            {
              title: "Unlimited Consultation with Personal Astrologer:",
              text: "✓",
            },
          ]}
        />
      </Grid>
    </Box>
  );
};

function PricingCard({
  title,
  features,
  price,
}: {
  title: string;
  features: Array<{ title: string; text: string }>;
  price: string;
}) {
  return (
    <Stack
      width={"full"}
      bgGradient={"linear(to-b, teal.200, teal.100)"}
      borderRadius={"xl"}
      p={3}
      justifyContent={"space-between"}
      spacing={3}
    >
      <Stack spacing={2} alignItems={"center"}>
        <Text
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"bold"}
          maxW={"200px"}
          color="teal.700"
        >
          {title}
        </Text>

        <Text color="black" textAlign={"center"} fontSize={"lg"} fontWeight={"bold"} maxW={"200px"}>
          {price}
        </Text>
      </Stack>

      <Stack spacing={0}>
        {features.map((it, idx) => {
          return (
            <Stack
              key={idx}
              textAlign={"center"}
              fontSize={"sm"}
              spacing={0}
              borderTop={"1px solid"}
              borderColor={"whiteAlpha.800"}
              py={2}
            >
              <Text fontSize={"xs"}>{it.title}</Text>
              <Text fontWeight="semibold">{it.text}</Text>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
