import * as React from "react";

import { CheckoutDrawer } from "@components/CheckoutDrawer";
import { trackCustomPixelEvent } from "@utils/tracking";

export interface IPageWrapperProps {}

export function PageWrapper(props: React.PropsWithChildren<IPageWrapperProps>) {
  // Sends custom pixel events tracking time spent during the session. Placed code here for the sake of simplicity.
  React.useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const events = [
      {
        timeout: 30000,
        name: "Time30s",
      },
      {
        timeout: 60000,
        name: "Time60s",
      },
      {
        timeout: 90000,
        name: "Time90s",
      },
      {
        timeout: 120000,
        name: "Time+120s",
      },
    ];

    events.forEach((it) => {
      timeouts.push(
        setTimeout(() => {
          trackCustomPixelEvent(it.name);
        }, it.timeout)
      );
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div>
      {props.children}

      <CheckoutDrawer />
    </div>
  );
}
