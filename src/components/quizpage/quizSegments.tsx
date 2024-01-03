import { Segment } from "@martynasj/quiz-lib";

import {
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourProfileSavingSlide,
  YourBirthTimeSlide,
  IntroToSecondPart,
  SatisfactionScoreSlide,
  AsnwerLongevity,
  IntroToFinetuningPart,
  YourPersonalityTypeSlide,
  YourValuesAndPrioritiesSlide,
  YourSpiritualInvolvementSlide,
  FinilisingAstrologerSlide,
} from "./slides.yourProfile";
import { NatalChartPreviewSlide } from "./slide.natalChartPreview";
import { FirstQuestionTrial } from "./slide.firstTrialQuestion";
import { EmailSlide } from "./slides.shared";

export function Quiz() {
  return (
    <Segment title="Progress">
      <YourBirthDateSlide />
      <YourBirthTimeSlide />
      <YourBirthPlaceSlide />
      <YourProfileSavingSlide />
      <NatalChartPreviewSlide />
      <FirstQuestionTrial />
      <IntroToSecondPart />
      <AsnwerLongevity />
      <SatisfactionScoreSlide />
      <IntroToFinetuningPart />
      <YourPersonalityTypeSlide />
      <YourValuesAndPrioritiesSlide />
      <YourSpiritualInvolvementSlide />
      <FinilisingAstrologerSlide />
      <EmailSlide />
    </Segment>
  );
}
