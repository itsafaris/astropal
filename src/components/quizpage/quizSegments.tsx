import { Segment } from "@martynasj/quiz-lib";

import {
  YourBirthNameSlide,
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  IntroSlide,
  YourProfileSavingSlide,
  YourSimilarProfilesSlide,
} from "./slides.yourProfile";

export function Quiz() {
  return (
    <Segment title="Progress">
      <IntroSlide />
      <YourBirthNameSlide />
      <YourBirthDateSlide />
      <YourBirthPlaceSlide />
      <YourProfileSavingSlide />
      <YourSimilarProfilesSlide />
    </Segment>
  );
}
