import { Horoscope } from "circular-natal-horoscope-js";

export interface NatalChart {
  person: {
    name: string;
    birthdate: string;
    birthtime: string;
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
}

// export interface NatalChart {
//   person: {
//     name: string;
//     birthdate: string;
//     birthtime: string;
//     birthplace: {
//       latitute: string;
//       longitude: string;
//     };
//   };
//   sunSign: string;
//   moonSign: string;
//   risingSign: string;
//   planets: {
//     [planet: string]: {
//       sign: string;
//       house: number;
//     };
//   };
//   aspects: {
//     conjunction: Array<{ planet1: string; planet2: string }>;
//     square: Array<{ planet1: string; planet2: string }>;
//     opposition: Array<{ planet1: string; planet2: string }>;
//     quincunx: Array<{ planet1: string; planet2: string }>;
//     quintile: Array<{ planet1: string; planet2: string }>;
//     septile: Array<{ planet1: string; planet2: string }>;
//     sextile: Array<{ planet1: string; planet2: string }>;
//     trine: Array<{ planet1: string; planet2: string }>;
//   };
//   chartRuler: {
//     planet: string;
//     house: number;
//   };
//   retrogrades: string[];
//   lunarNodes: {
//     northNode: string;
//     southNode: string;
//   };
//   transits: Array<{ planet: string; aspect: string; target: string }>;
//   progressions: Array<{ planet: string; sign: string; house: number }>;
// }

export function createNatalChartData(input: Horoscope): NatalChart {
  const planets: NatalChart["planets"] = {};

  // @ts-ignore
  input.CelestialBodies.all.forEach((it) => {
    planets[it.key as string] = {
      sign: it.Sign.key,
      house: it.House.id,
    };
  });

  // @ts-ignore
  const aspects: NatalChart["aspects"] = {};

  for (let type in input.Aspects.types) {
    // @ts-ignore
    const aspect = input.Aspects.types[type];
    // @ts-ignore
    aspects[type] = aspect.map((it) => ({ planet1: it.point1Key, planet2: it.point2Key }));
  }
  // @ts-ignore
  return {
    person: {
      name: "",
      birthdate: `${input.origin.year}-${input.origin.month + 1}-${input.origin.date}`,
      birthtime: `${input.origin.hour}:${input.origin.minute}`,
      birthplace: {
        latitute: input.origin.latitude,
        longitude: input.origin.longitude,
      },
    },
    sunSign: input.SunSign.key,
    moonSign: input.CelestialBodies.moon.Sign.key,
    risingSign: input.Ascendant.Sign.key,
    planets: planets,
    aspects: aspects,
    retrogrades: input.CelestialBodies.all
      // @ts-ignore
      .filter((it) => Boolean(it.isRetrograde))
      // @ts-ignore
      .map((it) => it.key),
    lunarNodes: {
      northNode: input.CelestialPoints.northnode.Sign.key,
      southNode: input.CelestialPoints.southnode.Sign.key,
    },
  };
}
