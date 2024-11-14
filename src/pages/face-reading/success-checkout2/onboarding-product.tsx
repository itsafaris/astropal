import { Box, Button, Container, Flex, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import React from "react";

import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";

import { SpecialOfferBadge } from "@components/onboarding/SpecialOfferBadge";
import { createProductURL } from "src/utils/urls";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";

export default function OnboardingProduct() {
  const globalState = useGlobalState2();

  const [hasPurchasedGuides, setHasPurchasedGuides] = React.useState(false);

  React.useEffect(() => {
    setHasPurchasedGuides(true);
  }, []);

  function redirectToApp(input: { userID: string }) {
    const params = new URLSearchParams();
    params.append("userID", input.userID);
    location.href = createProductURL(params.toString());
  }

  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={3} />
          <SpecialOfferBadge
            icon="🎉"
            title="Congrats!"
            text="Simply follow these steps to access your account"
          />

          <Text fontSize={"xl"} fontWeight={"bold"}>
            Simply follow these steps to access your account
          </Text>

          <Stack textAlign={"left"} fontSize={"sm"} spacing={5}>
            <Flex alignItems={"flex-start"} gap={2}>
              <Text fontSize={"lg"}>•</Text>
              <Text>
                Press the "Access Account" button below, and you will be redirected to your account
                page. If you see a login screen, simply enter your email and proceed further.
              </Text>
            </Flex>

            {hasPurchasedGuides && (
              <Flex alignItems={"flex-start"} gap={2}>
                <Text fontSize={"lg"}>•</Text>
                <Text>
                  Your guides will be sent to your email address shortly. If you don't see them in
                  your inbox, please check your spam folder.
                </Text>
              </Flex>
            )}
          </Stack>

          <Button
            size={"lg"}
            py={7}
            colorScheme="brand"
            flexGrow={1}
            mt={2}
            onClick={() => redirectToApp({ userID: globalState.userProfile!.id })}
          >
            <Text fontSize={["sm", "md"]}>Access Account</Text>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
