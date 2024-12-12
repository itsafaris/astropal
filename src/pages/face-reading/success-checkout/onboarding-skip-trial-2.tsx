import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { LuCalendarCheck2 } from "react-icons/lu";
import { GiSelfLove } from "react-icons/gi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import React from "react";
import { TrialPricingPlan } from "@utils/coreApi";
import { sessionCache } from "src/sessionCache";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import {
  OnboardingLayout,
  SuccessfulPurchaseView,
  useOnboardingRouter,
  usePurchaseSubscription,
} from "@components/onboarding";

export default function Page() {
  const { trialPricingPlan } = useGlobalState2();

  if (!trialPricingPlan) {
    console.error("Skip trial 2: trial pricing plan is missing");
    return null;
  }

  return <PageContent plan={trialPricingPlan} />;
}

function PageContent({ plan }: { plan: TrialPricingPlan }) {
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
      <Stack>
        <Text fontSize={"2xl"} fontWeight={"bold"} color="brand.800">
          Are You Sure?
        </Text>

        <Text fontSize={"sm"} mb={4}>
          Let Our Expert Astrologer Guide You 24/7 On Your Journey to Life's Answers.
        </Text>

        <Text fontSize={"lg"} fontWeight={"semibold"}>
          What you get:
        </Text>
      </Stack>

      <Stack spacing={4}>
        <Stack mx="auto">
          <Flex alignItems={"center"} gap={2}>
            <Icon
              as={FaRegFaceSmileBeam}
              color={"brand.800"}
              backgroundColor={"brand.200"}
              boxSize={9}
              p={2}
              borderRadius={"md"}
            />
            <Text fontWeight={"normal"} color={"brand.600"}>
              Unlimited face readings
            </Text>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <Icon
              as={MdOutlineTipsAndUpdates}
              color={"brand.800"}
              backgroundColor={"brand.200"}
              boxSize={9}
              p={2}
              borderRadius={"md"}
            />
            <Text fontWeight={"normal"} color={"brand.600"}>
              Unlimited chats with astrologer
            </Text>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <Icon
              as={GiSelfLove}
              color={"brand.800"}
              backgroundColor={"brand.200"}
              boxSize={9}
              p={2}
              borderRadius={"md"}
            />
            <Text fontWeight={"normal"} color={"brand.600"}>
              Cosmic relationships tips
            </Text>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <Icon
              as={LuCalendarCheck2}
              color={"brand.800"}
              backgroundColor={"brand.200"}
              boxSize={9}
              p={2}
              borderRadius={"md"}
            />
            <Text fontWeight={"normal"} color={"brand.600"}>
              Daily horoscopes
            </Text>
          </Flex>
        </Stack>
      </Stack>

      <Stack spacing={3}>
        <Box height={"2px"} width={"full"} backgroundColor={"gray.200"} />

        <Text fontSize={"sm"} color="orange.500" textAlign={"center"}>
          Are you sure you don't want to save $240 per year?
        </Text>

        <Flex mx={"auto"} gap={2} alignItems={"center"} width={"full"}>
          <Button size={"lg"} py={7} onClick={onStartTrial}>
            <Text fontSize={["md", "md"]} fontWeight={"normal"}>
              Skip
            </Text>
          </Button>

          <Button
            size={"lg"}
            py={7}
            px={20}
            colorScheme="brand"
            flexGrow={1}
            onClick={onStartSubscription}
            isLoading={isPaymentLoading}
          >
            <Text fontSize={["md", "md"]}>Accept This Offer</Text>
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
}
