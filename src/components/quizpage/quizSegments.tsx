import { Segment } from "@martynasj/quiz-lib";

import {
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourProfileSavingSlide,
  YourBirthTimeSlide,
  SatisfactionScoreSlide,
  AsnwerLongevity,
  IntroToFinetuningPart,
  YourPersonalityTypeSlide,
  YourValuesAndPrioritiesSlide,
  YourSpiritualInvolvementSlide,
  FinilisingAstrologerSlide,
  IntroSlide,
  DescribeYourNatalChart,
  AstrologerReadySlide,
  NameSlide,
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
      <DescribeYourNatalChart />
      <FirstQuestionTrial />
      <SatisfactionScoreSlide />
      <AsnwerLongevity />
      <IntroToFinetuningPart />
      <YourPersonalityTypeSlide />
      <YourValuesAndPrioritiesSlide />
      <YourSpiritualInvolvementSlide />
      <NameSlide />
      <FinilisingAstrologerSlide />
      <AstrologerReadySlide />
      <EmailSlide />
      <ThankYouSlide />
    </Segment>
  );
}
