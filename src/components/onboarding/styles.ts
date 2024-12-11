import { keyframes } from "@emotion/react";

export const CTAPulse = keyframes`
  0% {
    box-shadow: 0px 0px 0px 0px var(--chakra-colors-yellow-200);
  }
  50% {
    box-shadow: 0px 0px 0px 12px var(--chakra-colors-yellow-200);
  }
  100% {
    box-shadow: 0px 0px 0px 12px transparent;
  }
`;
