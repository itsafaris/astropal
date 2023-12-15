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
  MustHaveTraitSlide,
  SharedLifestyleAspectSlide,
  ApproachToConflictsSlide,
  EmotionalOpennessSlide,
  ViewOnGrowthSlide,
  FeelingsAboutRelationshipSlide,
  RelationshipImportanceSlide,
  RelationshipFactorsSlide,
  ConflictResolutionSatisfactionSlide,
  HealthyRelationshipVisionSlide,
  PotentialPartnerValuesSlide,
  RelationshipDealBreakersSlide,
  FindingCompatiblePartnerSatisfactionSlide,
  PersonalityTypeSlide,
  YourExpectationsSlide,
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
      <YourExpectationsSlide />
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
      <HealthyRelationshipVisionSlide />
      <PotentialPartnerValuesSlide />
      <RelationshipDealBreakersSlide />
      <FindingCompatiblePartnerSatisfactionSlide />
      <YourExpectationsSlide />
      <LoadingAfterIdealPartnersInfo />
    </Segment>
  );
}

export function RelationshipsNonSingleSegment() {
  return <Segment title="Relationship satisfaction"></Segment>;
}
