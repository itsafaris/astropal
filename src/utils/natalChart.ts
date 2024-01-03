import { Origin, Horoscope } from "circular-natal-horoscope-js";

export interface NatalChart {
  person: {
    birthdate: {
      year: number;
      month: number; // 1 = January, 12 = December!
      day: number;
    };
    birthtime: {
      hour: number; // 24 hour format
      minute: number;
    };
    birthplace: {
      latitute: string;
      longitude: string;
    };
  };
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planets: {
    [planet: string]: {
      sign: string;
      house: number;
    };
  };
  aspects: {
    conjunction: Array<{ planet1: string; planet2: string }>;
    square: Array<{ planet1: string; planet2: string }>;
    opposition: Array<{ planet1: string; planet2: string }>;
    quincunx: Array<{ planet1: string; planet2: string }>;
    quintile: Array<{ planet1: string; planet2: string }>;
    septile: Array<{ planet1: string; planet2: string }>;
    sextile: Array<{ planet1: string; planet2: string }>;
    trine: Array<{ planet1: string; planet2: string }>;
  };
  retrogrades: string[];
  lunarNodes: {
    northNode: string;
    southNode: string;
  };
  //   chartRuler: {
  //     planet: string;
  //     house: number;
  //   };
  //   transits: Array<{ planet: string; aspect: string; target: string }>;
  //   progressions: Array<{ planet: string; sign: string; house: number }>;
}

export function createNatalChartData(input: {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
}): NatalChart {
  const origin = new Origin({
    ...input,
    month: input.month - 1, // 0 = January, 11 = December!
  });

  const horoscope = new Horoscope({
    origin: origin,
    houseSystem: "whole-sign",
    zodiac: "tropical",
    aspectPoints: ["bodies", "points", "angles"],
    aspectWithPoints: ["bodies", "points", "angles"],
    aspectTypes: ["major", "minor"],
    customOrbs: {},
    language: "en",
  });

  const planets: NatalChart["planets"] = {};

  // @ts-ignore
  horoscope.CelestialBodies.all.forEach((it) => {
    planets[it.key as string] = {
      sign: it.Sign.key,
      house: it.House?.id, // sometimes a fixed star does not belong to a house if it's outside our solar system
    };
  });

  // @ts-ignore
  const aspects: NatalChart["aspects"] = {};

  for (let type in horoscope.Aspects.types) {
    // @ts-ignore
    const aspect = horoscope.Aspects.types[type];
    // @ts-ignore
    aspects[type] = aspect.map((it) => ({ planet1: it.point1Key, planet2: it.point2Key }));
  }

  // @ts-ignore
  return {
    person: {
      birthdate: {
        year: horoscope.origin.year,
        month: horoscope.origin.month + 1,
        day: horoscope.origin.date,
      },
      birthtime: {
        hour: horoscope.origin.hour,
        minute: horoscope.origin.minute,
      },
      birthplace: {
        latitute: horoscope.origin.latitude,
        longitude: horoscope.origin.longitude,
      },
    },
    sunSign: horoscope.SunSign.key,
    moonSign: horoscope.CelestialBodies.moon.Sign.key,
    risingSign: horoscope.Ascendant.Sign.key,
    planets: planets,
    aspects: aspects,
    retrogrades: horoscope.CelestialBodies.all
      // @ts-ignore
      .filter((it) => Boolean(it.isRetrograde))
      // @ts-ignore
      .map((it) => it.key),
    lunarNodes: {
      northNode: horoscope.CelestialPoints.northnode.Sign.key,
      southNode: horoscope.CelestialPoints.southnode.Sign.key,
    },
  };
}
