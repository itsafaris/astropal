import { Box, Flex, Stack, Text, Button, TextProps } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { pricingPlans, PricingPlanType } from "@utils/pricingPlans";
import { trackEvent } from "@utils/tracking";
import { ComponentProps, useState } from "react";
import { CTALinkToPricing } from "./components";

export interface IPricingPageProps {}

export function PricingSection(props: ComponentProps<typeof Box>) {
  return (
    <Box id="pricing-section" as="section" {...props}>
      <Stack spacing={4}>
        <PricingPlans />

        <Flex>
          <Text fontSize={"sm"} color="bg.600">
            Your subscription renews at the start of the period. You can cancel any time.
          </Text>
        </Flex>

        {/* <TermsAgreement /> */}
        {/* <RiskFreeGuaranteed /> */}
        <SafeCheckout />
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
      px={2}
      py={2}
      borderRadius={8}
      border={"1px solid"}
      borderColor="bg.200"
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap={1}
    >
      <Text fontSize={"xs"} color="bg.500" fontWeight={"semibold"} lineHeight={"normal"}>
        Safe Checkout Guarantee
      </Text>
      <Box mx="auto">
        <StaticImage
          alt="Safe checkout"
          src="../../images/safe-checkout.png"
          layout="constrained"
        />
      </Box>
    </Flex>
  );
}

export function PricingPlans() {
  const [selectedPlanID, setSelectedPlanID] = useState(pricingPlans["6month"].id);

  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <PricingPlanItem
        billingText={"Billed every 6 months"}
        tagText={"Best"}
        tagColor={"green.400"}
        pricingPlan={pricingPlans["6month"]}
        isSelected={selectedPlanID === pricingPlans["6month"].id}
        onClick={() => {
          trackEvent({ name: "change-pricing", properties: { planID: pricingPlans["6month"].id } });
          setSelectedPlanID(pricingPlans["6month"].id);
        }}
      />

      <PricingPlanItem
        billingText={"Billed every 3 months"}
        tagColor={"brand.700"}
        pricingPlan={pricingPlans["3month"]}
        isSelected={selectedPlanID === pricingPlans["3month"].id}
        onClick={() => {
          trackEvent({ name: "change-pricing", properties: { planID: pricingPlans["3month"].id } });
          setSelectedPlanID(pricingPlans["3month"].id);
        }}
      />

      <PricingPlanItem
        billingText={"Billed every month"}
        pricingPlan={pricingPlans["1month"]}
        isSelected={selectedPlanID === pricingPlans["1month"].id}
        onClick={() => {
          trackEvent({ name: "change-pricing", properties: { planID: pricingPlans["1month"].id } });
          setSelectedPlanID(pricingPlans["1month"].id);
        }}
      />

      <CTALinkToPricing
        mt={4}
        onClick={() => {
          trackEvent({ name: "start-checkout", properties: { planID: selectedPlanID } });
        }}
      >
        Start Your Program Now
      </CTALinkToPricing>
    </Flex>
  );
}

function PricingPlanItem({
  billingText,
  tagText,
  pricingPlan,
  isSelected,
  ...props
}: {
  billingText: string;
  tagText?: string;
  tagColor?: string;
  pricingPlan: PricingPlanType;
  isSelected?: boolean;
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
      borderColor={isSelected ? "brand.500" : "bg.400"}
      mt={3}
      {...props}
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
            ${pricingPlan.dailyBefore}
          </Text>

          <Text fontSize={"3xl"} fontWeight={"bold"} lineHeight={"normal"} color="bg.900">
            ${pricingPlan.daily}
          </Text>

          <Text fontSize={"sm"} fontWeight={"semibold"} lineHeight={"normal"} color="bg.700">
            per day
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Badge({ ...rest }: TextProps) {
  return (
    <Text
      py={"3px"}
      px={"15px"}
      backgroundColor="brand.600"
      color="black"
      fontWeight={"bold"}
      fontSize={"14px"}
      borderRadius={"5px"}
      {...rest}
    >
      Best value
    </Text>
  );
}
