import { useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { eden, TrialPricingPlan } from "@utils/coreApi";
import { trackPixelEvent, trackPosthogPurchaseEvent } from "@utils/tracking";
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
      const { userID, currency, paymentType, planID } = storage.getConversionDetails();
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

      let value = plan.recurring.unit_amount;
      if (plan.recurring.coupon) {
        value = value - plan.recurring.coupon.amount_off;
      }

      value = value / 100;

      trackPosthogPurchaseEvent({
        name: "purchase",
        properties: {
          currency,
          value,
          paymentType,
          contentType: "subscription",
          contentIDs: [plan.recurring.priceID],
        },
      });

      trackPixelEvent({
        event: "Purchase",
        pixelName: "fb_pixel_2",
        properties: {
          currency,
          value,
          paymentType,
          planID,
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
