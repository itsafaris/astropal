import { Button, Stack, Text } from "@chakra-ui/react";
import {
  RequestType,
  OnboardingLayout,
  SuccessfulPurchaseView,
  useOnboardingRouter,
} from "@components/onboarding";
import { LocationPicker, LocationValue } from "@components/LocationPicker";
import React from "react";
import { eden } from "@utils/coreApi";
import { useRootState } from "@components/wrappers/RootWrapper";
import { trackPosthogPurchaseEvent } from "@utils/tracking";
import { useStripe } from "@stripe/react-stripe-js";
import { storage } from "@components/wrappers/successCheckoutStorage";

export default function Page() {
  const { navigateToNextPage } = useOnboardingRouter();
  const [location, setLocation] = React.useState<LocationValue | null>(null);
  const { submit, request } = useSubmit(location);
  const [hasPurchased, setHasPurchased] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasPurchased(storage.getReport().status === "purchase-finalized");
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
            Could you please share your exact place of birth?
          </Text>

          <LocationPicker onSelect={setLocation} />

          <Button
            size={"lg"}
            py={7}
            colorScheme="brand"
            flexGrow={1}
            mt={2}
            onClick={() => {
              submit();
              navigateToNextPage();
            }}
            disabled={!location}
            isLoading={request.state === "loading"}
          >
            <Text fontSize={["sm", "md"]}>Continue</Text>
          </Button>
        </Stack>
      )}
    </OnboardingLayout>
  );
}

function useSubmit(location: LocationValue | null) {
  const stripe = useStripe();
  const { reports } = useRootState();

  const [request, setRequest] = React.useState<RequestType>({
    state: "initial",
  });

  async function submit() {
    try {
      const { userID, currency, paymentType } = storage.getConversionDetails();
      const cachedReport = storage.getReport();
      if (cachedReport.status !== "purchase-started") {
        throw new Error("report status is incorrect");
      }

      const report = reports.find((it) => it.productID === cachedReport.productID);
      if (!report) {
        throw new Error("report is missing");
      }

      if (!userID || !location || !stripe) {
        throw new Error("data is missing");
      }

      setRequest({ state: "loading" });

      const res = await eden(`/updateUserProfile`, {
        method: "POST",
        body: {
          id: userID,
          birth_place_place_id: location.placeID,
          birth_place_formatted_text: location.formattedText,
          birth_place_lat: location.lat,
          birth_place_lng: location.long,
        },
      });

      if (res.error) {
        throw new Error("failed to update user profile");
      }

      const payment = await eden("/payments/createOneTimePayment", {
        method: "POST",
        body: {
          userID: userID,
          productID: report.productID,
        },
      });

      if (payment.error) {
        throw new Error("failed to create payment");
      }

      storage.setReport({ status: "purchase-finalized", productID: report.productID });

      trackPosthogPurchaseEvent({
        name: "purchase",
        properties: {
          currency,
          value: report.unit_amount / 100,
          paymentType,
          contentType: "one-time",
          contentIDs: [report.productID],
        },
      });

      setRequest({ state: "ok" });
    } catch (err) {
      const msg = `Report location: ${String(err)}`;
      console.error(msg);
      setRequest({ state: "error", error: msg });
    }
  }

  return { request, submit };
}
