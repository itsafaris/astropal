import { Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Slide, useQuizState } from "@martynasj/quiz-lib";
import { getAstrologerOrDefault } from "@utils/astrologers";
import { getTypedQuizState } from "@utils/state";

import { NextButton, SlideHeading, Span } from "../components";

export function NatalChartStatsSlide() {
  return (
    <Slide id="natal-chart-stats" type="filler">
      <_NatalChartStatsSlide />
    </Slide>
  );
}

export function _NatalChartStatsSlide() {
  const { quizState } = useQuizState();
  const p = getTypedQuizState(quizState);

  const astrologer = getAstrologerOrDefault(p.astrologerID);

  return (
    <Stack>
      <SlideHeading mb={2}>
        🔎 Astrologer{" "}
        <Span fontWeight={"bold"} color="purple.600">
          {astrologer.name}
        </Span>{" "}
        has found some interesting insights in{" "}
        <Span fontWeight={"bold"} color="purple.600">
          your natal chart
        </Span>
      </SlideHeading>

      <TableContainer>
        <Table size="md">
          <Thead backgroundColor="gray.100">
            <Tr>
              <Th>Insights</Th>
              <Th isNumeric>Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td fontWeight={"semibold"}>😨 Hidden fears</Td>
              <Td isNumeric fontSize={"2xl"} fontWeight={"bold"} color="red.500">
                3
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight={"semibold"}>🏆 Significant talents</Td>
              <Td isNumeric fontSize={"2xl"} fontWeight={"bold"}>
                7
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight={"semibold"}>⛓️ Toxicity patterns</Td>
              <Td isNumeric fontSize={"2xl"} fontWeight={"bold"}>
                4
              </Td>
            </Tr>

            <Tr>
              <Td fontWeight={"semibold"} lineHeight={1.5}>
                <Text color={"purple.500"}>+18 unique aspects</Text>
              </Td>
              <Td isNumeric></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <NextButton>Continue</NextButton>
    </Stack>
  );
}
