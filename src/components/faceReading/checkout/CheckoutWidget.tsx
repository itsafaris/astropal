import * as React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useGlobalState2 } from "@components/root/RootWrapper";

import { loadStripe } from "@stripe/stripe-js";
import { siteConfig } from "src/conf";
import { Elements } from "@stripe/react-stripe-js";
import { eden } from "@utils/coreApi";
import { RequestType } from "./types";
import { LoadingView } from "./components";
import { CheckoutForm } from "./CheckoutForm";

const stripe = loadStripe(siteConfig.stripePublicKey);

export function CheckoutWidget() {
  const [paymentIntent, setPaymentIntent] = React.useState<RequestType>({
    state: "initial",
  });
  const globalState = useGlobalState2();

  React.useEffect(() => {
    initPaymentIntent();
  }, [globalState]);

  async function initPaymentIntent() {
    const { userProfile, selectedPricingPlan, trialPricingPlan } = globalState;
    if (!userProfile || !selectedPricingPlan || !trialPricingPlan) {
      console.warn("data missing for subscription setup");
      return;
    }

    if (paymentIntent.state !== "initial") {
      return;
    }

    try {
      setPaymentIntent({ state: "loading" });

      const res = await eden("/payments/createSubscription", {
        method: "POST",
        body: {
          userID: userProfile.id,
          priceID: trialPricingPlan.recurring.priceID,
          oneTimeFeePriceID: selectedPricingPlan,
        },
      });

      if (res.error) {
        setPaymentIntent({
          state: "error",
          error: res.error.message,
        });
        return;
      }

      if (!res.data) {
        setPaymentIntent({
          state: "error",
          error: "missing payment intent data",
        });
        return;
      }

      // Empty client secret means that overall price of the cart is very close to 0.
      // In that case subscription becomes automatically activated.
      // GOOD FOR TESTING!
      if (!res.data.client_secret) {
        console.log("no client secret, payment has been paid");
        return;
      }

      setPaymentIntent({
        state: "ok",
        data: {
          ...res.data,
          clientSecret: res.data.client_secret,
        },
      });
    } catch (err) {
      console.error(err);
      setPaymentIntent({
        state: "error",
        error: String(err),
      });
    }
  }

  return (
    <Box>
      {paymentIntent.state === "error" && (
        <Box color="black">
          <Text fontWeight={"semibold"}>Error</Text>
          <Text>{paymentIntent.error}</Text>
        </Box>
      )}

      {paymentIntent.state === "loading" && <LoadingView text="Loading secure payment form..." />}

      {paymentIntent.state === "ok" && (
        <Elements
          stripe={stripe}
          options={{
            clientSecret: paymentIntent.data.clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                tabLogoColor: "green",
                tabLogoSelectedColor: "red",
              },
            },
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  );
}
