import { Segment } from "@martynasj/quiz-lib";

import {
  ValuesAndPrioritiesSlide,
  ColorResonanceSlide,
  GenderSlide,
  BirthNameSlide,
  BirthDateSlide,
  BirthPlaceSlide,
  LoadingAfterPersonalInfo,
  PartnerGenderSlide,
  PartnerBirthNameSlide,
  PartnerBirthDateSlide,
  PartnerBirthPlaceSlide,
  PartnerTemperamentSlide,
  mustHaveTraitSlide as MustHaveTraitSlide,
  sharedLifestyleAspectSlide as SharedLifestyleAspectSlide,
  approachToConflictsSlide as ApproachToConflictsSlide,
  emotionalOpennessSlide as EmotionalOpennessSlide,
  viewOnGrowthSlide as ViewOnGrowthSlide,
  FeelingsAboutRelationshipSlide,
  RelationshipImportanceSlide,
  RelationshipFactorsSlide,
  ConflictResolutionSatisfactionSlide,
  healthyRelationshipVisionSlide as HealthyRelationshipVisionSlide,
  potentialPartnerValuesSlide as PotentialPartnerValuesSlide,
  relationshipDealBreakersSlide as RelationshipDealBreakersSlide,
  findingCompatiblePartnerSatisfactionSlide as FindingCompatiblePartnerSatisfactionSlide,
  PersonalityTypeSlide,
  appFeaturesImportanceSlide as AppFeaturesImportanceSlide,
  SpiritualInvolvementSlide,
  PartnerEmotionalOpennessSlide,
  PartnerPersonalityTypeSlide,
  YourProfileIntroFiller,
  PartnerProfileIntroFiller,
  LoadingAfterPartnersInfo,
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
      <PartnerProfileIntroFiller />
      <PartnerBirthNameSlide />
      <PartnerPersonalityTypeSlide />
      <PartnerEmotionalOpennessSlide />
      <PartnerGenderSlide />
      <PartnerBirthDateSlide />
      <PartnerTemperamentSlide />
      <PartnerBirthPlaceSlide />
      <FeelingsAboutRelationshipSlide />
      <RelationshipImportanceSlide />
      <RelationshipFactorsSlide />
      <ConflictResolutionSatisfactionSlide />
      <AppFeaturesImportanceSlide />
      <LoadingAfterPartnersInfo />
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
  return <Segment title="Relationship satisfaction"></Segment>;
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
