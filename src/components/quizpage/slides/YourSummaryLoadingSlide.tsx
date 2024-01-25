import { Selector, Slide, Title } from "@martynasj/quiz-lib";

import { useQuizServiceWrapper } from "../quizServiceWrapper";

export function YourSummaryLoadingSlide() {
  const { numerologyData } = useQuizServiceWrapper();

  function findIntervalIndex(progressValue: number, data: Array<Record<string, any>>): number {
    if (progressValue < 0 || progressValue > 100) {
      throw new Error("ProgressValue must be between 0 and 100 inclusive.");
    }

    if (data.length === 0) {
      return -1;
    }

    const intervals = data.length;
    const intervalSize = 100 / intervals;

    const progressInInterval = progressValue % intervalSize;
    const index = Math.floor(progressValue / intervalSize);

    // Adjust index for the last interval
    const lastIndex = intervals - 1;
    const lastIntervalSize = 100 - lastIndex * intervalSize;
    if (index === lastIndex && progressInInterval > lastIntervalSize) {
      return lastIndex;
    }

    return index;
  }

  function renderNumerologyData(progressValue: number, data: Array<Record<string, any>>): string {
    if (progressValue == null) {
      return "";
    }

    if (progressValue === 100) {
      return "Profile updated";
    }

    const index = findIntervalIndex(progressValue, data);
    if (index === -1) {
      return "";
    }

    return `${data[index]?.text}: ${data[index]?.value}`;
  }

  return (
    <Slide
      id="your-summary-loading"
      type="loading"
      from={0}
      to={100}
      duration={4}
      autoProceed
      statusText={({ progress }) => {
        const data = [
          {
            text: "Zodiac sign",
            value: numerologyData.zodiacSign ?? "",
          },
          {
            text: "Destiny number",
            value: numerologyData.destinyNumber ?? "",
          },
          {
            text: "Lucky day",
            value: numerologyData.favDay ?? "",
          },
          {
            text: "Matching metal",
            value: numerologyData.favMetal ?? "",
          },
          {
            text: "Lucky stone",
            value: numerologyData.favStone ?? "",
          },
        ];

        return renderNumerologyData(progress, data);
      }}
    >
      {() => {
        return (
          <>
            <Title textAlign={"center"}>Calculating your astrological profile</Title>
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}
