import * as React from "react";
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useGlobalState2 } from "@components/root/RootWrapper";
import { Timer } from "@components/timer";
import { FaStar } from "react-icons/fa";
import { MdFreeCancellation, MdOutlineDiscount, MdVerified } from "react-icons/md";
import { Span } from "@components/quizpage/components";
import { trackPixel } from "@utils/tracking";
import { CheckoutWidget } from "./CheckoutWidget";

export function CheckoutPage() {
  const { trialPricingPlan, selectedPricingPlan } = useGlobalState2();
  const plan = trialPricingPlan?.oneTimeFee.find((p) => p.priceID === selectedPricingPlan);
  const recurringDiscount = 10;
  const currentRecurringPrice = (trialPricingPlan?.recurring.unit_amount ?? 0) / 100;
  const beforeRecurringPrice = currentRecurringPrice + recurringDiscount;

  React.useEffect(() => {
    trackPixel("InitiateCheckout");
  }, []);

  if (!plan) {
    return <Box>Pricing plan not selected</Box>;
  }

  return (
    <Box>
      <Container pb={"400px"}>
        <Flex direction={"column"} alignItems={"center"}>
          <Text my={4} textAlign={"center"} mx="auto" fontSize={"sm"}>
            The #1 Astrology app trusted by
            <br /> over 25 million people.
          </Text>

          <Flex gap={1}>
            {Array(5)
              .fill("")
              .map((_, idx) => (
                <Icon key={idx} as={FaStar} color="orange.300" />
              ))}
          </Flex>
        </Flex>

        <Flex p={3} bg="blue.50" my={6} justifyContent={"space-between"}>
          <Text>Personalized offer reserved</Text>
          <Timer />
        </Flex>

        <Heading my={8}>Start your 7-day trial</Heading>

        <Flex
          justifyContent={"space-between"}
          borderTop={"1px solid"}
          borderBottom={"1px solid"}
          borderColor={"gray.300"}
          py={3}
          my={4}
        >
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Total today
          </Text>

          <Text fontSize={"lg"} color="blue.600" fontWeight={"bold"}>
            ${(plan.unit_amount / 100).toFixed(2)}
          </Text>
        </Flex>

        <Flex alignItems={"center"} gap={2} my={6}>
          <Icon as={MdOutlineDiscount} fontSize={"lg"} color="green.600" />
          <Text fontSize={"xs"} fontWeight={"bold"} color="green.500">
            Code FACEASTRO24 applied!
          </Text>
        </Flex>

        <Box>
          <Text fontSize={"sm"}>
            You will be charged only{" "}
            <Span fontWeight={"bold"}>
              ${(plan.unit_amount / 100).toFixed(2)} for your 7-day trial.
            </Span>{" "}
            Then <Span textDecoration={"line-through"}>${beforeRecurringPrice}</Span> $
            {currentRecurringPrice} per week. Save ${recurringDiscount} every week. We'll{" "}
            <Span fontWeight={"bold"}>email you a reminder</Span> before your trial ends.
          </Text>
        </Box>

        <Flex justifyContent={"space-between"} my={4}>
          <Flex flex={1} alignItems={"center"} gap={2}>
            <Icon as={MdFreeCancellation} fontSize={"3xl"} color="blue.500" />
            <Text fontSize={"xs"} fontWeight={"semibold"} color="gray.600">
              No commitment.
              <br />
              Cancel anytime.
            </Text>
          </Flex>
          <Flex flex={1} alignItems={"center"} gap={2}>
            <Icon as={MdVerified} fontSize={"3xl"} color="blue.500" />
            <Text fontSize={"xs"} fontWeight={"semibold"} color="gray.600">
              14-day money-back guarantee
            </Text>
          </Flex>
        </Flex>
      </Container>

      <Drawer isOpen={true} placement="bottom" onClose={() => {}} blockScrollOnMount={false}>
        <DrawerContent boxShadow={"dark-lg"}>
          <DrawerBody>
            <Container>
              <CheckoutWidget />
            </Container>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
