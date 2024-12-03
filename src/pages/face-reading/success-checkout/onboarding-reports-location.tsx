import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";
import { navigate } from "gatsby";
import { createInternalURL, parseURLParams } from "@components/onboarding/utils";
import { LocationPicker, LocationValue } from "@components/LocationPicker";
import React from "react";
import { eden } from "@utils/coreApi";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";

export default function Page() {
  const { userProfile } = useGlobalState2();
  const [location, setLocation] = React.useState<LocationValue | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function submit() {
    if (!userProfile || !location) {
      return;
    }

    try {
      setIsLoading(true);

      await eden(`/updateUserProfile`, {
        method: "POST",
        body: {
          id: userProfile.id,
          birth_place_place_id: location.placeID,
          birth_place_formatted_text: location.formattedText,
          birth_place_lat: location.lat,
          birth_place_lng: location.long,
        },
      });

      setIsLoading(false);

      const urlParams = parseURLParams<{
        currency: string;
        paymentType: string;
      }>(window.location.href);

      const url = createInternalURL("/face-reading/success-checkout/onboarding-product", {
        paymentType: urlParams.paymentType,
        currency: urlParams.currency,
      });

      navigate(url);
    } catch (err) {
      console.error(err);
    }
  }

  function handleSelect(value: LocationValue) {
    setLocation(value);
  }

  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={2} />

          <Text mt={6} fontSize={"xl"} fontWeight={"bold"}>
            Could you please share your exact place of birth?
          </Text>

          <LocationPicker onSelect={handleSelect} />

          <Button
            size={"lg"}
            py={7}
            colorScheme="brand"
            flexGrow={1}
            mt={2}
            onClick={submit}
            disabled={!location}
            isLoading={isLoading}
          >
            <Text fontSize={["sm", "md"]}>Continue</Text>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
