import { useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { eden, TrialPricingPlan } from "@utils/coreApi";
import { trackPosthogPurchaseEvent } from "@utils/tracking";
import { RequestType } from "@components/onboarding";
import { storage } from "@components/wrappers/successCheckoutStorage";

export function usePurchaseSubscription(
  plan: TrialPricingPlan
): [RequestType, () => Promise<void>] {
  const stripe = useStripe();

  const [request, setRequest] = React.useState<RequestType>({
    state: "initial",
  });

  async function submit() {
    try {
      const { userID, currency, paymentType } = storage.getConversionDetails();
      if (!userID || !stripe) {
        throw new Error("data is missing");
      }

      setRequest({ state: "loading" });

      const subscription = await eden("/payments/updateSubscription", {
        method: "POST",
        body: {
          userID: userID,
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
