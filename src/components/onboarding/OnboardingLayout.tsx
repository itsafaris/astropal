import { Box, Container, Stack } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import React from "react";
import { OnboardingProgress } from "@components/onboarding";

export function OnboardingLayout({
  children,
  activeStepIdx,
}: React.PropsWithChildren<{ activeStepIdx: number }>) {
  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <OnboardingProgress activeStepIdx={activeStepIdx} />

          {children}
        </Stack>
      </Container>
    </Box>
  );
}
