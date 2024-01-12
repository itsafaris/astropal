import { Box, Flex, Heading, Stack, Text, Button, TextProps } from "@chakra-ui/react";
import { Link } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";
import { pricingPlans, PricingPlanType } from "@utils/pricingPlans";
import { trackEvent } from "@utils/tracking";

export interface IPricingPageProps {}

export function PricingSection() {
  return (
    <Box id="pricing-section" as="section" py={8}>
      <Stack mb={8}>
        <Heading fontSize={"3xl"} textAlign={"center"} color="white">
          Choose your plan
        </Heading>
      </Stack>

      <Stack spacing={4}>
        <PricingPlans />
        <TermsAgreement />
        <RiskFreeGuaranteed />
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
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <PricingPlanItem
        billingText={"Billed every 6 months"}
        tagText={"Best value"}
        tagColor={"green.400"}
        buttonText={"Claim my plan (save 75%)"}
        buttonColor="#04a804"
        buttonHoverColor="#038b03"
        buttonTextColor="white"
        pricingPlan={pricingPlans["6month"]}
      />

      <DealRibbon />

      <PricingPlanItem
        billingText={"Billed every 3 months"}
        tagColor={"brand.700"}
        buttonText={"Claim my plan (save 65%)"}
        pricingPlan={pricingPlans["3month"]}
      />

      <PricingPlanItem
        billingText={"Billed every month"}
        buttonText={"Claim my plan (save 50%)"}
        pricingPlan={pricingPlans["1month"]}
      />
    </Flex>
  );
}

function PricingPlanItem({
  billingText,
  tagText,
  buttonText,
  buttonColor,
  buttonHoverColor,
  borderColor,
  buttonTextColor,
  pricingPlan,
}: {
  billingText: string;
  tagText?: string;
  tagColor?: string;
  buttonText: string;
  buttonTextColor?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  borderColor?: string;
  pricingPlan: PricingPlanType;
}) {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      p={3}
      borderRadius={10}
      backgroundColor="whiteAlpha.100"
      width={"100%"}
      position="relative"
      border={`1px solid`}
      borderColor={borderColor ?? "brand.500"}
      mt={3}
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

          <Text fontSize={"sm"} fontWeight={"semibold"} lineHeight={"normal"} color="bg.600">
            per day
          </Text>
        </Flex>
      </Flex>

      <Link
        to={`/checkout?pricingPlanID=${pricingPlan.id}`}
        style={{ width: "100%" }}
        onClick={() => {
          trackEvent({ name: "chose-pricing-plan", properties: { ...pricingPlan } });
        }}
      >
        <Button
          variant={"solid"}
          backgroundColor={buttonColor ?? "brand.700"}
          _hover={{
            backgroundColor: buttonHoverColor ?? "brand.600",
          }}
          width={"full"}
          color={buttonTextColor}
          fontWeight={"semibold"}
        >
          {buttonText}
        </Button>
      </Link>
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
