import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";
import { navigate } from "gatsby";
import { createInternalURL, parseURLParams } from "@components/onboarding/utils";
import { Time, TimePicker } from "@components/TimePicker";
import { eden } from "@utils/coreApi";
import React from "react";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { createTime } from "@utils/dates";

export default function Page() {
  const { userProfile } = useGlobalState2();
  const [time, setTime] = React.useState<Time | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function submit() {
    if (!userProfile || !time) {
      return;
    }

    const timeTransformed = createTime(time);

    try {
      setIsLoading(true);

      await eden(`/updateUserProfile`, {
        method: "POST",
        body: {
          id: userProfile.id,
          dob_local_hour: timeTransformed.time24.hour,
          dob_local_minute: timeTransformed.time24.minute,
        },
      });

      setIsLoading(false);

      const urlParams = parseURLParams<{
        currency: string;
        paymentType: string;
      }>(window.location.href);

      const url = createInternalURL("/face-reading/success-checkout/onboarding-reports-location", {
        paymentType: urlParams.paymentType,
        currency: urlParams.currency,
      });

      navigate(url);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={1} />

          <Text mt={6} fontSize={"xl"} fontWeight={"bold"}>
            To help us prepare your report, could you please let us know your time of birth?
          </Text>

          <TimePicker onSelect={(res) => setTime(res)} />

          <Button
            size={"lg"}
            py={7}
            colorScheme="brand"
            flexGrow={1}
            mt={2}
            onClick={submit}
            isLoading={isLoading}
          >
            <Text fontSize={["sm", "md"]}>Continue</Text>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
