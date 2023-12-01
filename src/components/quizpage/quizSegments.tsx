import { Segment } from "@martynasj/quiz-lib";

import {
  valuesAndPrioritiesSlide,
  colorResonanceSlide,
  genderSlide,
  birthNameSlide,
  birthDateSlide,
  birthPlaceSlide,
  loadingAfterPersonalInfo,
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
  socialProofFiller,
  yourProfileSummaryFiller,
  partnerProfileSummaryFiller,
  goalSlide,
} from "./allSlides";

export function goalSegment() {
  return (
    <Segment title="Your goal">
      {goalSlide()}
      {socialProofFiller()}
    </Segment>
  );
}

export function personalInfoSegment({ birthname }: { birthname: string }) {
  return (
    <Segment title="Your personality">
      {genderSlide()}
      {birthNameSlide()}
      {birthDateSlide()}
      {birthPlaceSlide()}
      {loadingAfterPersonalInfo({ birthname })}
      {personalityTypeSlide()}
      {valuesAndPrioritiesSlide()}
      {spiritualInvolvementSlide()}
      {colorResonanceSlide()}
      {yourProfileSummaryFiller()}
    </Segment>
  );
}

export function partnerPersonalInfoSegment() {
  return (
    <Segment title="Partner's personality">
      {partnerGenderSlide()}
      {partnerBirthNameSlide()}
      {partnerBirthDateSlide()}
      {partnerBirthPlaceSlide()}
      {partnerPersonalityTypeSlide()}
      {partnerEmotionalOpennessSlide()}
      {partnerTemperamentSlide()}
      {partnerProfileSummaryFiller()}
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
