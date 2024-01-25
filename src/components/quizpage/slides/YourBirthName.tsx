import { Selector, Slide, Title } from "@martynasj/quiz-lib";

export function YourBirthNameSlide() {
  return (
    <Slide
      id="your-birth-name"
      type="short-text"
      label="Your birth name"
      placeholder="e.g. John / Jessica"
    >
      <Title>What's your birth name?</Title>
      <Selector />
    </Slide>
  );
}
