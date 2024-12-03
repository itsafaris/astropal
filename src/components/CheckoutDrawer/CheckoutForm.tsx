import * as React from "react";
import { Box, Button, Flex, Icon, IconButton, Text } from "@chakra-ui/react";

import { FaArrowLeft } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import {
  ExpressCheckoutElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { trackPosthogEvent, trackPixelEvent } from "@utils/tracking";
import { ErrorView, LoadingView } from "./components";
import { OneTimeFeePrice } from "@astropal/api-client/dist/src/controllers/pricing";
import { eden } from "@utils/coreApi";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { createExternalURL } from "@components/onboarding/utils";

export type RequestType =
  | {
      state: "initial";
    }
  | {
      state: "loading";
    }
  | {
      state: "ok";
    }
  | {
      state: "error";
      error: string;
    };

export function CheckoutForm({ plan }: { plan: OneTimeFeePrice }) {
  const [paymentType, setPaymentType] = React.useState<"card" | "initial">("initial");
  const [expressCheckoutReady, setExpressCheckoutReady] = React.useState(false);
  const [cardCheckoutReady, setCardCheckoutReady] = React.useState(false);
  const [payment, submitPayment] = usePayment(plan);

  const isReady = cardCheckoutReady && expressCheckoutReady;

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

      {!isReady && <LoadingView text="Loading secure payment form..." />}

      <Box display={isReady ? "block" : "none"}>
        <Box display={paymentType === "initial" ? "block" : "none"}>
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

function usePayment(
  plan: OneTimeFeePrice
): [RequestType, (type: "express" | "card") => Promise<void>] {
  const planRef = React.useRef(plan);
  const stripe = useStripe();
  const elements = useElements();
  const { userProfile, selectedPricingPlan, trialPricingPlan } = useGlobalState2();

  const [request, setRequest] = React.useState<RequestType>({
    state: "initial",
  });

  async function submit(type: "express" | "card") {
    if (!userProfile || !selectedPricingPlan || !trialPricingPlan || !stripe || !elements) {
      console.warn("data missing for subscription setup");
      return;
    }

    if (request.state !== "initial") {
      return;
    }

    setRequest({ state: "loading" });

    const redirectUrl = createExternalURL("/face-reading/success-checkout/onboarding-reports-1", {
      paymentType: type,
      pricePaid: planRef.current.unit_amount,
      currency: planRef.current.currency,
      planID: planRef.current.priceID,
    });

    trackPixelEvent("AddPaymentInfo");

    trackPosthogEvent({
      name: "add-payment-info",
      properties: {},
    });

    try {
      elements.update({
        amount: planRef.current.unit_amount,
        currency: planRef.current.currency,
      });

      // Trigger form validation and wallet collection
      const elementSubmission = await elements.submit();
      if (elementSubmission.error) {
        setRequest({
          state: "error",
          error: elementSubmission.error.message ?? "Element submission failed",
        });

        return;
      }

      const subscription = await eden("/payments/createSubscription", {
        method: "POST",
        body: {
          userID: userProfile.id,
          priceID: trialPricingPlan.recurring.priceID,
          oneTimeFeePriceID: selectedPricingPlan,
        },
      });

      if (subscription.error) {
        setRequest({
          state: "error",
          error: subscription.error.message,
        });

        return;
      }

      if (!subscription.data) {
        setRequest({
          state: "error",
          error: "missing payment intent data",
        });

        return;
      }

      // Empty client secret means that overall price of the cart is very close to 0.
      // In that case subscription becomes automatically activated.
      // GOOD FOR TESTING!
      if (!subscription.data.client_secret) {
        console.log("no client secret, payment has been paid");

        return;
      }

      const confirmation = await stripe.confirmPayment({
        elements,
        clientSecret: subscription.data.client_secret,
        confirmParams: {
          return_url: redirectUrl.toString(),
        },
      });

      if (confirmation.error) {
        console.error(confirmation.error);
        setRequest({
          state: "error",
          error: confirmation.error.message ?? "Your payment has been declined.",
        });

        return;
      }

      setRequest({ state: "ok" });
    } catch (err) {
      console.error(err);
      setRequest({ state: "error", error: String(err) });
    }
  }

  return [request, submit];
}
