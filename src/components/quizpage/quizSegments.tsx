import { Segment } from "@martynasj/quiz-lib";

import {
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourProfileSavingSlide,
  YourBirthTimeSlide,
  FirstQuestionTrial,
  AstrologerIsReadySlide,
  YourColorResonanceSlide,
} from "./slides.yourProfile";
import { NatalChartPreviewSlide } from "./slide.natalChartPreview";
import { NatalChartInterpretationSlide } from "./slide.firstInterpretation";
import { AstrologerSlide } from "./slide.astrologer";
import { AnswerToAnyQuestionSlide } from "./slide.answerToAnyQuestion";

export function Quiz() {
  return (
    <Segment title="Progress">
      <YourBirthDateSlide />
      <YourBirthTimeSlide />
      <YourBirthPlaceSlide />
      <YourProfileSavingSlide />
      <NatalChartPreviewSlide />
      <FirstQuestionTrial />
      <NatalChartInterpretationSlide />
      <AstrologerIsReadySlide />
      <AstrologerSlide />
      <AnswerToAnyQuestionSlide />
      <YourColorResonanceSlide />
    </Segment>
  );
}
