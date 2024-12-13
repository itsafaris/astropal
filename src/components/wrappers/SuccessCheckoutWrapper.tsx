import * as React from "react";
import { storage } from "./successCheckoutStorage";

const SuccessCheckoutContext = React.createContext<{} | null>(null);

export function useSuccessCheckoutState(): {} {
  const ctx = React.useContext(SuccessCheckoutContext);
  if (!ctx) {
    throw new Error("useSuccessCheckoutState must be used within SuccessCheckoutContext");
  }

  return ctx;
}

export function SuccessCheckoutWrapper({ children }: React.PropsWithChildren<{}>) {
  React.useEffect(() => {
    storage.createNewStorage();
  }, []);

  return <SuccessCheckoutContext.Provider value={{}}>{children}</SuccessCheckoutContext.Provider>;
}
