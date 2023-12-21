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
  RelationshipFocusSlide,
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
  RelationshipDurationSlide,
  FrequencyOfInsightsSlide,
  TimeOfDayReflectionSlide,
  GuidanceDetailLevelSlide,
  GuidanceActivityPreferenceSlide,
  AstrologicalEventAlignmentSlide,
} from "./slides.partnerProfile";

import {
  ExpectationsSlide,
  FinalizingProfileSlide,
  EmailSlide,
  ThankYouSlide,
} from "./slides.shared";

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
  SingleRelationshipYourGoalSlide,
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
    <Segment title="Your relationship">
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
      <RelationshipDurationSlide />
      <PartnerRelationshipFactorsSlide />
      <CompatibilityScoreGoalLoadingSlide />
      <CompatibilityScoreGoalSlide />
    </Segment>
  );
}

export function PersonalisedGuideCreationSegment() {
  return (
    <Segment title="Your personalised guide">
      <RelationshipFocusSlide />
      <FrequencyOfInsightsSlide />
      <TimeOfDayReflectionSlide />
      <GuidanceDetailLevelSlide />
      <GuidanceActivityPreferenceSlide />
      <AstrologicalEventAlignmentSlide />
      <ExpectationsSlide />
      <FinalizingProfileSlide />
      <EmailSlide />
      <ThankYouSlide />
    </Segment>
  );
}

export function IdealPartnerSegment() {
  return (
    <Segment title="Progress">
      <SingleRelationshipYourGoalSlide />
      <YourGenderSlide />
      <YourBirthNameSlide />
      <YourBirthDateSlide />
      <YourSummaryLoadingSlide />
      <YourSimilarProfilesSlide />
      <IdealPartnerRelationshipFindingSatisfactionSlide />
      <IdealPartnerTraitsSlide />
      <IdealPartnerLifestyleAspectsSlide />
      <IdealPartnerApproachToConflictsSlide />
      {/* <IdealPartnerEmotionalOpennessSlide /> */}
      {/* <IdealPartnerViewOnGrowthSlide /> */}
      {/* <IdealPartnerRelationshipVisionSlide />
      <IdealPartnerRelationshipValuesSlide /> */}
      <IdealPartnerRelationshipPastIssuesSlide />
      <ExpectationsSlide />
      <FinalizingProfileSlide />
      <EmailSlide />
      <ThankYouSlide />
    </Segment>
  );
}
