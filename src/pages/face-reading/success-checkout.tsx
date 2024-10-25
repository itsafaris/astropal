import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { sessionCache } from "src/sessionCache";
import { gaTrackPaidTrialPurchaseConversion, trackEvent, trackPixelEvent } from "@utils/tracking";
import * as React from "react";
import { createProductURL } from "src/utils/urls";

type UrlParts = ReturnType<typeof parseRedirectURL>;

function parseRedirectURL() {
  const redirectUrl = new URL(window.location.href);
  const paymentType = redirectUrl.searchParams.get("paymentType");
  const pricePaidStr = redirectUrl.searchParams.get("pricePaid");
  const pricePaid = pricePaidStr ? parseFloat(pricePaidStr) : null;
  const currency = redirectUrl.searchParams.get("currency");
  const planID = redirectUrl.searchParams.get("planID");

  return {
    paymentType,
    pricePaid,
    currency,
    planID,
  };
}

export default function SuccessCheckoutPage() {
  const globalState = useGlobalState2();

  React.useEffect(() => {
    const urlParts = parseRedirectURL();
    const hasPurchased = sessionCache.hasPurchased();

    if (!hasPurchased) {
      trackSuccessPayment(urlParts);
    }
  }, []);

  function redirectToApp(input: { userID: string }) {
    const params = new URLSearchParams();
    params.append("userID", input.userID);
    location.href = createProductURL(params.toString());
  }

  function trackSuccessPayment(urlParts: UrlParts) {
    const pricePaid = (urlParts.pricePaid ?? 0) / 100;

    trackPixelEvent("Purchase", {
      currency: urlParts.currency,
      value: pricePaid,
      paymentType: urlParts.paymentType,
      planID: urlParts.planID,
    });

    gaTrackPaidTrialPurchaseConversion({
      value: pricePaid,
      currency: urlParts.currency ?? "",
    });

    trackEvent({
      name: "purchase",
      properties: {
        currency: urlParts.currency,
        value: pricePaid,
        paymentType: urlParts.paymentType,
        planID: urlParts.planID,
      },
    });

    // There's a piece of code in the gatsby-browser file that tracks routes of the `face-reading` funnel
    // and automatically redirects users if it detects that they have purchased the product.
    // In this case, the purchase status is set to true before that route check occurs.
    // We want the opposite behavior to avoid automatic redirection when a user visits this page for the first time after a successful purchase.
    setTimeout(sessionCache.registerPurchase, 0);
  }

  return (
    <Box>
      <TopNavigation />

      <Container py={10}>
        <Stack textAlign={"center"} spacing={6}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Thank your for your purchase
          </Text>
          <Text>
            The instructions on how to access your reading will be sent to your email shortly
          </Text>
          <Button
            colorScheme="brand"
            onClick={() => redirectToApp({ userID: globalState.userProfile!.id })}
          >
            Go to predictions
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
