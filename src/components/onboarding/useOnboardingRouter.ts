import { sessionCache } from "src/sessionCache";
import { useLocation } from "@gatsbyjs/reach-router";
import { createProductURL } from "src/utils/urls";
import { navigate } from "gatsby";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import React from "react";

export function useOnboardingRouter() {
  const { userProfile } = useGlobalState2();
  const location = useLocation();

  const [routes, setRoutes] = React.useState({
    START: "/face-reading/success-checkout/onboarding-welcome",
    REPORTS_1: "/face-reading/success-checkout/onboarding-reports-1",
    REPORTS_2: "/face-reading/success-checkout/onboarding-reports-2",
    REPORTS_TIME: "/face-reading/success-checkout/onboarding-reports-time",
    REPORTS_LOCATION: "/face-reading/success-checkout/onboarding-reports-location",
    SKIP_TRIAL_1: "/face-reading/success-checkout/onboarding-skip-trial-1",
    SKIP_TRIAL_2: "/face-reading/success-checkout/onboarding-skip-trial-2",
    END: "/face-reading/success-checkout/onboarding-product",
    APP: createAppUrl({ userID: userProfile?.id ?? "" }),
  });

  React.useEffect(() => {
    setRoutes((routes) => ({
      ...routes,
      APP: createAppUrl({ userID: userProfile?.id ?? "" }),
    }));
  }, [userProfile]);

  function createAppUrl(input: { userID: string }): string {
    const params = new URLSearchParams();
    params.append("userID", input.userID);
    return createProductURL(params.toString());
  }

  const routeConfig: Array<{
    route: string;
    isInternal: boolean;
    nextRoutes: Array<{
      route: string;
      condition: () => boolean;
    }>;
  }> = [
    {
      route: routes.START,
      isInternal: true,
      nextRoutes: [
        {
          route: routes.REPORTS_1,
          condition: () => sessionCache.getReport().status !== "purchase-finalized",
        },
        {
          route: routes.SKIP_TRIAL_1,
          condition: () => sessionCache.getSubscription().status !== "purchase-finalized",
        },
        {
          route: routes.END,
          condition: () => true,
        },
      ],
    },
    {
      route: routes.REPORTS_1,
      isInternal: true,
      nextRoutes: [
        {
          route: routes.REPORTS_2,
          condition: () => sessionCache.getReport().status === "initial",
        },
        {
          route: routes.REPORTS_TIME,
          condition: () => sessionCache.getReport().status === "purchase-started",
        },
        {
          route: routes.SKIP_TRIAL_1,
          condition: () => sessionCache.getReport().status === "purchase-finalized",
        },
      ],
    },
    {
      route: routes.REPORTS_2,
      isInternal: true,
      nextRoutes: [
        {
          route: routes.SKIP_TRIAL_1,
          condition: () => sessionCache.getReport().status === "initial",
        },
        {
          route: routes.REPORTS_TIME,
          condition: () => sessionCache.getReport().status === "purchase-started",
        },
        {
          route: routes.SKIP_TRIAL_1,
          condition: () => sessionCache.getReport().status === "purchase-finalized",
        },
      ],
    },
    {
      route: routes.REPORTS_TIME,
      isInternal: true,
      nextRoutes: [
        {
          route: routes.REPORTS_LOCATION,
          condition: () => sessionCache.getReport().status === "purchase-started",
        },
        {
          route: routes.SKIP_TRIAL_1,
          condition: () => sessionCache.getReport().status === "purchase-finalized",
        },
      ],
    },
    {
      route: routes.REPORTS_LOCATION,
      isInternal: true,
      nextRoutes: [
        {
          route: routes.SKIP_TRIAL_1,
          condition: () => true,
        },
      ],
    },
    {
      route: routes.SKIP_TRIAL_1,
      isInternal: true,
      nextRoutes: [
        {
          route: routes.SKIP_TRIAL_2,
          condition: () => sessionCache.getSubscription().status === "initial",
        },
        {
          route: routes.END,
          condition: () => sessionCache.getSubscription().status === "purchase-finalized",
        },
      ],
    },
    {
      route: routes.SKIP_TRIAL_2,
      isInternal: true,
      nextRoutes: [
        {
          route: routes.END,
          condition: () => true,
        },
      ],
    },
    {
      route: routes.END,
      isInternal: true,
      nextRoutes: [
        {
          route: routes.APP,
          condition: () => true,
        },
      ],
    },
    {
      route: routes.APP,
      isInternal: true,
      nextRoutes: [],
    },
  ];

  return {
    routes,
    navigateToNextPage: () => {
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
