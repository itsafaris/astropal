import { Segment } from "@martynasj/quiz-lib";

import {
  ValuesAndPrioritiesSlide,
  ColorResonanceSlide,
  GenderSlide,
  BirthNameSlide,
  BirthDateSlide,
  BirthPlaceSlide,
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
  PersonalityTypeSlide,
  appFeaturesImportanceSlide,
  SpiritualInvolvementSlide,
  partnerEmotionalOpennessSlide,
  partnerPersonalityTypeSlide,
  YourProfileIntroFiller,
  partnerProfileIntroFiller,
  loadingAfterPartnersInfo,
  FillerUserCount,
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

export function PersonalInfoSegment() {
  return (
    <Segment title="Your personality">
      <YourProfileIntroFiller />
      <BirthNameSlide />
      <BirthDateSlide />
      <ColorResonanceSlide />
      <BirthPlaceSlide />
      <QuickLoading />
      <FillerUserCount />
      <PersonalityTypeSlide />
      <ValuesAndPrioritiesSlide />
      <SpiritualInvolvementSlide />
      <LoadingAfterPersonalInfo />
    </Segment>
  );
}

export function PartnerPersonalInfoSegment() {
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

export function RelationshipsNonSingleSegment() {
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
