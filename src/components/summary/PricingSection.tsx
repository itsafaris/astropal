import { Box, Flex, Heading, Stack, Text, Button, TextProps, Card } from "@chakra-ui/react";
import { Link } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";
import { pricingPlans, PricingPlanType } from "@utils/pricingPlans";
import { trackEvent } from "@utils/tracking";
import { ComponentProps, useState } from "react";
import { Span } from "@components/quizpage/components";
import { BookCover } from "@components/book/bookCover";

export interface IPricingPageProps {}

export function PricingSection() {
  return (
    <Box id="pricing-section" as="section" py={8}>
      <Stack spacing={4}>
        <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
          Your Self-Discovery Guide is Ready!
        </Text>

        <BookCover
          title="Self-Discovery Bible"
          author={"John Doe"}
          subtitle={"based on Astrology"}
        />

        <Stack fontWeight={"semibold"} pl={4} fontSize={"sm"}>
          <Text>✅ 92 pages of in-depth birth chart analysis</Text>
          <Text>✅ Step by step guide to realise your full potential</Text>
          <Text>✅ Ideal partner selection</Text>
          <Text>✅ Guide to a Perfect Relationship</Text>
          <Text>✅ Career Guidance</Text>
          <Text>✅ Self-Growth Discipline</Text>
          <Text>✅ Future Life Path Guidance</Text>
        </Stack>

        {/* <Flex justifyContent={"start"} gap={4}>
          <Card p={4} textAlign={"center"}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              92
            </Text>
            <Text>Pages</Text>
          </Card>
          <Card p={4} textAlign={"center"}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              6
            </Text>
            <Text>Themes Covered</Text>
          </Card>
        </Flex> */}

        <PricingPlans />
        <Button colorScheme="orange" width={"full"}>
          Get My Guide
        </Button>
        <TermsAgreement />
        {/* <RiskFreeGuaranteed /> */}
        {/* <SafeCheckout /> */}
      </Stack>
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
        <StaticImage alt="Risk free guarantee" src="../../images/risk-free-widget.png" />
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
        <StaticImage
          alt="Safe checkout"
          src="../../images/safe-checkout.png"
          layout="constrained"
        />
      </Flex>
    </Flex>
  );
}

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string>(pricingPlans.digital.id);
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      {Object.values(pricingPlans).map((plan) => {
        return (
          <PricingPlanItem
            key={plan.id}
            billingText={plan.subtitle}
            pricingPlan={plan}
            borderColor={selectedPlan === plan.id ? "orange.600" : undefined}
            onClick={() => {
              setSelectedPlan(plan.id);
            }}
          />
        );
      })}
    </Flex>
  );
}

function PricingPlanItem({
  billingText,
  tagText,
  borderColor,
  pricingPlan,
  ...rest
}: {
  billingText: string;
  tagText?: string;
  tagColor?: string;
  borderColor?: string;
  pricingPlan: PricingPlanType;
} & ComponentProps<typeof Flex>) {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      p={3}
      borderRadius={10}
      backgroundColor="bg.200"
      width={"100%"}
      position="relative"
      border={`3px solid`}
      borderColor={borderColor ?? "transparent"}
      mt={3}
      {...rest}
    >
      {tagText && (
        <Badge position={"absolute"} top={0} left={3} transform={"translateY(-50%)"}>
          {tagText}
        </Badge>
      )}

      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        gap={3}
      >
        <Flex flexDirection={"column"} alignItems={"flex-start"} gap={1}>
          <Text fontSize={"xl"} fontWeight={"bold"} color="bg.900" lineHeight={"normal"}>
            {pricingPlan.title}
          </Text>

          <Text fontSize={"small"} color="bg.600" lineHeight={"normal"}>
            {billingText}
          </Text>
        </Flex>

        <Flex flexDirection={"column"} alignItems={"flex-end"}>
          <Text
            color="bg.900"
            textDecoration={"line-through"}
            lineHeight={"normal"}
            fontSize={"md"}
          >
            ${pricingPlan.priceBefore}
          </Text>

          <Text fontSize={"3xl"} fontWeight={"bold"} lineHeight={"normal"} color="bg.900">
            ${pricingPlan.price}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Badge({ ...rest }: TextProps) {
  return (
    <Text
      py={"2px"}
      px={"10px"}
      backgroundColor="pink.100"
      color="pink.800"
      fontWeight={"bold"}
      fontSize={"small"}
      borderRadius={"5px"}
      {...rest}
    >
      Best value
    </Text>
  );
}

function DealRibbon() {
  const color = "pink.100";

  return (
    <Flex flexDirection={"column"} alignItems={"center"} mt={"-8px"} zIndex={1}>
      <Box
        width={0}
        height={0}
        borderLeft={"20px solid transparent"}
        borderRight={"20px solid transparent"}
        borderBottom={`14px solid`}
        borderBottomColor={color}
        ml={100}
      />
      <Text
        px={5}
        py={"3px"}
        backgroundColor={color}
        color="pink.800"
        fontWeight={"bold"}
        fontSize={"small"}
        borderRadius={100}
      >
        Biggest savings with this option!
      </Text>
    </Flex>
  );
}
