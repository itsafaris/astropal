import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";

export function PricingSection() {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      backgroundColor={"#112521"}
      height={"100vh"}
      p={5}
      gap={3}
    >
      <PricingCard
        title={"6 month plan"}
        billingText={"Billed every 6 months"}
        tagText={"Best value"}
        tagColor={"green"}
        currentPrice={0.28}
        previousPrice={1.11}
        buttonText={"Claim my plan (save 75%)"}
      />
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
      p={4}
      borderRadius={10}
      backgroundColor={"white"}
      width={"100%"}
    >
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        gap={3}
      >
        <Flex flexDirection={"column"} alignItems={"flex-start"} gap={0} alignSelf={"flex-end"}>
          <Tag color={tagColor} text={tagText} />

          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {title}
          </Text>

          <Text fontSize={"small"} color="grey">
            {billingText}
          </Text>
        </Flex>

        <Flex flexDirection={"column"} alignItems={"center"}>
          <Text color="red" textDecoration={"line-through"} fontWeight={"semibold"}>
            ${previousPrice}
          </Text>

          <Text fontSize={"3xl"} fontWeight={"bold"} lineHeight={"normal"}>
            ${currentPrice}
          </Text>

          <Text fontSize={"small"} fontWeight={"semibold"}>
            per day
          </Text>
        </Flex>
      </Flex>

      <Button width={"full"} colorScheme="blue">
        {buttonText}
      </Button>
    </Flex>
  );
}

function Tag(props: { color?: string; text?: string }) {
  const { text, color = "black" } = props;

  if (!text) {
    return null;
  }

  return (
    <Text
      fontSize={"small"}
      fontWeight={"semibold"}
      color={color}
      px={2}
      borderRadius={4}
      border={`2px solid ${color}`}
    >
      {text}
    </Text>
  );
}
