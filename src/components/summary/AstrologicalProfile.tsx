import React from "react";
import {
  Box,
  Text,
  Heading,
  useTheme,
  Flex,
  BoxProps,
  Grid,
  Stack,
  Container,
} from "@chakra-ui/react";
import { QuizStateParsed } from "@utils/state";
import { getZodiacSign } from "@services/zodiacService";
import { HarmonyChart } from "./HarmonyChart/HarmonyChart";

import { NatalChart, ChartPosition, NatalChartData } from "../NatalChart";
import { toTitleCase } from "@utils/string";

export function AstrologicalProfileSection({ quizState }: { quizState?: QuizStateParsed }) {
  const theme = useTheme();
  const [data, setData] = React.useState<NatalChartData | undefined>(undefined);

  const state = React.useMemo(() => {
    const res = quizState;
    if (!res) {
      return;
    }

    res.yourZodiac = getZodiacSign(
      new Date(
        res.yourBirthDate.year,
        res.yourBirthDate.month - 1,
        res.yourBirthDate.day
      ).toISOString()
    );

    return res;
  }, [quizState]);

  if (!state) {
    return null;
  }

  return (
    <Box id="astrological-profile-section" my={20} bgGradient="linear(to-t, bg.50, #350956)">
      <Container>
        <Heading
          textAlign={"center"}
          fontWeight={"bold"}
          mb={12}
          mx={8}
          fontSize={"2xl"}
          color="white"
        >
          Your Astrological Profile Is Ready
        </Heading>

        <Flex flexDirection={"column"} gap={3} p={4} borderRadius={"xl"}>
          <Heading
            px={4}
            py={4}
            fontWeight={"semibold"}
            fontSize={{ base: "xl" }}
            color="brand.700"
            textAlign={"center"}
          >
            On average,{" "}
            <Text as="span" color="green.400">
              93%
            </Text>{" "}
            of our users report feeling less self-doubt and greater clarity in their lives within
            just{" "}
            <Text as="span" color="green.400">
              14 days
            </Text>{" "}
            of consulting personalized astrologer.
          </Heading>

          <Flex width={"full"} height={500} justifyContent={"center"} alignItems={"center"} p={4}>
            <Box
              height={1}
              width={1}
              borderRadius={"50%"}
              position={"absolute"}
              zIndex={0}
              boxShadow={"0px 0px 150px 100px #00ffa7"}
              opacity={0.7}
            />

            <HarmonyChart
              size={300}
              items={[
                {
                  id: "a",
                  title: "Personal growth",
                  value: 1,
                },
                {
                  id: "b",
                  title: "Career",
                  value: 5,
                },
                {
                  id: "c",
                  title: "Timing",
                  value: 3,
                },
                {
                  id: "d",
                  title: "Emotional well-being",
                  value: 2,
                },
                {
                  id: "e",
                  title: "Relationship",
                  value: 3,
                },
                {
                  id: "f",
                  title: "Something",
                  value: 3,
                },
              ]}
            />
          </Flex>

          <Flex
            flexDirection={"column"}
            gap={3}
            backgroundColor="brand.900"
            p={3}
            borderRadius={"xl"}
            position={"relative"}
            overflow={"hidden"}
            fontStyle="italic"
            fontFamily={"serif"}
            fontWeight={"bold"}
          >
            <Stack
              spacing={1}
              mx="auto"
              width={"100%"}
              p={4}
              borderRadius={"xl"}
              backgroundColor={"brand.800"}
            >
              <Text
                fontSize={"3xl"}
                fontWeight={"black"}
                color="brand.200"
                // textAlign={"center"}
                mb={5}
                mt={2}
              >
                Your Astrological Profile
              </Text>
              <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"2xl"} fontWeight={"semibold"} color="brand.200">
                  Name:
                </Text>
                <Text fontSize={"2xl"} fontWeight={"semibold"} color="brand.200">
                  {state.firstName}
                </Text>
              </Flex>

              <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={"semibold"} color="brand.200">
                  Birth date:
                </Text>
                <Text color="brand.300">
                  {" "}
                  {state.yourBirthDate.day}-{state.yourBirthDate.month}-{state.yourBirthDate.year}
                </Text>
              </Flex>

              <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={"semibold"} color="brand.200">
                  Birth time:
                </Text>
                <Text color="brand.300">
                  {state.yourBirthTime.time24.hour}:{state.yourBirthTime.time24.minute}
                </Text>
              </Flex>

              <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={"semibold"} color="brand.200">
                  Birth location:
                </Text>
                <Text color="brand.300">{state.yourBirthLocation.formattedText}</Text>
              </Flex>
            </Stack>

            <Grid gap={3} alignItems={"center"} gridTemplateColumns={"1fr 1fr"}>
              <Flex
                p={4}
                borderRadius={"xl"}
                backgroundColor={"brand.700"}
                height={"full"}
                width={"full"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={4}
              >
                <Text fontWeight={"semibold"} color="brand.200">
                  Zodiac:
                </Text>

                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={1}
                  height={"full"}
                  width={"full"}
                >
                  {React.createElement(state.yourZodiac.svgComponent, {
                    height: 100,
                    width: "100%",
                    fill: "white",
                    stroke: theme.colors.brand["100"],
                    strokeWidth: 3,
                  })}

                  <Text
                    fontWeight={"semibold"}
                    fontFamily={"serif"}
                    fontSize={"3xl"}
                    fontStyle={"italic"}
                    color="white"
                  >
                    {toTitleCase(state.yourZodiac.name)}
                  </Text>
                </Flex>
              </Flex>

              <Flex
                p={4}
                borderRadius={"xl"}
                backgroundColor={"brand.700"}
                height={"full"}
                width={"full"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={4}
              >
                <Text fontWeight={"semibold"} color="brand.200">
                  Natal chart:
                </Text>

                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={1}
                  height={"full"}
                  width={"full"}
                >
                  <NatalChart
                    date={state.yourBirthDate}
                    time={state.yourBirthTime}
                    location={state.yourBirthLocation}
                    size={200}
                    onComplete={setData}
                  />
                </Flex>
              </Flex>
            </Grid>

            <Flex
              p={4}
              borderRadius={"xl"}
              backgroundColor={"brand.800"}
              height={"full"}
              width={"full"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              gap={4}
              position={"relative"}
            >
              <Text fontWeight={"semibold"} color="brand.200" fontSize={"xl"}>
                Description:
              </Text>

              <Text color="brand.300">
                Your astrological profile is a cosmic snapshot of the positions of celestial bodies
                at the moment of your birth, unveiling the unique energies that shape your
                personality and life path. The sun sign represents your core identity, the moon
                reflects your emotional instincts, and the rising sign signifies your outward
                demeanor.
              </Text>
            </Flex>

            <Box
              width={"full"}
              height={200}
              bgGradient="linear(to-t, brand.900 20%, transparent)"
              position={"absolute"}
              bottom={0}
              left={0}
              zIndex={1}
            />

            {/* <Flex my={6} flexDirection={"column"} alignItems={"center"} width={"full"}>
            <Box>
              {data?.horoscope.CelestialBodies.all.map((it: any) => {
                const pos = it.ChartPosition as ChartPosition;
                const relPos = pos.Ecliptic.ArcDegreesFormatted30;
                const [degrees] = relPos.split(" ");
                return (
                  <Text color="brand.600" fontSize={"xs"}>
                    {it.label} at{" "}
                    <Text color="brand.500" fontWeight={"semibold"}>
                      {degrees} in {it.Sign.label}
                    </Text>
                  </Text>
                );
              })}
            </Box>
          </Flex> */}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
