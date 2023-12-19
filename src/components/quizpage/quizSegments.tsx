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
  PartnerMatchScore,
} from "./slides.partnerProfile";

import { ExpectationsSlide, FinalizingProfileSlide, EmailSlide } from "./slides.shared";

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
  YourSimilarProfilesSlide,
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

export function PersonalInfoSegment() {
  return (
    <Segment title="Your spiritual profile">
      <YourSpiritualProfileIntroSlide />
      <YourBirthNameSlide />
      <YourBirthDateSlide />
      <YourColorResonanceSlide />
      <YourBirthPlaceSlide />
      <YourProfileSummarySlide />
      <YourSimilarProfilesSlide />
    </Segment>
  );
}

export function PartnerPersonalInfoSegment() {
  return (
    <Segment title="Partner's spiritual profile">
      {/* <PartnerSpiritualProfileIntroFiller /> */}
      <PartnerGenderSlide />
      <PartnerBirthNameSlide />
      <PartnerBirthDateSlide />
      <PartnerBirthPlaceSlide />
      <YourProfileSavingSlide />
      <PartnerMatchScore />
      <PartnerPersonalityTypeSlide />
      <PartnerEmotionalOpennessSlide />
      <PartnerRelationshipImportanceSlide />
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
