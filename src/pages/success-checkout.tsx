import { Button, Container, Stack, Text } from "@chakra-ui/react";
import { useGlobalState2 } from "@components/root/RootWrapper";
import { gaTrackPaidTrialPurchaseConversion, trackEvent, trackPixel } from "@utils/tracking";
import * as React from "react";

export function createSuccessCheckoutURL(
  paymentType: "express" | "card",
  pricePaid: number,
  currency: string,
  planID: string
) {
  // this is a redirect url after the successful payment
  const redirectUrl = new URL(window.location.href);
  redirectUrl.searchParams.delete("checkout");
  redirectUrl.pathname = "/success-checkout";

  redirectUrl.searchParams.set("paymentType", paymentType);
  redirectUrl.searchParams.set("pricePaid", pricePaid.toString());
  redirectUrl.searchParams.set("currency", currency);
  redirectUrl.searchParams.set("planID", planID);

  return redirectUrl;
}

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
    trackSuccessPayment(urlParts);
  }, []);

  function redirectToApp(input: { userID: string }) {
    const params = new URLSearchParams();
    params.append("userID", input.userID);
    const url = `${process.env.GATSBY_WEBAPP_URL}/astrologer?${params.toString()}`;
    location.href = url;
  }

  function trackSuccessPayment(urlParts: UrlParts) {
    const pricePaid = (urlParts.pricePaid ?? 0) / 100;

    trackPixel("Purchase", {
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
  }

  return (
    <Container py={10}>
      <Stack textAlign={"center"} spacing={6}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Thank your for your purchase
        </Text>
        <Text>
          The instructions on how to access your reading will be sent to your email shortly
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => redirectToApp({ userID: globalState.userProfile!.id })}
        >
          Go to predictions
        </Button>
      </Stack>
    </Container>
  );
}
