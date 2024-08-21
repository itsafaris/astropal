import * as React from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Heading,
  Icon,
  IconButton,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useGlobalState2 } from "@components/root/RootWrapper";
import { Timer } from "@components/timer";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { MdCreditCard, MdFreeCancellation, MdOutlineDiscount, MdVerified } from "react-icons/md";
import { Span } from "@components/quizpage/components";
import { loadStripe } from "@stripe/stripe-js";
import { siteConfig } from "src/conf";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { trackPixel } from "@utils/tracking";
import { eden } from "@utils/coreApi";
import { createSuccessCheckoutURL } from "../success-checkout";

export type RequestType =
  | {
      state: "initial";
    }
  | {
      state: "loading";
    }
  | {
      state: "ok";
      data: { clientSecret: string };
    }
  | {
      state: "error";
      error: string;
    };

export interface ICheckoutPageProps {}

export default function CheckoutPage(props: ICheckoutPageProps) {
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
              .map((it) => (
                <Icon as={FaStar} color="orange.300" />
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
              30-day money-back guarantee
            </Text>
          </Flex>
        </Flex>
      </Container>

      <Drawer isOpen={true} placement="bottom" onClose={() => {}} blockScrollOnMount={false}>
        <DrawerContent boxShadow={"dark-lg"}>
          <DrawerBody>
            <Container>
              <PaymentWidget />
            </Container>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

function PaymentWidget() {
  const [paymentIntent, setPaymentIntent] = React.useState<RequestType>({
    state: "initial",
  });
  const globalState = useGlobalState2();

  React.useEffect(() => {
    initPaymentIntent();
  }, [globalState]);

  async function initPaymentIntent() {
    const { userProfile, selectedPricingPlan, trialPricingPlan } = globalState;
    if (!userProfile || !selectedPricingPlan || !trialPricingPlan) {
      console.warn("data missing for subscription setup");
      return;
    }

    if (paymentIntent.state === "ok") {
      return;
    }

    try {
      setPaymentIntent({ state: "loading" });

      const res = await eden("/payments/createSubscription", {
        method: "POST",
        body: {
          userID: userProfile.id,
          priceID: trialPricingPlan.recurring.priceID,
          oneTimeFeePriceID: selectedPricingPlan,
        },
      });

      if (res.error) {
        setPaymentIntent({
          state: "error",
          error: res.error.message,
        });
        return;
      }

      if (!res.data) {
        setPaymentIntent({
          state: "error",
          error: "missing payment intent data",
        });
        return;
      }

      // Empty client secret means that overall price of the cart is very close to 0.
      // In that case subscription becomes automatically activated.
      // GOOD FOR TESTING!
      if (!res.data.client_secret) {
        console.log("no client secret, payment has been paid");
        return;
      }

      setPaymentIntent({
        state: "ok",
        data: {
          ...res.data,
          clientSecret: res.data.client_secret,
        },
      });
    } catch (err) {
      console.error(err);
      setPaymentIntent({
        state: "error",
        error: String(err),
      });
    }
  }

  return (
    <Box>
      {paymentIntent.state === "error" && (
        <Box color="black">
          <Text fontWeight={"semibold"}>Error</Text>
          <Text>{paymentIntent.error}</Text>
        </Box>
      )}

      {paymentIntent.state === "loading" && <Loading text="Loading secure payment form..." />}

      {paymentIntent.state === "ok" && (
        <Elements
          stripe={stripe}
          options={{
            clientSecret: paymentIntent.data.clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                tabLogoColor: "green",
                tabLogoSelectedColor: "red",
              },
            },
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  );
}

const stripe = loadStripe(siteConfig.stripePublicKey);

function CheckoutForm(props: React.PropsWithChildren) {
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
        setPayment({
          state: "error",
          error: res.error.message ?? "Your payment has been declined.",
        });

        return;
      }
    } catch (err) {
      setPayment({ state: "error", error: String(err) });
      throw err;
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

      {(!cardCheckoutReady || !expressCheckoutReady) && (
        <Loading text="Loading secure payment form..." />
      )}

      <Box display={cardCheckoutReady && expressCheckoutReady ? undefined : "none"}>
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
      </Box>
    </Box>
  );
}

export function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <Stack mt={2}>
      <Text color="gray.700" fontSize={"sm"} textAlign={"center"}>
        {text}
      </Text>
      <Progress size="lg" isIndeterminate />
    </Stack>
  );
}
