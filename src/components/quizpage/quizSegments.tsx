import { Segment } from "@martynasj/quiz-lib";

import {
  YourValuesAndPrioritiesSlide,
  YourColorResonanceSlide,
  YourGenderSlide,
  YourBirthNameSlide,
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourProfileSummarySlide,
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
  YourPersonalityTypeSlide,
  YourExpectationsSlide,
  YourSpiritualInvolvementSlide,
  PartnerEmotionalOpennessSlide,
  PartnerPersonalityTypeSlide,
  YourSpiritualProfileIntroSlide,
  PartnerSpiritualProfileIntroFiller,
  FinalizingProfileSlide,
  SimilarProfilesSlide,
  YourGoalSlide,
  FinalizingIdealPartnerProfileSlide,
  SocialProofFiller,
  YourProfileSavingSlide,
} from "./allSlides";

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
    <Segment title="Your personality">
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
    <Segment title="Partner's personality">
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
    <Segment title="Ideal Partner">
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

export function RelationshipsNonSingleSegment() {
  return <Segment title="Relationship satisfaction"></Segment>;
}
