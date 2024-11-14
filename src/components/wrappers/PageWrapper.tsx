import * as React from "react";

import { CheckoutDrawer } from "@components/CheckoutDrawer";
import { trackCustomPixelEvent } from "@utils/tracking";
import { useLocation } from "@gatsbyjs/reach-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { siteConfig } from "src/conf";
import { useGlobalState2 } from "./RootWrapper";

const stripe = loadStripe(siteConfig.stripePublicKey);

export interface IPageWrapperProps {}

export function PageWrapper(props: React.PropsWithChildren<IPageWrapperProps>) {
  const location = useLocation();
  const { selectedPricingPlan, trialPricingPlan } = useGlobalState2();
  const plan = trialPricingPlan?.oneTimeFee.find((p) => p.priceID === selectedPricingPlan);

  // Sends custom pixel events tracking time spent during the session. Placed code here for the sake of simplicity.
  React.useEffect(() => {
    if (location.pathname.includes("/success-checkout")) {
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];
    const events = [
      {
        timeout: 30000,
        name: "Time30s",
      },
      {
        timeout: 60000,
        name: "Time60s",
      },
      {
        timeout: 90000,
        name: "Time90s",
      },
      {
        timeout: 120000,
        name: "Time+120s",
      },
    ];

    events.forEach((it) => {
      timeouts.push(
        setTimeout(() => {
          trackCustomPixelEvent(it.name);
        }, it.timeout)
      );
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

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
      {props.children}

      <CheckoutDrawer plan={plan} />
    </Elements>
  );
}
