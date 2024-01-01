import { Segment } from "@martynasj/quiz-lib";

import {
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourProfileSavingSlide,
  YourSimilarProfilesSlide,
  YourBirthTimeSlide,
  NatalChartPreviewSlide,
} from "./slides.yourProfile";

export function Quiz() {
  return (
    <Segment title="Progress">
      <YourBirthDateSlide />
      <YourBirthTimeSlide />
      <YourBirthPlaceSlide />
      <YourProfileSavingSlide />
      {/* <YourSimilarProfilesSlide /> */}
      <NatalChartPreviewSlide />
    </Segment>
  );
}
