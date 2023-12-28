import { Segment } from "@martynasj/quiz-lib";

import {
  YourBirthNameSlide,
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourProfileSavingSlide,
  YourSimilarProfilesSlide,
} from "./slides.yourProfile";

export function Quiz() {
  return (
    <Segment title="Progress">
      {/* <YourBirthNameSlide /> */}
      <YourBirthDateSlide />
      <YourBirthPlaceSlide />
      <YourProfileSavingSlide />
      <YourSimilarProfilesSlide />
    </Segment>
  );
}
