import {
  Container,
  Flex,
  Button,
  Stack,
  Text,
  StackProps,
  Box,
  Input,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PageProps, navigate } from "gatsby";
import React, { useState } from "react";
import { AiOutlineSafety } from "react-icons/ai";
import { trackEvent, trackPixel } from "@utils/tracking";
import { PricingPlanType, getPlanByID } from "@utils/pricingPlans";

export interface ICheckoutPageProps {}

export default function CheckoutPage(props: PageProps) {
  const params = new URLSearchParams(props.location.search);
  const pricingPlanID = params.get("pricingPlanID");
  const pricingPlan = pricingPlanID ? getPlanByID(pricingPlanID) : undefined;

  const [stripe] = useState(
    loadStripe(
      "pk_test_51NyYKxHNcUWCpQhl6DalgAazW5OGGWbRp1kpYr4Bkhbc7r6BnhoOQIFbLBwSBIHHY8bb6ggQLTG07MdaLfgix0uG00zPDg5bF6"
    )
  );

  // TODO: render a nicer screen
  if (!pricingPlanID) {
    return "url query param `pricingPlanID` not specified";
  }

  if (!pricingPlan) {
    return `cannot find pricing plan with id ${pricingPlanID}`;
  }

  return (
    <Box py={2} bg="bg.100" color="white" minHeight={"100vh"}>
      <Heading textAlign={"center"} fontSize={"2xl"} my={6}>
        Order Summary
      </Heading>
      <Container maxWidth={"4xl"}>
        <Elements
          stripe={stripe}
          options={{
            mode: "payment",
            amount: 1234,
            currency: "usd",
          }}
        >
          <CheckoutForm pricingPlan={pricingPlan} />
        </Elements>
      </Container>
    </Box>
  );
}

function CheckoutForm({ pricingPlan }: { pricingPlan: PricingPlanType }) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");

  const [_, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message ?? "");
      setIsLoading(false);
      return;
    }

    await new Promise((res) => setTimeout(res, 2000));
    trackEvent({
      name: "purchase",
      properties: {
        promptPackID: pricingPlan.durationInMonths,
        pricePayed: pricingPlan.price,
        currency: "USD",
      },
    });
    trackPixel("Purchase", { currency: "USD", value: 30 });
    navigate(`/checkout-error`);

    setIsLoading(false);
  }

  return (
    <Flex
      as="form"
      direction={"column"}
      bg="bg.900"
      p={4}
      borderRadius={"xl"}
      onSubmit={(e) => handleSubmit(e)}
    >
      <PromptPackPreview promptPack={pricingPlan} mb={6} />

      <PaymentElement
        options={{
          readOnly: isLoading,
          layout: {
            type: "tabs",
          },
        }}
      />

      <FormControl my={3}>
        <FormLabel color="black" mb={1}>
          Email
        </FormLabel>
        <Input
          size="lg"
          backgroundColor={"white"}
          value={email}
          placeholder="e.g. janedoe@jd.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Text color="black" fontSize={"xs"}>
          We will send you instruction on how to start using your astrologer
        </Text>
      </FormControl>

      <Button
        my={6}
        size="lg"
        type="submit"
        isDisabled={isLoading || !stripe || !elements}
        isLoading={isLoading}
        colorScheme="green"
      >
        Pay Now
      </Button>

      <Box textAlign={"center"} mt={8} mb={4}>
        <a href="https://stripe.com" target="_blank" rel="noopener">
          <Text as="span" color="gray.500">
            Safe checkout powered by{" "}
            <StripeLogo style={{ display: "inline", verticalAlign: "middle" }} height={19} />
          </Text>
        </a>
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

function PromptPackPreview({ promptPack, ...rest }: { promptPack: PricingPlanType } & StackProps) {
  const discountPerc = 100 - Math.round((promptPack.price / promptPack.priceBefore) * 100);
  const discountAbs = promptPack.priceBefore - promptPack.price;

  return (
    <Stack color="black" {...rest}>
      <Flex direction={"row"} gap={4} alignItems={"end"}>
        <Text flex={5}>Personal Astrologer</Text>
        <Text fontWeight={"bold"} flex={2} textAlign={"right"}>
          ${promptPack.priceBefore}
        </Text>
      </Flex>
      <Flex direction={"row"} gap={4} alignItems={"end"}>
        <Text flex={5}>Discount ({discountPerc}%)</Text>
        <Text fontWeight={"bold"} flex={2} color="red.500" textAlign={"right"}>
          - ${discountAbs}
        </Text>
      </Flex>

      <Stack direction={"row"} alignItems={"start"} justifyContent={"space-between"}>
        <Text fontWeight={"bold"}>Total:</Text>
        <Stack spacing={0}>
          <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"right"}>
            {promptPack.price}
          </Text>
          <Text fontSize={"xs"}>
            {promptPack.durationInMonths === 1
              ? "Billed every month"
              : `Billed every ${promptPack.durationInMonths} months`}
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
