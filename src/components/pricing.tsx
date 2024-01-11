import React from "react";
import { Flex, Button, Text, Box } from "@chakra-ui/react";
import { Link } from "gatsby";

import { pricingPlans, PricingPlanType } from "@utils/pricingPlans";

export function PricingSection() {
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <PricingCard
        billingText={"Billed every 6 months"}
        tagText={"Best value"}
        tagColor={"green.400"}
        buttonText={"Claim my plan (save 75%)"}
        buttonColor="#04a804"
        buttonHoverColor="#038b03"
        borderColor="green.400"
        buttonTextColor="white"
        pricingPlan={pricingPlans["6month"]}
      />

      <DealRibbon2 />

      <PricingCard
        billingText={"Billed every 3 months"}
        tagText={"Most popular"}
        tagColor={"brand.700"}
        buttonText={"Claim my plan (save 65%)"}
        pricingPlan={pricingPlans["3month"]}
      />

      <PricingCard
        billingText={"Billed every month"}
        buttonText={"Claim my plan (save 50%)"}
        pricingPlan={pricingPlans["1month"]}
      />
    </Flex>
  );
}

function PricingCard({
  billingText,
  tagText,
  tagColor,
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
      gap={3}
      p={3}
      borderRadius={10}
      backgroundColor="whiteAlpha.100"
      width={"100%"}
      position="relative"
      overflow="hidden"
      border={`2px solid`}
      borderColor={borderColor ?? "brand.500"}
      mt={4}
    >
      <DealRibbon color={tagColor} text={tagText} />
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        gap={3}
      >
        <Flex flexDirection={"column"} alignItems={"flex-start"} gap={0} alignSelf={"flex-end"}>
          <Text fontSize={"2xl"} fontWeight={"bold"} color="bg.900" lineHeight={"normal"}>
            {pricingPlan.title}
          </Text>

          <Text fontSize={"small"} color="bg.600" lineHeight={"normal"}>
            {billingText}
          </Text>
        </Flex>

        <Flex flexDirection={"column"} alignItems={"flex-end"}>
          <Text color="bg.600" textDecoration={"line-through"} lineHeight={"normal"}>
            ${pricingPlan.dailyBefore}
          </Text>

          <Text fontSize={"3xl"} fontWeight={"bold"} lineHeight={"normal"} color="bg.900">
            ${pricingPlan.daily}
          </Text>

          <Text fontSize={"md"} fontWeight={"semibold"} lineHeight={"normal"} color="bg.600">
            per day
          </Text>
        </Flex>
      </Flex>

      <Link to={`/checkout?pricingPlanID=${pricingPlan.id}`} style={{ width: "100%" }}>
        <Button
          variant={"solid"}
          backgroundColor={buttonColor ?? "brand.700"}
          _hover={{
            backgroundColor: buttonHoverColor ?? "brand.600",
          }}
          width={"full"}
          color={buttonTextColor}
        >
          {buttonText}
        </Button>
      </Link>
    </Flex>
  );
}

function DealRibbon({ color = "#fd5556", text }: { color?: string; text?: string }) {
  if (!text) {
    return null;
  }

  return (
    <Text
      color="bg.100"
      backgroundColor={color}
      width={"300px"}
      textAlign={"center"}
      pt={10}
      pb={1}
      position="absolute"
      top={"0px"}
      left={"45px"}
      fontWeight={"bold"}
      borderRadius={3}
      transform={"translate(-50%, -50%) rotate(-12deg)"}
      fontSize="small"
    >
      {text}
    </Text>
  );
}

function DealRibbon2() {
  const color = "green.400";

  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <Box
        width={0}
        height={0}
        borderLeft={"20px solid transparent"}
        borderRight={"20px solid transparent"}
        borderBottom={`12px solid`}
        borderBottomColor={color}
      />
      <Text
        px={5}
        py={1}
        backgroundColor={color}
        color="bg.100"
        fontWeight={"bold"}
        fontSize={"small"}
        borderRadius={100}
      >
        Biggest savings with this option!
      </Text>
    </Flex>
  );
}
