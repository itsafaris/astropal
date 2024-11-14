import * as React from "react";
import { Container, Slide } from "@chakra-ui/react";
import { CheckoutForm } from "./CheckoutForm";
import { useLocation } from "@gatsbyjs/reach-router";

import "../../styles/global.css";
import { OneTimeFeePrice } from "@astropal/api-client/dist/src/controllers/pricing";

export function CheckoutDrawer({ plan }: { plan: OneTimeFeePrice }) {
  const location = useLocation();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (location.pathname.includes("/checkout")) {
      setIsDrawerOpen(true);
    }

    return () => {
      setIsDrawerOpen(false);
    };
  }, [location]);

  return (
    <Slide
      direction="bottom"
      in={isDrawerOpen}
      style={{ zIndex: 10, backgroundColor: "white", boxShadow: "0px 10px 20px 0px black" }}
    >
      <Container py={5}>
        <CheckoutForm plan={plan} />
      </Container>
    </Slide>
  );
}
