import { useEffect, useState } from "react";
import { DateValue, LocationValue, Slide } from "@martynasj/quiz-lib";
import { Chart } from "@astrodraw/astrochart";
import { Text, Box, useTheme, Flex } from "@chakra-ui/react";
import { Origin, Horoscope } from "circular-natal-horoscope-js";

import { getPersonalInfoFromState } from "@utils/state";
import { Span } from "./components";
import { Time } from "@utils/dates";

export function NatalChartPreviewSlide() {
  return (
    <Slide
      id="natal-chart-preview"
      type="filler"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
      nextButtonProps={{ title: "Get my first interpretation" }}
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

type AstroChartProps = {
  date: DateValue;
  time: Time;
  location: LocationValue;
};

function AstroChart(props: AstroChartProps) {
  const { date, time, location } = props;

  const NATAL_CHART_SIZE = 320;

  const theme = useTheme();
  const [origin, setOrigin] = useState<Origin | undefined>(undefined);
  const [horoscope, setHoroscope] = useState<Horoscope | undefined>(undefined);

  useEffect(() => {
    const origin = new Origin({
      year: date.year,
      month: date.month - 1, // 0 = January, 11 = December!
      date: date.day,
      hour: time.time24.hour,
      minute: time.time24.minute,
      latitude: location.lat,
      longitude: location.long,
    });

    setOrigin(origin);

    const horoscope = new Horoscope({
      origin: origin,
    });
    setHoroscope(horoscope);

    var chart = new Chart("paper1234", NATAL_CHART_SIZE * 2, NATAL_CHART_SIZE * 2, {
      COLORS_SIGNS: [
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.4)",
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.4)",
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.4)",
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.4)",
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.4)",
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.4)",
      ],
      LINE_COLOR: theme.colors.bg[400],
      CIRCLE_COLOR: theme.colors.bg[500],
      SIGNS_COLOR: theme.colors.brand[500], // zodiakai
      POINTS_COLOR: theme.colors.brand[700], // planetos
      CUSPS_FONT_COLOR: theme.colors.bg[400],
      SYMBOL_AXIS_FONT_COLOR: theme.colors.bg[600], // As, Ds, Mc, Ic
      COLOR_BACKGROUND: "rgba(0,0,0,0.2)",
      CUSPS_STROKE: 1,
    });

    var data = {
      planets: {} as Record<string, [number]>,
      cusps: [] as number[],
    };

    horoscope.Houses.forEach((h: any) => {
      const pos = h.ChartPosition as Pos;
      const degrees = pos.StartPosition.Ecliptic.DecimalDegrees;
      data.cusps.push(degrees);
    });

    const a = horoscope.CelestialBodies.all;
    a.forEach((it: any) => {
      const pos = it.ChartPosition as ChartPosition;
      data.planets[it.label] = [pos.Ecliptic.DecimalDegrees];
    });

    const radix = chart.radix(data);

    radix.aspects();
  }, []);

  return (
    <div>
      <div style={{ height: NATAL_CHART_SIZE, width: NATAL_CHART_SIZE }}>
        <div id="paper1234" style={{ transform: "scale(0.5)", transformOrigin: "0 0" }}></div>
      </div>
      <Box mb={2} textAlign={"center"}>
        <Text fontSize={"2xl"} my={3} color="brand.700" fontWeight={"bold"}>
          {horoscope?.SunSign.label}
        </Text>
        <Text color="brand.600">{new Date(origin?.localTimeFormatted).toLocaleString()}</Text>
        <Text color="brand.600">{location.formattedText}</Text>
      </Box>

      <Flex my={6} flexDirection={"column"} alignItems={"center"}>
        <Box>
          {horoscope?.CelestialBodies.all.map((it: any) => {
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
    </div>
  );
}
