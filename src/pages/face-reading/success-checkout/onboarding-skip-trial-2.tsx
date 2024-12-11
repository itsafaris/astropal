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
    <OnboardingLayout activeStepIdx={2}>
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
