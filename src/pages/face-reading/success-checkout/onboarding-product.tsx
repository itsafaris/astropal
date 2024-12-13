import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import {
  OnboardingNotification,
  OnboardingLayout,
  useOnboardingRouter,
} from "@components/onboarding";
import { storage } from "@components/wrappers/successCheckoutStorage";
import React from "react";

export default function OnboardingProduct() {
  const { navigateToNextPage } = useOnboardingRouter();

  React.useEffect(() => {
    storage.setHasFinishedOnboarding();
  }, []);

  return (
    <OnboardingLayout activeStepIdx={3}>
      <Stack textAlign={"center"} spacing={6}>
        <OnboardingNotification
          icon="🎉"
          title="Congrats!"
          text="Simply follow these steps to access your account"
        />

        <Text fontSize={"xl"} fontWeight={"bold"}>
          Simply follow these steps to access your account
        </Text>

        <Stack textAlign={"left"} fontSize={"sm"} spacing={5}>
          <Flex alignItems={"flex-start"} gap={2}>
            <Text fontSize={"lg"}>•</Text>
            <Text>
              Press the "Access Account" button below, and you will be redirected to your account
              page. If you see a login screen, simply enter your email and proceed further.
            </Text>
          </Flex>

          <Flex alignItems={"flex-start"} gap={2}>
            <Text fontSize={"lg"}>•</Text>
            <Text>
              If you purchased reports, they will be sent to your email address shortly. If you
              don't see them in your inbox, please check your spam folder.
            </Text>
          </Flex>
        </Stack>

        <Button
          size={"lg"}
          py={7}
          colorScheme="brand"
          flexGrow={1}
          mt={2}
          onClick={navigateToNextPage}
        >
          <Text fontSize={["sm", "md"]}>Access Account</Text>
        </Button>
      </Stack>
    </OnboardingLayout>
  );
}
