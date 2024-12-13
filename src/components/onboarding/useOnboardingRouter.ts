import { useLocation } from "@gatsbyjs/reach-router";
import { createProductURL } from "src/utils/urls";
import { navigate } from "gatsby";
import React from "react";
import { storage } from "@components/wrappers/successCheckoutStorage";

export const ONBOARDING_ROUTES = {
  START: "/face-reading/success-checkout/onboarding-welcome",
  REPORTS_1: "/face-reading/success-checkout/onboarding-reports-1",
  REPORTS_2: "/face-reading/success-checkout/onboarding-reports-2",
  REPORTS_TIME: "/face-reading/success-checkout/onboarding-reports-time",
  REPORTS_LOCATION: "/face-reading/success-checkout/onboarding-reports-location",
  SKIP_TRIAL_1: "/face-reading/success-checkout/onboarding-skip-trial-1",
  SKIP_TRIAL_2: "/face-reading/success-checkout/onboarding-skip-trial-2",
  END: "/face-reading/success-checkout/onboarding-product",
};

type RouteConfig = Array<{
  route: string;
  isInternal: boolean;
  nextRoutes: Array<{
    route: string;
    condition: () => boolean;
  }>;
}>;

export function useOnboardingRouter() {
  const location = useLocation();

  const ROUTES = {
    ...ONBOARDING_ROUTES,
    APP: createAppUrl({ userID: storage.getConversionDetails().userID ?? "" }),
  };

  const routeConfig: RouteConfig = [
    {
      route: ROUTES.START,
      isInternal: true,
      nextRoutes: [
        {
          route: ROUTES.SKIP_TRIAL_1,
          condition: () => storage.getSubscription().status !== "purchase-finalized",
        },
        {
          route: ROUTES.REPORTS_1,
          condition: () => storage.getReport().status !== "purchase-finalized",
        },
        {
          route: ROUTES.END,
          condition: () => true,
        },
      ],
    },
    {
      route: ROUTES.REPORTS_1,
      isInternal: true,
      nextRoutes: [
        {
          route: ROUTES.REPORTS_2,
          condition: () => storage.getReport().status === "initial",
        },
        {
          route: ROUTES.REPORTS_TIME,
          condition: () => storage.getReport().status === "purchase-started",
        },
        {
          route: ROUTES.END,
          condition: () => storage.getReport().status === "purchase-finalized",
        },
      ],
    },
    {
      route: ROUTES.REPORTS_2,
      isInternal: true,
      nextRoutes: [
        {
          route: ROUTES.END,
          condition: () => storage.getReport().status === "initial",
        },
        {
          route: ROUTES.REPORTS_TIME,
          condition: () => storage.getReport().status === "purchase-started",
        },
        {
          route: ROUTES.END,
          condition: () => storage.getReport().status === "purchase-finalized",
        },
      ],
    },
    {
      route: ROUTES.REPORTS_TIME,
      isInternal: true,
      nextRoutes: [
        {
          route: ROUTES.REPORTS_LOCATION,
          condition: () => storage.getReport().status === "purchase-started",
        },
        {
          route: ROUTES.END,
          condition: () => storage.getReport().status === "purchase-finalized",
        },
      ],
    },
    {
      route: ROUTES.REPORTS_LOCATION,
      isInternal: true,
      nextRoutes: [
        {
          route: ROUTES.END,
          condition: () => true,
        },
      ],
    },
    {
      route: ROUTES.SKIP_TRIAL_1,
      isInternal: true,
      nextRoutes: [
        {
          route: ROUTES.SKIP_TRIAL_2,
          condition: () => storage.getSubscription().status === "initial",
        },
        {
          route: ROUTES.REPORTS_1,
          condition: () => storage.getSubscription().status === "purchase-finalized",
        },
      ],
    },
    {
      route: ROUTES.SKIP_TRIAL_2,
      isInternal: true,
      nextRoutes: [
        {
          route: ROUTES.REPORTS_1,
          condition: () => true,
        },
      ],
    },
    {
      route: ROUTES.END,
      isInternal: true,
      nextRoutes: [
        {
          route: ROUTES.APP,
          condition: () => true,
        },
      ],
    },
    {
      route: ROUTES.APP,
      isInternal: true,
      nextRoutes: [],
    },
  ];

  function createAppUrl(input: { userID: string }): string {
    const params = new URLSearchParams();
    params.append("userID", input.userID);
    return createProductURL(params.toString());
  }

  return {
    navigateToNextPage: () => {
      if (!routeConfig) {
        console.error(`Onboarding router: routeConfig is missing`);
        return;
      }

      const currentHref = location.href;
      const currentRouteConfig = routeConfig.find((it) => currentHref.includes(it.route));
      if (!currentRouteConfig) {
        console.error(`Onboarding router: current route config was not found for ${currentHref}`);
        return;
      }

      const nextRoute = currentRouteConfig.nextRoutes.find((it) => it.condition() === true);
      if (!nextRoute) {
        console.error(`Onboarding router: next route was not found for ${currentHref}`);
        return;
      }

      const nextRouteConfig = routeConfig.find((it) => it.route === nextRoute.route);
      if (!nextRouteConfig) {
        console.error(`Onboarding router: next route config was not found for ${currentHref}`);
        return;
      }

      if (nextRouteConfig.isInternal) {
        navigate(nextRouteConfig.route);
      } else {
        location.href = nextRouteConfig.route;
      }
    },
  };
}
