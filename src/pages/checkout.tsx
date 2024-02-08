import {
  Container,
  Flex,
  Button,
  Stack,
  Text,
  StackProps,
  Box,
  Heading,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { PageProps, navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import { AiOutlineSafety } from "react-icons/ai";
import { trackEvent, trackPixel } from "@utils/tracking";
import { PricingPlanType, getPlanByID } from "@utils/pricingPlans";
import { TopNavigation } from "@components/topnavigation";
import { loadQuizState } from "@utils/localStorage";
import { QuizStateParsed } from "@utils/state";

export interface ICheckoutPageProps {}

export default function CheckoutPage(props: PageProps) {
  const [isMounted, setIsMounted] = useState(false);

  const [pricingPlan, setPricingPlan] = useState<PricingPlanType>();

  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(props.location.search);
    const pricingPlanID = params.get("pricingPlanID");
    const pricingPlan = pricingPlanID ? getPlanByID(pricingPlanID) : undefined;
    setPricingPlan(pricingPlan);
  }, []);

  if (!pricingPlan || !isMounted) {
    return "no pricing plan";
  }

  return <CheckoutWidget pricingPlan={pricingPlan} />;
}

export function CheckoutWidget({ pricingPlan }: { pricingPlan: PricingPlanType }) {
  useEffect(() => {
    trackEvent({ name: "checkout_started", properties: { pricingPlan } });
  }, []);

  return (
    <Box py={4}>
      <Container flexDirection={"column"} display={"flex"} gap={5}>
        <Heading textAlign={"center"} fontSize={"2xl"}>
          Order Summary
        </Heading>
        <CheckoutForm pricingPlan={pricingPlan} />
      </Container>
    </Box>
  );
}

interface FormSubmitResult {
  elementsError?: { message?: string };
  emailError?: { message?: string };
}

async function validateAndSubmit(input: { elements: StripeElements }): Promise<FormSubmitResult> {
  const result: FormSubmitResult = {};

  const { error: paymentDetailsError } = await input.elements.submit();

  if (paymentDetailsError) {
    result.elementsError = { message: paymentDetailsError.message };
  }

  return result;
}

function CheckoutForm({ pricingPlan }: { pricingPlan: PricingPlanType }) {
  const stripe = useStripe();
  const elements = useElements();

  const [expressCheckoutReady, setExpressCheckoutReady] = useState(false);
  const [cardCheckoutReady, setCardCheckoutReady] = useState(false);

  const [_, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [quizState, setQuizState] = useState<QuizStateParsed | undefined>();

  useEffect(() => {
    const q = loadQuizState();
    setQuizState(q);
  }, []);

  async function handleCardPaymentSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { elementsError } = await validateAndSubmit({ elements });
    if (elementsError) {
      setMessage(elementsError?.message ?? "");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    handlePaymentSuccess("card");
  }

  function handlePaymentSuccess(paymentType: string) {
    trackEvent({
      name: "purchase",
      properties: {
        promptPackID: pricingPlan.id,
        pricePayed: pricingPlan.price,
        currency: "USD",
        paymentType: paymentType,
        profile: quizState,
      },
    });
    trackPixel("Purchase", { currency: "USD", value: pricingPlan.price });
    navigate(`/checkout-error`);
  }

  return (
    <Flex
      direction={"column"}
      p={4}
      borderRadius={"xl"}
      opacity={isLoading ? 0.6 : undefined}
      onSubmit={(e) => handleCardPaymentSubmit(e)}
    >
      <PlanPreview pricingPlan={pricingPlan} />

      <Box width={"full"} display={cardCheckoutReady && expressCheckoutReady ? undefined : "none"}>
        <Text textAlign={"center"} my={4} fontWeight={"semibold"} color="bg.300">
          Select a secure payment
        </Text>

        <ExpressCheckoutElement
          options={{
            wallets: { applePay: "always", googlePay: "always" },
            layout: { maxColumns: 1, maxRows: 5 },
          }}
          onClick={async (e) => {
            setIsLoading(true);
            await new Promise((r) => setTimeout(r, 1500));
            setIsLoading(false);
            handlePaymentSuccess(e.expressPaymentType);
          }}
          onReady={() => {
            setExpressCheckoutReady(true);
          }}
          onConfirm={() => {
            // do nothing
            // it's enough for us to test "click" handler for now
          }}
        />

        <Box width={"full"} my={8} position={"relative"} opacity={0.5}>
          <Divider borderColor={"black"} width={"full"} />
          <AbsoluteCenter bg="white" px="4" color="black" fontSize={"sm"}>
            Or pay using card
          </AbsoluteCenter>
        </Box>

        <Box as="form" onSubmit={handleCardPaymentSubmit}>
          <PaymentElement
            options={{
              readOnly: isLoading,
              layout: {
                type: "tabs",
              },
            }}
            onReady={() => {
              setCardCheckoutReady(true);
            }}
          />
          <Button
            my={6}
            type="submit"
            isDisabled={isLoading || !stripe || !elements}
            isLoading={isLoading}
            colorScheme="twitter"
            width={"full"}
          >
            Pay Now with Card
          </Button>
        </Box>
      </Box>

      <Box textAlign={"center"} mt={8} mb={4}>
        <Text as="span" color="gray.500">
          Safe checkout powered by{" "}
          <StripeLogo style={{ display: "inline", verticalAlign: "middle" }} height={19} />
        </Text>
      </Box>

      <Flex flexDirection="row" alignItems="center" justifyContent={"center"} gap={2} mb={4}>
        <AiOutlineSafety size={22} color="green" />
        <Text color="bg.200" fontSize={"sm"}>
          14 days money back guarantee
        </Text>
      </Flex>
    </Flex>
  );
}

function PlanPreview({ pricingPlan, ...rest }: { pricingPlan: PricingPlanType } & StackProps) {
  const discountPerc = 100 - Math.round((pricingPlan.price / pricingPlan.priceBefore) * 100);
  const discountAbs = Math.round(pricingPlan.priceBefore - pricingPlan.price);

  return (
    <Stack color="black" {...rest}>
      <Flex direction={"row"} gap={4} alignItems={"end"}>
        <Text fontSize={"sm"} fontWeight={"semibold"} flex={5}>
          {pricingPlan.title}
        </Text>
        <Text fontWeight={"bold"} flex={2} textAlign={"right"}>
          ${pricingPlan.priceBefore}
        </Text>
      </Flex>
      <Flex direction={"row"} gap={4} alignItems={"end"}>
        <Text fontSize={"sm"} fontWeight={"semibold"} flex={5}>
          Discount ({discountPerc}%)
        </Text>
        <Text fontWeight={"bold"} flex={2} color="red.500" textAlign={"right"}>
          - ${discountAbs}
        </Text>
      </Flex>

      <Box height={"1px"} backgroundColor="blackAlpha.300" width={"full"} />

      <Stack direction={"row"} alignItems={"start"} justifyContent={"space-between"}>
        <Text fontWeight={"bold"}>Total:</Text>
        <Stack spacing={0}>
          <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"right"}>
            ${pricingPlan.price}
          </Text>
          <Text fontSize={"xs"}>
            {pricingPlan.durationInMonths === 1
              ? "Billed every month"
              : `Billed every ${pricingPlan.durationInMonths} months`}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

function StripeLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={32}
      viewBox="0 0 940 427"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M938.054 225.563c0-65.834-31.878-117.779-92.816-117.779-61.195 0-98.225 51.945-98.225 117.266 0 77.39 43.69 116.469 106.45 116.469 30.598 0 53.738-6.945 71.214-16.707V273.38c-17.476 8.738-37.542 14.146-62.988 14.146-24.933 0-47.049-8.738-49.895-39.079h125.748c0-3.359.512-16.737.512-22.884zm-127.028-24.45c0-29.032 17.76-41.128 33.956-41.128 15.654 0 32.39 12.068 32.39 41.128h-66.346zm-163.29-93.329c-25.19 0-41.385 11.812-50.379 20.038l-3.359-15.939h-56.584v299.854l64.297-13.662.257-72.751c9.25 6.689 22.884 16.224 45.54 16.224 45.995 0 87.921-37.059 87.921-118.576-.285-74.572-42.722-115.188-87.693-115.188zm-15.427 177.18c-15.171 0-24.193-5.408-30.341-12.097l-.257-95.406c6.689-7.457 15.94-12.609 30.598-12.609 23.396 0 39.591 26.242 39.591 59.914 0 34.468-15.967 60.198-39.591 60.198zM513.506 78.724v-52.2l-64.553 13.633v52.457l64.553-13.89zm-64.553 33.415h64.553v224.997h-64.553V112.139zm-69.165 19.042l-4.098-19.042h-55.559v225.025h64.297V184.662c15.17-19.81 40.872-16.224 48.842-13.378v-59.145c-8.226-3.074-38.311-8.738-53.482 19.042zM251.223 56.352l-62.76 13.378-.257 205.955c0 38.055 28.549 66.09 66.603 66.09 21.091 0 36.518-3.842 44.999-8.481v-52.201c-8.225 3.33-48.841 15.171-48.841-22.884V166.93h48.841v-54.791h-48.841l.256-55.787zM77.401 177.461c0-10.019 8.226-13.89 21.831-13.89 19.554 0 44.231 5.92 63.785 16.451v-60.426a169.59 169.59 0 00-63.756-11.812c-52.23 0-86.925 27.239-86.925 72.779 0 70.957 97.712 59.658 97.712 90.227 0 11.84-10.275 15.711-24.677 15.711-21.347 0-48.614-8.738-70.217-20.578v61.194c23.908 10.304 48.102 14.658 70.217 14.658 53.481 0 90.227-26.47 90.227-72.522-.228-76.622-98.197-62.988-98.197-91.792z"
        fill="currentColor"
      />
    </svg>
  );
}
