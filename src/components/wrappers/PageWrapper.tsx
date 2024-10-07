import * as React from "react";

import { CheckoutDrawer } from "@components/CheckoutDrawer";

export interface IPageWrapperProps {}

/** Wraps every page but is not re-mounted when chaning pages */
export function PageWrapper(props: React.PropsWithChildren<IPageWrapperProps>) {
  return (
    <div>
      {props.children}

      <CheckoutDrawer />
    </div>
  );
}
