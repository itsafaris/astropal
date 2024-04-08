import * as React from "react";

import "../../styles/global.css";
import { GlobalHead } from "./head";

export interface IRootWrapperProps {}

const GlobalStateCtx = React.createContext<{
  globalState: Record<string, any>;
  setInGlobalState: (id: string, value: (current: any) => any) => void;
}>(null as any);

/** Wraps every page but is not re-mounted when chaning pages */
export function RootWrapper(props: React.PropsWithChildren<IRootWrapperProps>) {
  const [globalState, setGlobalState] = React.useState<Record<string, any>>({});

  function setInGlobalState(id: string, value: (value: any) => any) {
    setGlobalState((s) => ({ ...globalState, [id]: value(s[id]) }));
  }

  return (
    <GlobalStateCtx.Provider value={{ globalState, setInGlobalState }}>
      <GlobalHead />
      {props.children}
    </GlobalStateCtx.Provider>
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
