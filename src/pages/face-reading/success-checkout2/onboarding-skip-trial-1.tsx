import { Box, Button, Container, Grid, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";
import { navigate } from "gatsby";
import { SpecialOfferBadge } from "@components/onboarding/SpecialOfferBadge";
import React from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { eden } from "@utils/coreApi";
import { OneTimeFeePrice } from "@astropal/api-client/dist/src/controllers/pricing";
import { sessionCache } from "src/sessionCache";
import {
  gaTrackPaidTrialPurchaseConversion,
  trackPixelEvent,
  trackPosthogPurchaseEvent,
} from "@utils/tracking";
import { createInternalURL, useURLParams } from "@components/onboarding/utils";

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

export default function OnboardingSkipTrial1() {
  const { pricingPlans } = useGlobalState2();
  const monthlyPlan = pricingPlans[0];
  const [request, submit] = usePayment(monthlyPlan);

  const urlParams = useURLParams<{
    pricePaid: number;
    currency: string;
    paymentType: string;
    planID: string;
  }>();

  React.useEffect(() => {
    const hasPurchased = sessionCache.hasPurchased();

    if (!hasPurchased) {
      const pricePaid = (urlParams.pricePaid ?? 0) / 100;

      trackPixelEvent("Purchase", {
        currency: urlParams.currency,
        value: pricePaid,
        paymentType: urlParams.paymentType,
        planID: urlParams.planID,
      });

      gaTrackPaidTrialPurchaseConversion({
        value: pricePaid,
        currency: urlParams.currency ?? "",
      });

      trackPosthogPurchaseEvent({
        name: "purchase",
        properties: {
          currency: urlParams.currency ?? undefined,
          value: pricePaid,
          paymentType: urlParams.paymentType ?? undefined,
          contentType: "trial",
          contentIDs: [urlParams.planID ?? ""],
        },
      });

      // There's a piece of code in the gatsby-browser file that tracks routes of the `face-reading` funnel
      // and automatically redirects users if it detects that they have purchased the product.
      // In this case, the purchase status is set to true before that route check occurs.
      // We want the opposite behavior to avoid automatic redirection when a user visits this page for the first time after a successful purchase.
      setTimeout(sessionCache.registerPurchase, 0);
    }
  }, []);

  function handleSkip() {
    const url = createInternalURL("/face-reading/success-checkout/onboarding-skip-trial-2", {
      paymentType: urlParams.paymentType,
      currency: urlParams.currency,
    });

    navigate(url);
  }

  async function handlePurchase() {
    await submit();
    const url = createInternalURL("/face-reading/success-checkout/onboarding-guides-1", {
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
          <SpecialOfferSteps activeStepIdx={1} />

          <Stack spacing={5}>
            <SpecialOfferBadge icon="🥰" title="Thank you!" text="Your order was successful!" />

            <Text fontSize={"xl"} fontWeight={"bold"}>
              Not planning on looking back?
            </Text>

            <Grid gridTemplateColumns={"1fr 1fr"} gap={2} alignItems={"flex-end"}>
              <Card onSelect={handleSkip} />

              {monthlyPlan && (
                <CardSpecial onSelect={handlePurchase} isLoading={request.state === "loading"} />
              )}
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function Card({ onSelect }: { onSelect: () => void }) {
  return (
    <Stack
      p={3}
      pt={5}
      border={"2px solid"}
      borderColor={"gray.300"}
      borderRadius={"xl"}
      spacing={3}
      fontSize={["sm", "md"]}
    >
      <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
        $19 per week
      </Text>

      <Stack spacing={0}>
        <Text>Billing period</Text>
        <Text color="gray.500">Every week</Text>
      </Stack>

      <Stack spacing={0}>
        <Text>Billed amount</Text>
        <Text color="gray.500">$19</Text>
      </Stack>

      <Stack spacing={0}>
        <Text>Billed in 4 weeks</Text>
        <Text color="gray.500">$76</Text>
      </Stack>

      <Button size={"lg"} py={7} onClick={onSelect}>
        <Text fontSize={["sm", "md"]}>Start trial</Text>
      </Button>
    </Stack>
  );
}

function CardSpecial({ onSelect, isLoading }: { onSelect: () => void; isLoading: boolean }) {
  return (
    <Stack
      border={"2px solid"}
      borderColor={"brand.500"}
      borderRadius={"xl"}
      spacing={0}
      fontSize={["sm", "md"]}
      overflow={"hidden"}
    >
      <Box backgroundColor={"brand.500"} py={3}>
        <Text textAlign={"center"} color={"white"} fontWeight={"semibold"}>
          BEST VALUE 🎉
        </Text>
      </Box>

      <Stack p={3} pt={5} spacing={3}>
        <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
          $2.46 per day
        </Text>

        <Stack spacing={0}>
          <Text>Billing period</Text>
          <Text color="gray.500">Every 4 weeks</Text>
        </Stack>

        <Stack spacing={0}>
          <Text>Billed amount</Text>
          <Text color="gray.500">$69</Text>
        </Stack>

        <Stack spacing={0}>
          <Text>Billed in 4 weeks</Text>
          <Text color="gray.500">$69</Text>
        </Stack>

        <Button isLoading={isLoading} size={"lg"} py={7} colorScheme="brand" onClick={onSelect}>
          <Text fontSize={["sm", "md"]}>
            Skip trial <br />
            and accept offer
          </Text>
        </Button>
      </Stack>
    </Stack>
  );
}

function usePayment(plan?: OneTimeFeePrice): [RequestType, () => Promise<void>] {
  const { userProfile } = useGlobalState2();
  const stripe = useStripe();

  const urlParams = useURLParams<{
    pricePaid: number;
    currency: string;
    paymentType: string;
    planID: string;
  }>();

  const [request, setRequest] = React.useState<RequestType>({
    state: "initial",
  });

  async function submit() {
    if (!userProfile || !plan || !stripe) {
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
          priceID: plan.priceID,
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

      trackPosthogPurchaseEvent({
        name: "purchase",
        properties: {
          currency: urlParams.currency ?? undefined,
          value: plan.unit_amount / 100,
          paymentType: urlParams.paymentType ?? undefined,
          contentType: "subscription",
          contentIDs: [plan.priceID],
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
