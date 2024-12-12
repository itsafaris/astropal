import { Box, Button, Grid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { TrialPricingPlan } from "@utils/coreApi";
import { sessionCache } from "src/sessionCache";
import {
  OnboardingLayout,
  SuccessfulPurchaseView,
  useOnboardingRouter,
  usePurchaseSubscription,
} from "@components/onboarding";

export default function Page() {
  const { trialPricingPlan } = useGlobalState2();

  if (!trialPricingPlan) {
    console.error("Skip trial 1: trial pricing plan is missing");
    return null;
  }

  return <PageContent plan={trialPricingPlan} />;
}

export function PageContent({ plan }: { plan: TrialPricingPlan }) {
  const [request, submit] = usePurchaseSubscription(plan);
  const { navigateToNextPage } = useOnboardingRouter();
  const [hasPurchased, setHasPurchased] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasPurchased(sessionCache.getSubscription().status === "purchase-finalized");
  }, []);

  return (
    <OnboardingLayout activeStepIdx={1}>
      {hasPurchased ? (
        <SuccessfulPurchaseView
          title="🥰 You have successfully purchased the subscription"
          onContinue={navigateToNextPage}
        />
      ) : (
        <Content
          plan={plan}
          onStartTrial={navigateToNextPage}
          onStartSubscription={async () => {
            await submit();
            sessionCache.setSubscription({ status: "purchase-finalized" });
            navigateToNextPage();
          }}
          isPaymentLoading={request.state === "loading"}
        />
      )}
    </OnboardingLayout>
  );
}

function Content({
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
      <Text fontSize={["md", "lg"]} fontWeight={"bold"}>
        ${(amount / 100).toFixed(0)} per week
      </Text>

      <Stack spacing={0}>
        <Text>• Billing period:</Text>
        <Text color="gray.500">Every week</Text>
      </Stack>

      <Stack spacing={0}>
        <Text>• Billed amount:</Text>
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
  const amountOld = plan.recurring.unit_amount;
  let amountNew = amountOld;

  if (plan.recurring.coupon) {
    amountNew = amountOld - plan.recurring.coupon.amount_off;
  }

  return (
    <Stack
      border={"2px solid"}
      borderColor={"brand.500"}
      borderRadius={"xl"}
      spacing={0}
      fontSize={"sm"}
      overflow={"hidden"}
    >
      <Box backgroundColor={"brand.500"} py={3}>
        <Text textAlign={"center"} color={"white"} fontWeight={"bold"}>
          BEST VALUE 🎉
        </Text>
      </Box>

      <Stack p={3} pt={5} spacing={3}>
        <Stack alignItems={"center"} spacing={0}>
          <Text fontSize={["sm"]} color={"brand.600"} textDecoration={"line-through"}>
            ${(amountOld / 7 / 100).toFixed(2)} per day
          </Text>

          <Text fontSize={["md", "lg"]} fontWeight={"bold"}>
            ${((amountNew / 7 - 1) / 100).toFixed(2)} per day
          </Text>
        </Stack>

        <Stack spacing={0}>
          <Text>• Billing period:</Text>
          <Text color="gray.500">Every week</Text>
        </Stack>

        <Stack spacing={0}>
          <Text>• Billed amount:</Text>
          <Text color="gray.500">${(amountNew / 100).toFixed(2)}</Text>
        </Stack>

        <Button isLoading={isLoading} size={"lg"} py={7} colorScheme="brand" onClick={onSelect}>
          <Text fontSize="sm">Skip Trial</Text>
        </Button>
      </Stack>
    </Stack>
  );
}
