import { Box, Button, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

import { LuCalendarCheck2 } from "react-icons/lu";
import { GiSelfLove } from "react-icons/gi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";
import { navigate } from "gatsby";
import { SpecialOfferBadge } from "@components/onboarding/SpecialOfferBadge";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { useStripe } from "@stripe/react-stripe-js";
import { createInternalURL, parseURLParams } from "@components/onboarding/utils";
import React from "react";
import { eden, TrialPricingPlan } from "@utils/coreApi";
import { trackPosthogPurchaseEvent } from "@utils/tracking";
import { sessionCache } from "src/sessionCache";
import { FaRegFaceSmileBeam } from "react-icons/fa6";

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

  async function handleStartSubscription() {
    await submit();

    sessionCache.setPurchasedSubscription();

    navigateToNextStep();
  }

  function handleStartTrial() {
    navigateToNextStep();
  }

  function navigateToNextStep() {
    const urlParams = parseURLParams<{
      currency: string;
      paymentType: string;
    }>(window.location.href);

    const url = createInternalURL("/face-reading/success-checkout/onboarding-reports-1", {
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

          {hasPurchasedSubscription ? (
            <StepCompletedView onContinue={navigateToNextStep} />
          ) : (
            <StepIncompletedView
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
  onStartTrial,
  onStartSubscription,
  isPaymentLoading,
}: {
  onStartTrial: () => void;
  onStartSubscription: () => void;
  isPaymentLoading: boolean;
}) {
  return (
    <Stack spacing={6}>
      <SpecialOfferBadge
        icon="📣"
        title="Caution!"
        text="To prevent double charges please don't close the page and don't go back."
      />

      <Text fontSize={"xl"} fontWeight={"bold"}>
        Are you sure?
      </Text>

      <Text lineHeight={1.3} fontSize={"sm"}>
        Let our expert astrologer and face reader guide you 24/7 on your journey to life's answers.
      </Text>

      <Stack spacing={4}>
        <Stack mx="auto">
          <Flex alignItems={"center"} gap={2}>
            <Icon
              as={FaRegFaceSmileBeam}
              color={"white"}
              backgroundColor={"brand.400"}
              boxSize={9}
              p={2}
              borderRadius={"md"}
            />
            <Text fontWeight={"semibold"} color={"brand.600"}>
              Get unlimited face readings
            </Text>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <Icon
              as={GiSelfLove}
              color={"white"}
              backgroundColor={"brand.400"}
              boxSize={9}
              p={2}
              borderRadius={"md"}
            />
            <Text fontWeight={"semibold"} color={"brand.600"}>
              Get daily compatibility readings
            </Text>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <Icon
              as={MdOutlineTipsAndUpdates}
              color={"white"}
              backgroundColor={"brand.400"}
              boxSize={9}
              p={2}
              borderRadius={"md"}
            />
            <Text fontWeight={"semibold"} color={"brand.600"}>
              Get cosmic relationships tips
            </Text>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <Icon
              as={LuCalendarCheck2}
              color={"white"}
              backgroundColor={"brand.400"}
              boxSize={9}
              p={2}
              borderRadius={"md"}
            />
            <Text fontWeight={"semibold"} color={"brand.600"}>
              Get daily horoscopes
            </Text>
          </Flex>
        </Stack>
      </Stack>

      <Stack spacing={3}>
        <Box height={"2px"} width={"full"} backgroundColor={"gray.200"} />

        <Flex mx={"auto"} gap={2} alignItems={"center"} width={"full"}>
          <Button size={"lg"} py={7} onClick={onStartTrial}>
            <Text fontSize={["sm", "md"]}>Skip</Text>
          </Button>

          <Button
            size={"lg"}
            py={7}
            px={20}
            colorScheme="yellow"
            flexGrow={1}
            onClick={onStartSubscription}
            isLoading={isPaymentLoading}
          >
            <Text fontSize={["sm", "md"]}>Accept This Offer (Save $240/year)</Text>
          </Button>
        </Flex>
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
