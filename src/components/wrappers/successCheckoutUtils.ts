import { createProductURL } from "@utils/urls";
import { storage } from "./successCheckoutStorage";
import { navigate } from "gatsby";

export function registerRedirects(location: Location): void {
  const isFunnelPathname = /\/face-reading\/.+/.test(location.pathname);
  const isOnboardingPathname = location.pathname.includes("/face-reading/success-checkout");

  if (isFunnelPathname && !isOnboardingPathname && storage.hasConverted()) {
    navigate(createProductURL());
    return;
  }

  if (isOnboardingPathname && storage.hasFinishedOnboarding()) {
    navigate(createProductURL());
    return;
  }
}
