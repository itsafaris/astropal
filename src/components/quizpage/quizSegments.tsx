import { Segment } from "@martynasj/quiz-lib";

import {
  IdealPartnerTraitsSlide,
  IdealPartnerLifestyleAspectsSlide,
  IdealPartnerApproachToConflictsSlide,
  IdealPartnerEmotionalOpennessSlide,
  IdealPartnerViewOnGrowthSlide,
  IdealPartnerRelationshipVisionSlide,
  IdealPartnerRelationshipValuesSlide,
  IdealPartnerRelationshipPastIssuesSlide,
  IdealPartnerRelationshipFindingSatisfactionSlide,
} from "./slides.idealPartnerProfile";

import {
  PartnerGenderSlide,
  PartnerBirthNameSlide,
  PartnerBirthDateSlide,
  PartnerBirthPlaceSlide,
  PartnerTemperamentSlide,
  PartnerRelationshipFeelingsSlide,
  PartnerRelationshipImportanceSlide,
  PartnerRelationshipFactorsSlide,
  PartnerRelationshipConflictResolutionSlide,
  PartnerEmotionalOpennessSlide,
  PartnerPersonalityTypeSlide,
  PartnerSpiritualProfileIntroFiller,
  CompatibilityScoreSlide,
  CompatibilityScoreLoadingSlide,
  CompatibilityScoreGoalSlide,
  CompatibilityScoreGoalLoadingSlide,
  RelationshipSatisfactionLevelSlide,
} from "./slides.partnerProfile";

import { ExpectationsSlide, FinalizingProfileSlide, EmailSlide } from "./slides.shared";

import {
  YourValuesAndPrioritiesSlide,
  YourColorResonanceSlide,
  YourGenderSlide,
  YourBirthNameSlide,
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourSummaryLoadingSlide,
  YourPersonalityTypeSlide,
  YourSpiritualInvolvementSlide,
  YourSpiritualProfileIntroSlide,
  YourSimilarProfilesSlide,
  YourGoalSlide,
  SocialProofFiller,
  YourProfileSavingSlide,
} from "./slides.yourProfile";

// export function PersonalInfoSegment() {
//   return (
//     <Segment title="Your spiritual profile">
//       <YourSpiritualProfileIntroSlide />
//       <YourBirthNameSlide />
//       <YourBirthDateSlide />
//       <YourColorResonanceSlide />
//       <YourBirthPlaceSlide />
//       <YourProfileSavingSlide />
//       <YourSimilarProfilesSlide />
//       <YourPersonalityTypeSlide />
//       <YourValuesAndPrioritiesSlide />
//       <YourSpiritualInvolvementSlide />
//       <YourProfileSummarySlide />
//     </Segment>
//   );
// }

export function PartnerPersonalInfoSegment() {
  return (
    <Segment title="Progress">
      <YourGoalSlide />
      {/* <YourSpiritualProfileIntroSlide /> */}
      <YourGenderSlide />
      <YourBirthNameSlide />
      <YourBirthDateSlide />
      {/* <YourColorResonanceSlide /> */}
      {/* <YourBirthPlaceSlide /> */}
      <YourSummaryLoadingSlide />
      <YourSimilarProfilesSlide />
      {/* <PartnerSpiritualProfileIntroFiller /> */}
      <PartnerGenderSlide />
      <PartnerBirthNameSlide />
      <PartnerBirthDateSlide />
      {/* <PartnerBirthPlaceSlide /> */}
      <CompatibilityScoreLoadingSlide />
      <CompatibilityScoreSlide />
      <RelationshipSatisfactionLevelSlide />
      <CompatibilityScoreGoalLoadingSlide />
      <CompatibilityScoreGoalSlide />
      <PartnerRelationshipImportanceSlide />
      <PartnerPersonalityTypeSlide />
      <PartnerEmotionalOpennessSlide />
      <PartnerTemperamentSlide />
      <PartnerRelationshipFeelingsSlide />
      <PartnerRelationshipFactorsSlide />
      <PartnerRelationshipConflictResolutionSlide />
      <ExpectationsSlide />
      <FinalizingProfileSlide />
      <EmailSlide />
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
      <ExpectationsSlide />
      <FinalizingProfileSlide />
      <EmailSlide />
    </Segment>
  );
}
