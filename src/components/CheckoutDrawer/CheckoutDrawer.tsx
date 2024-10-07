import * as React from "react";
import { Container, Slide } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { siteConfig } from "src/conf";
import { useLocation } from "@gatsbyjs/reach-router";
import { useGlobalState2 } from "@components/root/RootWrapper";

import "../../styles/global.css";

const stripe = loadStripe(siteConfig.stripePublicKey);

export function CheckoutDrawer() {
  const location = useLocation();
  const { selectedPricingPlan, trialPricingPlan } = useGlobalState2();
  const plan = trialPricingPlan?.oneTimeFee.find((p) => p.priceID === selectedPricingPlan);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (location.pathname.includes("/checkout")) {
      setIsDrawerOpen(true);
    }

    return () => {
      setIsDrawerOpen(false);
    };
  }, [location]);

  if (!plan) {
    return null;
  }

  return (
    <Elements
      stripe={stripe}
      options={{
        mode: "subscription",
        amount: plan.unit_amount,
        currency: plan.currency,
        appearance: {
          theme: "stripe",
          variables: {
            tabLogoColor: "green",
            tabLogoSelectedColor: "red",
          },
        },
      }}
    >
      <Slide direction="bottom" in={isDrawerOpen} style={{ zIndex: 10, backgroundColor: "red" }}>
        <Container>
          <CheckoutForm plan={plan} />
        </Container>
      </Slide>
    </Elements>
  );
}
