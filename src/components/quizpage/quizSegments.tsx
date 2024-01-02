import { Segment } from "@martynasj/quiz-lib";

import {
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourProfileSavingSlide,
  YourBirthTimeSlide,
} from "./slides.yourProfile";
import { NatalChartPreviewSlide } from "./slide.natalChartPreview";
import { NatalChartInterpretationSlide } from "./slide.firstInterpretation";

export function Quiz() {
  return (
    <Segment title="Progress">
      <YourBirthDateSlide />
      <YourBirthTimeSlide />
      <YourBirthPlaceSlide />
      <YourProfileSavingSlide />
      <NatalChartPreviewSlide />
      <NatalChartInterpretationSlide />
    </Segment>
  );
}
