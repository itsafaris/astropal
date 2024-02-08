import { Text } from "@chakra-ui/react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading } from "../components";

export function YourBirthPlaceSlide() {
  return (
    <Slide id="your-birth-place" type="location" placeholder="e.g. New York">
      <SlideHeading> What's your place of birth?</SlideHeading>
      <Text textAlign={"center"} fontSize={64} mt={-8}>
        📍🗺️
      </Text>

      <Selector />
    </Slide>
  );
}
