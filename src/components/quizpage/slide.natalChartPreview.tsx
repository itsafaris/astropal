import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { Text, Box, Flex } from "@chakra-ui/react";

import { getPersonalInfoFromState } from "@utils/state";
import { ChatBubble, NextButton, Span } from "./components";
import { NatalChart, NatalChartData, NatalChartProps, ChartPosition } from "../NatalChart";

export function NatalChartPreviewSlide() {
  return (
    <Slide
      id="natal-chart-preview"
      type="filler"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
      nextButtonProps={{ title: "Let's go!" }}
    >
      {({ quizState }) => {
        const { yourBirthDate, yourBirthTime, yourBirthLocation } =
          getPersonalInfoFromState(quizState);

        return (
          <AstroChart date={yourBirthDate} time={yourBirthTime} location={yourBirthLocation} />
        );
      }}
    </Slide>
  );
}

function AstroChart(props: NatalChartProps) {
  const { date, time, location, size = 240 } = props;
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();
  const [data, setData] = React.useState<NatalChartData | undefined>(undefined);

  return (
    <Box textColor={"white"}>
      <ChatBubble
        text={`Here it is, your Natal Chart!\n\nWe can now use it as our foundation going forward.`}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && (
        <>
          <Flex
            flexDir={"column"}
            border="1px solid"
            borderColor={"brand.700"}
            borderRadius={"xl"}
            backgroundColor={"brand.900"}
            py={2}
          >
            <NatalChart
              date={date}
              time={time}
              location={location}
              size={size}
              onComplete={setData}
            />

            {data && (
              <Box mb={2} textAlign={"center"}>
                <Text fontSize={"lg"} color="brand.300" fontWeight={"bold"}>
                  {data.horoscope.SunSign.label}
                </Text>
                <Text fontSize={"sm"} color="brand.300">
                  {new Date(data.origin.localTimeFormatted).toLocaleString()}
                </Text>
                <Text fontSize={"sm"} color="brand.300">
                  {location.formattedText}
                </Text>
              </Box>
            )}
          </Flex>

          <Flex display={"n"} my={6} flexDirection={"column"} alignItems={"center"}>
            <Box>
              {data?.horoscope.CelestialBodies.all.map((it: any) => {
                const pos = it.ChartPosition as ChartPosition;
                const relPos = pos.Ecliptic.ArcDegreesFormatted30;
                const [degrees] = relPos.split(" ");
                return (
                  <Text color="brand.600" fontSize={"xs"}>
                    {it.label} at{" "}
                    <Span>
                      {degrees} in {it.Sign.label}
                    </Span>
                  </Text>
                );
              })}
            </Box>
          </Flex>

          <NextButton my={3} onClick={() => submitQuestion()}>
            Next
          </NextButton>
        </>
      )}
    </Box>
  );
}
