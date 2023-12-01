import { Segment, Selector, Slide, Title, Image } from "@martynasj/quiz-lib";

import skymapImg from "@images/skymap.png";

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
  fillerOne,
} from "./allSlides";

export function introGoalsSegment() {
  return (
    <Segment title={"Intro"}>
      <Slide
        id="relationship-goals"
        type="single"
        variant="list"
        options={[
          {
            text: "Fix relationship problems",
          },
          {
            text: "Increase relationship satisfaction",
          },
          {
            text: "Find partner",
          },
        ]}
      >
        <Title>What are your primary goals and aspirations right now?</Title>
        <Selector />
      </Slide>

      <Slide id="filler-sky-map" type="filler">
        <Title>
          Good! Now that we have a clear goal in mind, let's create your
          astrological avatar.
        </Title>
        <Image src={skymapImg} />
      </Slide>
    </Segment>
  );
}

export function personalInfoSegment({ birthname }: { birthname: string }) {
  return (
    <Segment title="Your personality">
      {fillerOne()}
      {genderSlide()}
      {birthNameSlide()}
      {birthDateSlide()}
      {birthPlaceSlide()}
      {loadingAfterPersonalInfo({ birthname })}
      {personalityTypeSlide()}
      {valuesAndPrioritiesSlide()}
      {spiritualInvolvementSlide()}
      {colorResonanceSlide()}
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
