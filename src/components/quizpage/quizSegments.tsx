import { Segment } from "@martynasj/quiz-lib";

import {
  valuesAndPrioritiesSlide,
  colorResonanceSlide,
  GenderSlide,
  birthNameSlide,
  birthDateSlide,
  birthPlaceSlide,
  LoadingAfterPersonalInfo,
  partnerGenderSlide,
  partnerBirthNameSlide,
  partnerBirthDateSlide,
  partnerBirthPlaceSlide,
  partnerTemperamentSlide,
  mustHaveTraitSlide,
  sharedLifestyleAspectSlide,
  approachToConflictsSlide,
  emotionalOpennessSlide,
  viewOnGrowthSlide,
  feelingsAboutRelationshipSlide,
  relationshipImportanceSlide,
  relationshipFactorsSlide,
  conflictResolutionSatisfactionSlide,
  healthyRelationshipVisionSlide,
  potentialPartnerValuesSlide,
  relationshipDealBreakersSlide,
  findingCompatiblePartnerSatisfactionSlide,
  personalityTypeSlide,
  appFeaturesImportanceSlide,
  spiritualInvolvementSlide,
  partnerEmotionalOpennessSlide,
  partnerPersonalityTypeSlide,
  YourProfileIntroFiller,
  partnerProfileIntroFiller,
  loadingAfterPartnersInfo,
  fillerUserCount,
  GoalSlide,
  SocialProofFiller,
  QuickLoading,
} from "./allSlides";

export function GoalSegment() {
  return (
    <Segment title="Your goal">
      <GenderSlide />
      <GoalSlide />
      {/* <SocialProofFiller /> */}
    </Segment>
  );
}

export function personalInfoSegment() {
  return (
    <Segment title="Your personality">
      <YourProfileIntroFiller />
      {birthNameSlide()}
      {birthDateSlide()}
      {colorResonanceSlide()}
      {birthPlaceSlide()}
      <QuickLoading />
      {fillerUserCount()}
      {personalityTypeSlide()}
      {valuesAndPrioritiesSlide()}
      {spiritualInvolvementSlide()}
      <LoadingAfterPersonalInfo />
    </Segment>
  );
}

export function partnerPersonalInfoSegment() {
  return (
    <Segment title="Partner's personality">
      {partnerProfileIntroFiller()}
      {partnerGenderSlide()}
      {partnerBirthNameSlide()}
      {partnerBirthDateSlide()}
      {partnerBirthPlaceSlide()}
      {partnerPersonalityTypeSlide()}
      {partnerEmotionalOpennessSlide()}
      {partnerTemperamentSlide()}
      {loadingAfterPartnersInfo()}
    </Segment>
  );
}

export function idealPartnerSegment() {
  return (
    <Segment title="Ideal Partner">
      {mustHaveTraitSlide()}
      {sharedLifestyleAspectSlide()}
      {approachToConflictsSlide()}
      {emotionalOpennessSlide()}
      {viewOnGrowthSlide()}
    </Segment>
  );
}

export function relationshipsNonSingleSegment() {
  return (
    <Segment title="Relationship satisfaction">
      {feelingsAboutRelationshipSlide()}
      {relationshipImportanceSlide()}
      {relationshipFactorsSlide()}
      {conflictResolutionSatisfactionSlide()}
      {appFeaturesImportanceSlide()}
    </Segment>
  );
}

export function relationshipsSingleSegment() {
  return (
    <Segment title="Relationship expectations">
      {healthyRelationshipVisionSlide()}
      {potentialPartnerValuesSlide()}
      {relationshipDealBreakersSlide()}
      {findingCompatiblePartnerSatisfactionSlide()}
      {appFeaturesImportanceSlide()}
    </Segment>
  );
}
