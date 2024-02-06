import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading } from "../components";

export function YourBirthPlaceSlide() {
  return (
    <Slide id="your-birth-place" type="location" placeholder="e.g. New York">
      <SlideHeading>📍🗺️ Where were you born?</SlideHeading>
      <Selector />
    </Slide>
  );
}
