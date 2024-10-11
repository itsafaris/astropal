import * as React from "react";

import "../../styles/global.css";
import { GlobalHead } from "./head";
import { loadFromStorage, saveToStorage } from "@utils/localStorage";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { getTrialPricingPlan, TrialPricingPlan } from "@utils/coreApi";
import { orderBy } from "lodash";
import { LocationProvider } from "@gatsbyjs/reach-router";

export interface IRootWrapperProps {}

const GlobalStateCtx = React.createContext<{
  globalState: Record<string, any>;
  setInGlobalState: (id: string, value: (current: any) => any) => void;
}>(null as any);

const GlobalStateContext = React.createContext<TypedGlobalState>({});

const GlobalUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<TypedGlobalState>>
>(null as any);

export type UserProfileState = {
  id: string;
};

export type TypedGlobalState = {
  funnelTheme?: "relationships" | "loneliness";
  faceImageDataUrl?: string;
  selectedPricingPlan?: string;
  trialPricingPlan?: TrialPricingPlan;
  userProfile?: UserProfileState;
};

export type ServicesCtx = {
  faceLandmarker?: FaceLandmarker;
};

const ServicesContext = React.createContext<ServicesCtx>({});

export const useGlobalState2 = () => React.useContext(GlobalStateContext);

export const useGlobalUpdate2 = () => React.useContext(GlobalUpdateContext);

/** Wraps every page but is not re-mounted when chaning pages */
export function RootWrapper(props: React.PropsWithChildren<IRootWrapperProps>) {
  const [globalState, setGlobalState] = React.useState<Record<string, any>>({});
  const [typedGlobalState, setTypedGlobalState] = React.useState<TypedGlobalState>({});
  const [servicesCtx, setServicesCtx] = React.useState<ServicesCtx>({});

  function setInGlobalState(id: string, value: (value: any) => any) {
    setGlobalState((s) => ({ ...globalState, [id]: value(s[id]) }));
  }

  React.useEffect(() => {
    const s = loadFromStorage("globalState", (s): s is TypedGlobalState => true);
    if (s) {
      setTypedGlobalState(s);
    }
  }, []);

  React.useEffect(() => {
    if (typedGlobalState) {
      const cp = { ...typedGlobalState };
      // this sometimes is too big to be saved in local storage
      delete cp.faceImageDataUrl;
      saveToStorage("globalState", cp);
    }
  }, [typedGlobalState]);

  React.useEffect(() => {
    getTrialPricingPlan()
      .then((res) => {
        const ordered = orderBy(res.oneTimeFee, (it) => it.unit_amount);
        setTypedGlobalState((s) => ({
          ...s,
          trialPricingPlan: res,
          selectedPricingPlan: ordered[0]?.priceID,
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    loadModels();
  }, []);

  React.useEffect(() => {
    console.log("TEST: ENABLING TIMER");

    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 1; i <= 10; i++) {
      timeouts.push(
        setTimeout(() => {
          console.log(`TEST: ${i}s PASSED`);
        }, i * 1000)
      );
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  async function loadModels() {
    let f = await createFaceLandmarker();
    setServicesCtx({ faceLandmarker: f });
  }

  return (
    <GlobalStateContext.Provider value={typedGlobalState ?? {}}>
      <GlobalUpdateContext.Provider value={setTypedGlobalState}>
        <GlobalStateCtx.Provider value={{ globalState, setInGlobalState }}>
          <ServicesContext.Provider value={servicesCtx}>
            <LocationProvider>
              <GlobalHead />

              {props.children}
            </LocationProvider>
          </ServicesContext.Provider>
        </GlobalStateCtx.Provider>
      </GlobalUpdateContext.Provider>
    </GlobalStateContext.Provider>
  );
}

type StateSetter<T> = T | ((currentState: T) => T);

export function useGlobalState<T>(id: string, initialValue: T): [T, (val: StateSetter<T>) => void] {
  const ctx = React.useContext(GlobalStateCtx);

  // set initial state, hope it's right
  if (!ctx.globalState[id]) {
    ctx.globalState[id] = initialValue;
  }

  function setState(value: StateSetter<T>) {
    if (value instanceof Function) {
      ctx.setInGlobalState(id, (s) => value(s));
      return;
    }

    ctx.setInGlobalState(id, () => value);
  }

  return [ctx.globalState[id], setState];
}

export function useServices() {
  return React.useContext(ServicesContext);
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
