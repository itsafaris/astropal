import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  gaTrackPaidTrialPurchaseConversion,
  trackPixelEvent,
  trackPosthogPurchaseEvent,
} from "@utils/tracking";
import {
  OnboardingLayout,
  parseCheckoutRedirecURL,
  OnboardingNotification,
  useOnboardingRouter,
} from "@components/onboarding";
import { storage } from "@components/wrappers/successCheckoutStorage";

export default function Page() {
  const { navigateToNextPage } = useOnboardingRouter();

  React.useEffect(() => {
    if (!storage.hasConverted()) {
      const { pricePaid, currency, paymentType, planID, userID } = parseCheckoutRedirecURL<{
        pricePaid: number;
        currency: string;
        paymentType: string;
        planID: string;
        userID: string;
      }>(window.location.href);

      const value = pricePaid ? pricePaid / 100 : 0;

      trackPixelEvent("Purchase", {
        currency,
        value,
        paymentType,
        planID,
      });

      gaTrackPaidTrialPurchaseConversion({
        value,
        currency: currency ?? "",
      });

      trackPosthogPurchaseEvent({
        name: "purchase",
        properties: {
          currency,
          value,
          paymentType,
          contentType: "trial",
          contentIDs: [planID ?? ""],
        },
      });

      // There's a piece of code in the gatsby-browser file that tracks routes of the `face-reading` funnel
      // and automatically redirects users if it detects that they have purchased the product.
      // In this case, the purchase status is set to true before that route check occurs.
      // We want the opposite behavior to avoid automatic redirection when a user visits this page for the first time after a successful purchase.
      setTimeout(() => {
        storage.setHasConverted();
        storage.setConversionDetails({
          currency,
          paymentType,
          planID,
          value,
          userID,
        });
      }, 0);
    }
  }, []);

  return (
    <OnboardingLayout activeStepIdx={0}>
      <Stack textAlign={"center"} spacing={6}>
        <OnboardingNotification icon="🥰" title="Thank you!" text="Your order was successful!" />

        <Text fontSize={"xl"} fontWeight={"bold"}>
          Welcome to The Intuvist
        </Text>

        <Button size={"lg"} py={7} colorScheme="brand" onClick={navigateToNextPage}>
          <Text fontSize={["sm", "md"]}>Continue</Text>
        </Button>
      </Stack>
    </OnboardingLayout>
  );
}
