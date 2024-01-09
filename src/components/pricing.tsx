import React from "react";
import { Flex, Button, Text, Box } from "@chakra-ui/react";

export function PricingSection() {
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <PricingCard
        title={"6 month plan"}
        billingText={"Billed every 6 months"}
        tagText={"Best value"}
        tagColor={"green"}
        currentPrice={0.28}
        previousPrice={1.11}
        buttonText={"Claim my plan (save 75%)"}
      />

      <DealRibbon2 />

      <PricingCard
        title={"3 month plan"}
        billingText={"Billed every 3 months"}
        tagText={"Most popular"}
        tagColor={"purple"}
        currentPrice={0.41}
        previousPrice={1.25}
        buttonText={"Claim my plan (save 67%)"}
      />
      <PricingCard
        title={"1 month plan"}
        billingText={"Billed every month"}
        currentPrice={0.99}
        previousPrice={1.99}
        buttonText={"Claim my plan (save 50%)"}
      />
    </Flex>
  );
}

function PricingCard({
  title,
  billingText,
  tagText,
  tagColor,
  currentPrice,
  previousPrice,
  buttonText,
}: {
  title: string;
  billingText: string;
  tagText?: string;
  tagColor?: string;
  currentPrice: number;
  previousPrice: number;
  buttonText: string;
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
      borderColor="brand.500"
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
            {title}
          </Text>

          <Text fontSize={"small"} color="bg.600" lineHeight={"normal"}>
            {billingText}
          </Text>
        </Flex>

        <Flex flexDirection={"column"} alignItems={"flex-end"}>
          <Text color="bg.600" textDecoration={"line-through"} lineHeight={"normal"}>
            ${previousPrice}
          </Text>

          <Text fontSize={"3xl"} fontWeight={"bold"} lineHeight={"normal"} color="bg.900">
            ${currentPrice}
          </Text>

          <Text fontSize={"md"} fontWeight={"semibold"} lineHeight={"normal"} color="bg.600">
            per day
          </Text>
        </Flex>
      </Flex>

      <Button
        variant={"solid"}
        backgroundColor="brand.600"
        _hover={{
          backgroundColor: "brand.500",
        }}
        width={"full"}
      >
        {buttonText}
      </Button>
    </Flex>
  );
}

function DealRibbon({ color = "#fd5556", text }: { color?: string; text?: string }) {
  if (!text) {
    return null;
  }

  return (
    <Text
      color="white"
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
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <Box
        width={0}
        height={0}
        borderLeft={"20px solid transparent"}
        borderRight={"20px solid transparent"}
        borderBottom={"12px solid green"}
      />
      <Text
        px={5}
        py={2}
        backgroundColor={"green"}
        color="white"
        fontWeight={"bold"}
        fontSize={"small"}
        borderRadius={3}
      >
        Important! Biggest savings with this option.
      </Text>
    </Flex>
  );
}
