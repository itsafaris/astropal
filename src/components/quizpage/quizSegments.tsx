import { Segment } from "@martynasj/quiz-lib";

import {
  PartnerGenderSlide,
  PartnerBirthNameSlide,
  PartnerBirthDateSlide,
  PartnerBirthPlaceSlide,
  PartnerTemperamentSlide,
  IdealPartnerTraitsSlide,
  IdealPartnerLifestyleAspectsSlide,
  IdealPartnerApproachToConflictsSlide,
  IdealPartnerEmotionalOpennessSlide,
  IdealPartnerViewOnGrowthSlide,
  PartnerRelationshipFeelingsSlide,
  PartnerRelationshipImportanceSlide,
  PartnerRelationshipFactorsSlide,
  PartnerRelationshipConflictResolutionSlide,
  IdealPartnerRelationshipVisionSlide,
  IdealPartnerRelationshipValuesSlide,
  IdealPartnerRelationshipPastIssuesSlide,
  IdealPartnerRelationshipFindingSatisfactionSlide,
  YourExpectationsSlide,
  PartnerEmotionalOpennessSlide,
  PartnerPersonalityTypeSlide,
  PartnerSpiritualProfileIntroFiller,
  FinalizingProfileSlide,
  FinalizingIdealPartnerProfileSlide,
} from "./allSlides";

import {
  YourValuesAndPrioritiesSlide,
  YourColorResonanceSlide,
  YourGenderSlide,
  YourBirthNameSlide,
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourProfileSummarySlide,
  YourPersonalityTypeSlide,
  YourSpiritualInvolvementSlide,
  YourSpiritualProfileIntroSlide,
  SimilarProfilesSlide,
  YourGoalSlide,
  SocialProofFiller,
  YourProfileSavingSlide,
} from "./slides.yourProfile";

export function GoalSegment() {
  return (
    <Segment title="Your goal">
      <YourGenderSlide />
      <YourGoalSlide />
      {/* <SocialProofFiller /> */}
    </Segment>
  );
}

export function PersonalInfoSegment() {
  return (
    <Segment title="Your spiritual profile">
      <YourSpiritualProfileIntroSlide />
      <YourBirthNameSlide />
      <YourBirthDateSlide />
      <YourColorResonanceSlide />
      <YourBirthPlaceSlide />
      <YourProfileSavingSlide />
      <SimilarProfilesSlide />
      <YourPersonalityTypeSlide />
      <YourValuesAndPrioritiesSlide />
      <YourSpiritualInvolvementSlide />
      <YourProfileSummarySlide />
    </Segment>
  );
}

export function PartnerPersonalInfoSegment() {
  return (
    <Segment title="Partner's spiritual profile">
      <PartnerSpiritualProfileIntroFiller />
      <PartnerBirthNameSlide />
      <PartnerPersonalityTypeSlide />
      <PartnerEmotionalOpennessSlide />
      <PartnerGenderSlide />
      <PartnerBirthDateSlide />
      <PartnerTemperamentSlide />
      <PartnerBirthPlaceSlide />
      <PartnerRelationshipFeelingsSlide />
      <PartnerRelationshipImportanceSlide />
      <PartnerRelationshipFactorsSlide />
      <PartnerRelationshipConflictResolutionSlide />
      <YourExpectationsSlide />
      <FinalizingProfileSlide />
    </Segment>
  );
}

export function IdealPartnerSegment() {
  return (
    <Segment title="Ideal Partner's spiritual profile">
      <IdealPartnerTraitsSlide />
      <IdealPartnerLifestyleAspectsSlide />
      <IdealPartnerApproachToConflictsSlide />
      <IdealPartnerEmotionalOpennessSlide />
      <IdealPartnerViewOnGrowthSlide />
      <IdealPartnerRelationshipVisionSlide />
      <IdealPartnerRelationshipValuesSlide />
      <IdealPartnerRelationshipPastIssuesSlide />
      <IdealPartnerRelationshipFindingSatisfactionSlide />
      <YourExpectationsSlide />
      <FinalizingIdealPartnerProfileSlide />
    </Segment>
  );
}
