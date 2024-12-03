import { Box, Button, Container, Grid, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";
import { navigate } from "gatsby";
import { SpecialOfferBadge } from "@components/onboarding/SpecialOfferBadge";
import React from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { eden, TrialPricingPlan } from "@utils/coreApi";
import { sessionCache } from "src/sessionCache";
import { trackPosthogPurchaseEvent } from "@utils/tracking";
import { createInternalURL, parseURLParams } from "@components/onboarding/utils";

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

export default function Page() {
  const { trialPricingPlan } = useGlobalState2();

  if (!trialPricingPlan) {
    console.error("missing trial pricing plan");
    return null;
  }

  return <PageContent plan={trialPricingPlan} />;
}

function PageContent({ plan }: { plan: TrialPricingPlan }) {
  const [request, submit] = usePayment(plan);
  const [hasPurchasedSubscription, setHasPurchasedSubscription] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasPurchasedSubscription(sessionCache.hasPurchasedSubscription());
  }, []);

  function handleStartTrial() {
    const urlParams = parseURLParams<{
      currency: string;
      paymentType: string;
    }>(window.location.href);

    const url = createInternalURL("/face-reading/success-checkout/onboarding-skip-trial-2", {
      paymentType: urlParams.paymentType,
      currency: urlParams.currency,
    });

    navigate(url);
  }

  async function handleStartSubscription() {
    await submit();

    sessionCache.setPurchasedSubscription();

    navigateToNextStep();
  }

  function navigateToNextStep() {
    const urlParams = parseURLParams<{
      currency: string;
      paymentType: string;
    }>(window.location.href);

    const url = createInternalURL("/face-reading/success-checkout/onboarding-product", {
      paymentType: urlParams.paymentType,
      currency: urlParams.currency,
    });

    navigate(url);
  }

  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={2} />

          {hasPurchasedSubscription ? (
            <StepCompletedView onContinue={navigateToNextStep} />
          ) : (
            <StepIncompletedView
              plan={plan}
              onStartTrial={handleStartTrial}
              onStartSubscription={handleStartSubscription}
              isPaymentLoading={request.state === "loading"}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

function StepCompletedView({ onContinue }: { onContinue: () => void }) {
  return (
    <Stack spacing={5}>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        🥰 You have successfully purchased the subscription
      </Text>

      <Button size={"lg"} py={7} colorScheme="brand" onClick={onContinue}>
        <Text fontSize={["sm", "md"]}>Continue</Text>
      </Button>
    </Stack>
  );
}

function StepIncompletedView({
  plan,
  onStartTrial,
  onStartSubscription,
  isPaymentLoading,
}: {
  plan: TrialPricingPlan;
  onStartTrial: () => void;
  onStartSubscription: () => void;
  isPaymentLoading: boolean;
}) {
  return (
    <Stack spacing={5}>
      <SpecialOfferBadge
        icon="📣"
        title="Caution!"
        text="To prevent double charges please don't close the page and don't go back."
      />

      <Text fontSize={"xl"} fontWeight={"bold"}>
        Not planning on looking back?
      </Text>

      <Grid gridTemplateColumns={"1fr 1fr"} gap={2} alignItems={"flex-end"}>
        <Plan plan={plan} onSelect={onStartTrial} />
        <PlanSkipTrial plan={plan} onSelect={onStartSubscription} isLoading={isPaymentLoading} />
      </Grid>
    </Stack>
  );
}

function Plan({ plan, onSelect }: { plan: TrialPricingPlan; onSelect: () => void }) {
  const amount = plan.recurring.unit_amount;

  return (
    <Stack
      p={3}
      pt={5}
      border={"2px solid"}
      borderColor={"gray.300"}
      borderRadius={"xl"}
      spacing={3}
      fontSize={"sm"}
    >
      <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
        ${(amount / 7 / 100).toFixed(2)} / day
      </Text>

      <Stack spacing={0}>
        <Text>Billing period</Text>
        <Text color="gray.500">Every week</Text>
      </Stack>

      <Stack spacing={0}>
        <Text>Billed amount</Text>
        <Text color="gray.500">${(amount / 100).toFixed(2)}</Text>
      </Stack>

      <Button size={"lg"} py={7} onClick={onSelect}>
        <Text fontSize={"sm"}>Start trial</Text>
      </Button>
    </Stack>
  );
}

function PlanSkipTrial({
  plan,
  onSelect,
  isLoading,
}: {
  plan: TrialPricingPlan;
  onSelect: () => void;
  isLoading: boolean;
}) {
  let amount = plan.recurring.unit_amount;
  let discount = 0;

  if (plan.recurring.coupon) {
    const newAmount = plan.recurring.unit_amount - plan.recurring.coupon.amount_off;

    discount = 100 - (newAmount / amount) * 100;
    amount = newAmount;
  }

  return (
    <Stack
      border={"2px solid"}
      borderColor={"yellow.400"}
      borderRadius={"xl"}
      spacing={0}
      fontSize={"sm"}
      overflow={"hidden"}
    >
      <Box backgroundColor={"yellow.400"} py={3}>
        <Text textAlign={"center"} color={"yellow.900"} fontWeight={"bold"}>
          BEST VALUE 🎉
        </Text>
      </Box>

      <Stack p={3} pt={5} spacing={3}>
        <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
          ${((amount / 7 - 1) / 100).toFixed(2)} / day
        </Text>

        <Stack spacing={0}>
          <Text>Billing period</Text>
          <Text color="gray.500">Every week</Text>
        </Stack>

        <Stack spacing={0}>
          <Text>Billed amount</Text>
          <Text color="gray.500">${(amount / 100).toFixed(2)}</Text>
        </Stack>

        <Button isLoading={isLoading} size={"lg"} py={7} colorScheme="yellow" onClick={onSelect}>
          <Text fontSize="sm">
            Skip Trial <br /> (Save {discount.toFixed(0)}%)
          </Text>
        </Button>
      </Stack>
    </Stack>
  );
}

function usePayment(plan: TrialPricingPlan): [RequestType, () => Promise<void>] {
  const { userProfile } = useGlobalState2();
  const stripe = useStripe();

  const [request, setRequest] = React.useState<RequestType>({
    state: "initial",
  });

  async function submit() {
    if (!userProfile || !stripe) {
      console.warn("data missing for subscription setup");
      return;
    }

    if (request.state !== "initial") {
      return;
    }

    setRequest({ state: "loading" });

    try {
      const subscription = await eden("/payments/updateSubscription", {
        method: "POST",
        body: {
          userID: userProfile.id,
          priceID: plan.recurring.priceID,
          couponID: plan.recurring.coupon?.id,
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

      const urlParams = parseURLParams<{
        pricePaid: number;
        currency: string;
        paymentType: string;
        planID: string;
      }>(window.location.href);

      trackPosthogPurchaseEvent({
        name: "purchase",
        properties: {
          currency: urlParams.currency ?? undefined,
          value: plan.recurring.unit_amount / 100,
          paymentType: urlParams.paymentType ?? undefined,
          contentType: "subscription",
          contentIDs: [plan.recurring.priceID],
        },
      });

      setRequest({ state: "ok" });
    } catch (err) {
      console.error(err);
      setRequest({ state: "error", error: String(err) });
    }
  }

  return [request, submit];
}
