import * as React from "react";

import "../../styles/global.css";
import { GlobalHead } from "./head";
import { loadFromStorage, saveToStorage } from "@utils/localStorage";

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
};

export const useGlobalState2 = () => React.useContext(GlobalStateContext);

export const useGlobalUpdate2 = () => React.useContext(GlobalUpdateContext);

/** Wraps every page but is not re-mounted when chaning pages */
export function RootWrapper(props: React.PropsWithChildren<IRootWrapperProps>) {
  const [globalState, setGlobalState] = React.useState<Record<string, any>>({});
  const [typedGlobalState, setTypedGlobalState] = React.useState<TypedGlobalState>(
    // wtf why i have to do this
    null as unknown as {}
  );

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

  return (
    <GlobalStateContext.Provider value={typedGlobalState ?? {}}>
      <GlobalUpdateContext.Provider value={setTypedGlobalState}>
        <GlobalStateCtx.Provider value={{ globalState, setInGlobalState }}>
          <GlobalHead />
          {props.children}
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
