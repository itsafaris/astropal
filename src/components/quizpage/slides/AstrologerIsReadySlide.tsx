import { Selector, Slide, Title } from "@martynasj/quiz-lib";

export function AstrologerIsReadySlide() {
  return (
    <Slide
      id="astrologer-ready"
      type="filler"
      nextButtonProps={{ title: "Start using your astrologer" }}
    >
      <Title>Congratulations! Your astrologer is now ready</Title>
      <Selector />
    </Slide>
  );
}
