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
  IntroSlide,
} from "./slides.yourProfile";
import { NatalChartPreviewSlide } from "./slide.natalChartPreview";
import { FirstQuestionTrial } from "./slide.firstTrialQuestion";
import { EmailSlide, ThankYouSlide } from "./slides.shared";

export function Quiz() {
  return (
    <Segment title="Progress">
      <IntroSlide />
      <YourBirthDateSlide />
      <YourBirthTimeSlide />
      <YourBirthPlaceSlide />
      <YourProfileSavingSlide />
      <NatalChartPreviewSlide />
      <FirstQuestionTrial />
      {/* <IntroToSecondPart /> */}
      <SatisfactionScoreSlide />
      <AsnwerLongevity />
      <IntroToFinetuningPart />
      <YourPersonalityTypeSlide />
      <YourValuesAndPrioritiesSlide />
      <YourSpiritualInvolvementSlide />
      <FinilisingAstrologerSlide />
      <EmailSlide />
      <ThankYouSlide />
    </Segment>
  );
}
