import * as React from "react";

import "../../styles/global.css";
import { GlobalHead } from "./head";
import { loadFromStorage, saveToStorage } from "@utils/localStorage";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export interface IRootWrapperProps {}

const GlobalStateCtx = React.createContext<{
  globalState: Record<string, any>;
  setInGlobalState: (id: string, value: (current: any) => any) => void;
}>(null as any);

const GlobalStateContext = React.createContext<TypedGlobalState>({});

const GlobalUpdateContext = React.createContext<
  React.Dispatch<React.SetStateAction<TypedGlobalState>>
>(null as any);

type TypedGlobalState = {
  funnelTheme?: "relationships" | "loneliness";
  faceImageDataUrl?: string;
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
  const [typedGlobalState, setTypedGlobalState] = React.useState<TypedGlobalState>(
    // wtf why i have to do this
    null as unknown as {}
  );
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
      saveToStorage("globalState", typedGlobalState);
    }
  }, [typedGlobalState]);

  React.useEffect(() => {
    loadModels();
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
            <GlobalHead />
            {props.children}
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
