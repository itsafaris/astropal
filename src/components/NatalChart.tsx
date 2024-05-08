import React from "react";
import { DateValue, LocationValue } from "@martynasj/quiz-lib";
import type { Chart as ChartType } from "@astrodraw/astrochart";
import { useTheme, Flex } from "@chakra-ui/react";
import { Origin, Horoscope } from "circular-natal-horoscope-js";

import { Time } from "@utils/dates";

interface Pos {
  StartPosition: ChartPosition;
  EndPosition: ChartPosition;
}

export interface ChartPosition {
  horizonDegrees?: number;
  eclipticDegrees?: number;
  Horizon: {
    DecimalDegrees: number;
    ArcDegrees: {
      degrees: number;
      minutes: number;
      seconds: number;
    };
    ArcDegreesFormatted: string;
    ArcDegreesFormatted30: string;
  };
  Ecliptic: {
    DecimalDegrees: number;
    ArcDegrees: {
      degrees: number;
      minutes: number;
      seconds: number;
    };
    ArcDegreesFormatted: string;
    ArcDegreesFormatted30: string;
  };
}

export interface NatalChartProps {
  date: DateValue;
  time: Time;
  location: LocationValue;
  size?: number;
  onComplete?: (data: NatalChartData) => void;
}

export interface NatalChartData {
  origin: Origin;
  horoscope: Horoscope;
}

export function NatalChart(props: NatalChartProps) {
  const { date, time, location, size = 240, onComplete } = props;
  const theme = useTheme();

  React.useEffect(() => {
    const ChartModule = require("@astrodraw/astrochart").Chart as typeof ChartType;

    const origin = new Origin({
      year: date.year,
      month: date.month - 1, // 0 = January, 11 = December!
      date: date.day,
      hour: time.time24.hour,
      minute: time.time24.minute,
      latitude: location.lat,
      longitude: location.long,
    });

    const horoscope = new Horoscope({
      origin: origin,
    });

    onComplete?.({ origin, horoscope });

    const chart = new ChartModule("natal-chart-1", size * 2, size * 2, {
      COLORS_SIGNS: [
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
      ],
      LINE_COLOR: "black" ?? theme.colors.bg[300],
      CIRCLE_COLOR: "black" ?? theme.colors.bg[300],
      SIGNS_COLOR: "black" ?? theme.colors.brand[400], // zodiakai
      POINTS_COLOR: "black" ?? theme.colors.brand[200], // planetos
      CUSPS_FONT_COLOR: "black" ?? theme.colors.bg[400],
      SYMBOL_AXIS_FONT_COLOR: "black" ?? theme.colors.brand[400], // As, Ds, Mc, Ic
      COLOR_BACKGROUND: "white" ?? "rgba(0,0,0,0.2)",
      CUSPS_STROKE: 1,
    });

    const data = {
      planets: {} as Record<string, [number]>,
      cusps: [] as number[],
    };

    horoscope.Houses.forEach((h: any) => {
      const pos = h.ChartPosition as Pos;
      const degrees = pos.StartPosition.Ecliptic.DecimalDegrees;
      data.cusps.push(degrees);
    });

    horoscope.CelestialBodies.all.forEach((it: any) => {
      const pos = it.ChartPosition as ChartPosition;
      data.planets[it.label] = [pos.Ecliptic.DecimalDegrees];
    });

    const radix = chart.radix(data);

    radix.aspects();
  }, []);

  return (
    <Flex
      justifyContent={"center"}
      style={{ height: size, width: size }}
      mx="auto"
      position={"relative"}
    >
      <div
        id="natal-chart-1"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "scale(0.5)",
          transformOrigin: "0 0",
        }}
      />
    </Flex>
  );
}
