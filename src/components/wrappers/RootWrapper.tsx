import * as React from "react";

import "../../styles/global.css";
import { GlobalHead } from "./head";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import {
  getTrialPricingPlan,
  getPricingPlans,
  TrialPricingPlan,
  PricingPlans,
  Reports,
  getReports,
} from "@utils/coreApi";
import { orderBy } from "lodash";
import { LocationProvider } from "@gatsbyjs/reach-router";
import * as Sentry from "@sentry/gatsby";
import posthog from "posthog-js";

type UserProfile = {
  id: string;
};

type RootState = {
  faceImageDataUrl?: string;
  setFaceImageDataUrl: (value: string) => void;
  selectedPricingPlan?: string;
  setSelectedPricingPlan: (value: string | undefined) => void;
  trialPricingPlan?: TrialPricingPlan;
  setTrialPricingPlan: (value: TrialPricingPlan) => void;
  pricingPlans: PricingPlans;
  setPricingPlans: (value: PricingPlans) => void;
  reports: Reports;
  setReports: (value: Reports) => void;
  userProfile?: UserProfile;
  setUserProfile: (value: UserProfile) => void;
  faceLandmarker?: FaceLandmarker;
  offerTime: number;
  setOfferTime: (time: number) => void;
};

const RootStateContext = React.createContext<RootState | null>(null);

export function useRootState(): RootState {
  const ctx = React.useContext(RootStateContext);
  if (!ctx) {
    throw new Error("useRootState must be used within RootStateContext");
  }

  return ctx;
}

/** Wraps every page but is not re-mounted when chaning pages */
export function RootWrapper({ children }: React.PropsWithChildren<{}>) {
  const [faceLandmarker, setFaceLandmarker] = React.useState<FaceLandmarker | undefined>();
  const [faceImageDataUrl, setFaceImageDataUrl] = React.useState<string | undefined>();
  const [selectedPricingPlan, setSelectedPricingPlan] = React.useState<string | undefined>();
  const [trialPricingPlan, setTrialPricingPlan] = React.useState<TrialPricingPlan | undefined>();
  const [pricingPlans, setPricingPlans] = React.useState<PricingPlans>([]);
  const [reports, setReports] = React.useState<Reports>([]);
  const [userProfile, setUserProfile] = React.useState<UserProfile | undefined>();
  const [offerTime, setOfferTime] = React.useState<number>(899000);

  React.useEffect(() => {
    // Additional data passed to Sentry that ensures easier issue debugging
    const posthogID = posthog.get_distinct_id();
    if (posthogID) {
      Sentry.setUser({
        posthogID: posthogID,
      });
    }
  }, []);

  React.useEffect(() => {
    getTrialPricingPlan()
      .then((res) => {
        const ordered = orderBy(res.oneTimeFee, (it) => it.unit_amount);

        setTrialPricingPlan(res);
        setSelectedPricingPlan(ordered[0]?.priceID);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    getPricingPlans()
      .then((res) => {
        setPricingPlans(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    getReports()
      .then((res) => {
        setReports(res.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    createFaceLandmarker()
      .then((res) => {
        setFaceLandmarker(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const value = React.useMemo<RootState>(() => {
    return {
      faceImageDataUrl,
      setFaceImageDataUrl,
      selectedPricingPlan,
      setSelectedPricingPlan,
      trialPricingPlan,
      setTrialPricingPlan,
      pricingPlans,
      setPricingPlans,
      reports,
      setReports,
      userProfile,
      setUserProfile,
      faceLandmarker,
      offerTime,
      setOfferTime,
    };
  }, [
    faceImageDataUrl,
    selectedPricingPlan,
    trialPricingPlan,
    pricingPlans,
    reports,
    userProfile,
    faceLandmarker,
    offerTime,
  ]);

  return (
    <RootStateContext.Provider value={value}>
      <LocationProvider>
        <GlobalHead />

        {children}
      </LocationProvider>
    </RootStateContext.Provider>
  );
}

async function createFaceLandmarker() {
  const filesetResolver = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );
  const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
      delegate: "GPU",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  return faceLandmarker;
}
