import { Button, Stack, Text } from "@chakra-ui/react";
import { Time, TimePicker } from "@components/TimePicker";
import { eden } from "@utils/coreApi";
import React from "react";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { createTime } from "@utils/dates";
import { useOnboardingRouter } from "@components/onboarding/useOnboardingRouter";
import { OnboardingLayout, RequestType, SuccessfulPurchaseView } from "@components/onboarding";
import { sessionCache } from "src/sessionCache";

export default function Page() {
  const { navigateToNextPage } = useOnboardingRouter();
  const [time, setTime] = React.useState<Time | null>(null);
  const { submit, request } = useSubmit(time);
  const [hasPurchased, setHasPurchased] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasPurchased(sessionCache.getReport().status === "purchase-finalized");
  }, []);

  return (
    <OnboardingLayout activeStepIdx={2}>
      {hasPurchased ? (
        <SuccessfulPurchaseView
          title="🥰 You have successfully purchased the report"
          onContinue={navigateToNextPage}
        />
      ) : (
        <Stack spacing={6}>
          <Text mt={6} fontSize={"xl"} fontWeight={"bold"}>
            To help us prepare your report, could you please let us know your time of birth?
          </Text>

          <TimePicker onSelect={setTime} />

          <Button
            size={"lg"}
            py={7}
            colorScheme="brand"
            flexGrow={1}
            mt={2}
            onClick={submit}
            isLoading={request.state === "loading"}
          >
            <Text fontSize={["sm", "md"]}>Continue</Text>
          </Button>
        </Stack>
      )}
    </OnboardingLayout>
  );
}

function useSubmit(time: Time | null) {
  const { userProfile } = useGlobalState2();
  const { navigateToNextPage } = useOnboardingRouter();

  const [request, setRequest] = React.useState<RequestType>({
    state: "initial",
  });

  async function submit() {
    try {
      if (!userProfile || !time) {
        throw new Error("data is missing");
      }

      setRequest({ state: "loading" });

      const timeTransformed = createTime(time);
      const res = await eden(`/updateUserProfile`, {
        method: "POST",
        body: {
          id: userProfile.id,
          dob_local_hour: timeTransformed.time24.hour,
          dob_local_minute: timeTransformed.time24.minute,
        },
      });

      if (res.error) {
        throw new Error("failed to update user profile");
      }

      setRequest({ state: "ok" });

      navigateToNextPage();
    } catch (err) {
      const msg = `Report time: ${String(err)}`;
      console.error(msg);
      setRequest({ state: "error", error: msg });
    }
  }

  return { request, submit };
}
