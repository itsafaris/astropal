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
  mustHaveTraitSlide as MustHaveTraitSlide,
  sharedLifestyleAspectSlide as SharedLifestyleAspectSlide,
  approachToConflictsSlide as ApproachToConflictsSlide,
  emotionalOpennessSlide as EmotionalOpennessSlide,
  viewOnGrowthSlide as ViewOnGrowthSlide,
  feelingsAboutRelationshipSlide,
  relationshipImportanceSlide,
  relationshipFactorsSlide,
  conflictResolutionSatisfactionSlide,
  healthyRelationshipVisionSlide as HealthyRelationshipVisionSlide,
  potentialPartnerValuesSlide as PotentialPartnerValuesSlide,
  relationshipDealBreakersSlide as RelationshipDealBreakersSlide,
  findingCompatiblePartnerSatisfactionSlide as FindingCompatiblePartnerSatisfactionSlide,
  PersonalityTypeSlide,
  appFeaturesImportanceSlide as AppFeaturesImportanceSlide,
  SpiritualInvolvementSlide,
  partnerEmotionalOpennessSlide,
  partnerPersonalityTypeSlide,
  YourProfileIntroFiller,
  partnerProfileIntroFiller,
  loadingAfterPartnersInfo,
  FillerUserCount,
  GoalSlide,
  LoadingAfterIdealPartnersInfo,
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

export function IdealPartnerSegment() {
  return (
    <Segment title="Ideal Partner">
      <MustHaveTraitSlide />
      <SharedLifestyleAspectSlide />
      <ApproachToConflictsSlide />
      <EmotionalOpennessSlide />
      <ViewOnGrowthSlide />
      <LoadingAfterIdealPartnersInfo />
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
      {AppFeaturesImportanceSlide()}
    </Segment>
  );
}

export function RelationshipsSingleSegment() {
  return (
    <Segment title="Relationship expectations">
      <HealthyRelationshipVisionSlide />
      <PotentialPartnerValuesSlide />
      <RelationshipDealBreakersSlide />
      <FindingCompatiblePartnerSatisfactionSlide />
      <AppFeaturesImportanceSlide />
    </Segment>
  );
}
