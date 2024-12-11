import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { eden, TrialPricingPlan } from "@utils/coreApi";
import { trackPosthogPurchaseEvent } from "@utils/tracking";
import { sessionCache } from "src/sessionCache";
import { RequestType } from "@components/onboarding";

export function usePurchaseSubscription(
  plan: TrialPricingPlan
): [RequestType, () => Promise<void>] {
  const { userProfile } = useGlobalState2();
  const stripe = useStripe();

  const [request, setRequest] = React.useState<RequestType>({
    state: "initial",
  });

  async function submit() {
    try {
      if (!userProfile || !stripe) {
        throw new Error("data is missing");
      }

      setRequest({ state: "loading" });

      const subscription = await eden("/payments/updateSubscription", {
        method: "POST",
        body: {
          userID: userProfile.id,
          priceID: plan.recurring.priceID,
          couponID: plan.recurring.coupon?.id,
        },
      });

      if (subscription.error) {
        throw new Error("failed to update subscription");
      }

      if (!subscription.data) {
        throw new Error("subscription data is missing");
      }

      const { currency, paymentType } = sessionCache.getConversionDetails();

      trackPosthogPurchaseEvent({
        name: "purchase",
        properties: {
          currency,
          value: plan.recurring.unit_amount / 100,
          paymentType: paymentType,
          contentType: "subscription",
          contentIDs: [plan.recurring.priceID],
        },
      });

      setRequest({ state: "ok" });
    } catch (err) {
      const msg = `Skip trial 1: ${String(err)}`;
      console.error(msg);
      setRequest({ state: "error", error: msg });
    }
  }

  return [request, submit];
}
