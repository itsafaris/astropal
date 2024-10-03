import * as React from "react";
import { Box, Button, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { useGlobalState2 } from "@components/root/RootWrapper";

import { FaArrowLeft } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import {
  ExpressCheckoutElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { trackPixel } from "@utils/tracking";
import { createSuccessCheckoutURL } from "./utils";
import { ErrorView, LoadingView } from "./components";
import { RequestType } from "./types";

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentType, setPaymentType] = React.useState<"card" | "initial">("initial");

  const { trialPricingPlan, selectedPricingPlan } = useGlobalState2();
  const plan = trialPricingPlan?.oneTimeFee.find((p) => p.priceID === selectedPricingPlan);

  const [expressCheckoutReady, setExpressCheckoutReady] = React.useState(false);
  const [cardCheckoutReady, setCardCheckoutReady] = React.useState(false);
  const [payment, setPayment] = React.useState<RequestType>({
    state: "initial",
  });

  async function submitPayment(type: "express" | "card") {
    if (!stripe || !elements) {
      return;
    }

    setPayment({ state: "loading" });

    const redirectUrl = createSuccessCheckoutURL(
      type,
      plan!.unit_amount,
      plan!.currency,
      plan!.priceID
    );

    trackPixel("AddPaymentInfo");

    try {
      const res = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: redirectUrl.toString(),
        },
      });

      if (res.error) {
        console.error(res.error);
        setPayment({
          state: "error",
          error: res.error.message ?? "Your payment has been declined.",
        });

        return;
      }
    } catch (err) {
      console.error(err);
      setPayment({ state: "error", error: String(err) });
    }
  }

  if (!plan) {
    return "pricing plan not selected";
  }

  return (
    <Box>
      <Flex alignItems={"center"} justifyContent={"space-between"} mb={4}>
        <IconButton
          visibility={paymentType === "card" ? "visible" : "hidden"}
          aria-label="go back"
          icon={<Icon as={FaArrowLeft} />}
          onClick={() => setPaymentType("initial")}
          variant={"text"}
          width={"40px"}
        />

        <Text flex={1} textAlign={"center"} fontWeight={"bold"} color="blue.700">
          Total due today: ${plan.unit_amount / 100}
        </Text>
        <Box width={"40px"}></Box>
      </Flex>

      {payment.state === "error" && <ErrorView text={payment.error} />}

      {(!cardCheckoutReady || !expressCheckoutReady) && (
        <LoadingView text="Loading secure payment form..." />
      )}

      <Box display={cardCheckoutReady && expressCheckoutReady ? undefined : "none"}>
        <Box display={paymentType === "initial" ? "box" : "none"}>
          <ExpressCheckoutElement
            options={{
              layout: { maxColumns: 1, maxRows: 5 },
            }}
            onReady={() => setExpressCheckoutReady(true)}
            onConfirm={() => {
              submitPayment("express");
            }}
          />

          <Button
            size="lg"
            colorScheme="blue"
            width={"full"}
            mt={4}
            leftIcon={<Icon as={MdCreditCard} />}
            onClick={() => setPaymentType("card")}
          >
            Credit or debit card
          </Button>
        </Box>

        <Flex
          display={paymentType === "card" ? "flex" : "none"}
          direction={"column"}
          gap={4}
          alignItems={"start"}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitPayment("card");
            }}
            style={{ width: "100%" }}
          >
            <PaymentElement
              onReady={() => setCardCheckoutReady(true)}
              options={{
                wallets: { applePay: "never", googlePay: "never" },
                layout: "tabs",
                terms: { card: "never" },
              }}
            />

            <Button
              type="submit"
              colorScheme="blue"
              width={"full"}
              size="lg"
              mt={4}
              isLoading={payment.state === "loading"}
            >
              Start 7-day trial
            </Button>
          </form>
        </Flex>
      </Box>
    </Box>
  );
}
