import React, { Fragment, createElement, useEffect, useState } from "react";
import {
  DateValue,
  Selector,
  Slide,
  Title,
  TransitionText,
  useQuizSnapshot,
} from "@martynasj/quiz-lib";
import { Chart } from "@astrodraw/astrochart";

import colorMap from "@images/color_map.png";

import patternIcon1 from "static/images/patterns/pattern-icon-1.svg";
import patternIcon2 from "static/images/patterns/pattern-icon-2.svg";
import patternIcon3 from "static/images/patterns/pattern-icon-3.svg";
import patternIcon4 from "static/images/patterns/pattern-icon-4.svg";
import patternIcon5 from "static/images/patterns/pattern-icon-5.svg";
import patternIcon6 from "static/images/patterns/pattern-icon-6.svg";
import patternIcon7 from "static/images/patterns/pattern-icon-7.svg";
import patternIcon8 from "static/images/patterns/pattern-icon-8.svg";
import patternIcon9 from "static/images/patterns/pattern-icon-9.svg";
import patternIcon10 from "static/images/patterns/pattern-icon-10.svg";

import { TestimonialCard } from "@components/testimonial";
import { StaticImage } from "gatsby-plugin-image";
import { Text, Box, useTheme, Flex, Image } from "@chakra-ui/react";
import { Origin, Horoscope } from "circular-natal-horoscope-js";

import { getPersonalInfoFromState } from "@utils/state";
import { useQuizServiceWrapper } from "./quizServiceWrapper";

import { Span, Subtitle } from "./components";
import { createNatalChartData } from "@utils/natalChart";

import { Time } from "@utils/dates";
import { getOpenaiService } from "@services/openaiService";

const numerologyNumbersJson = [
  {
    Name: "Life Path Number",
    "Significance in Relationships":
      "Reflects life's journey and personal characteristics, influencing relationship style and partner compatibility.",
    "Source of Calculation": "Date of Birth",
    imageUrl: patternIcon1,
  },
  {
    Name: "Expression Number (Destiny Number)",
    "Significance in Relationships":
      "Indicates talents and expression, key to understanding roles in relationships.",
    "Source of Calculation": "Birth Name",
    imageUrl: patternIcon2,
  },
  {
    Name: "Soul Urge Number (Heart's Desire Number)",
    "Significance in Relationships": "Reveals deepest desires and values in relationships.",
    "Source of Calculation": "Vowels in Birth Name",
    imageUrl: patternIcon3,
  },
  {
    Name: "Birthday Number",
    "Significance in Relationships":
      "Highlights specific talents and their role in personal interactions.",
    "Source of Calculation": "Day of Birth",
    imageUrl: patternIcon4,
  },
  {
    Name: "Personality Number",
    "Significance in Relationships":
      "Affects how one is perceived socially, influencing social and romantic relationships.",
    "Source of Calculation": "Consonants in Birth Name",
    imageUrl: patternIcon5,
  },
  {
    Name: "Sun Sign",
    "Significance in Relationships":
      "Determines fundamental personality traits and identity, crucial for compatibility.",
    "Source of Calculation": "Date of Birth",
    imageUrl: patternIcon6,
  },
  {
    Name: "Moon Sign",
    "Significance in Relationships":
      "Reflects emotional inner self and relational emotional needs, essential for emotional connections.",
    "Source of Calculation": "Date and Time of Birth",
    imageUrl: patternIcon7,
  },
  {
    Name: "Venus Sign",
    "Significance in Relationships":
      "Governs love style and preferences in relationships, vital for romantic interactions.",
    "Source of Calculation": "Date and Time of Birth",
    imageUrl: patternIcon8,
  },
  {
    Name: "Mars Sign",
    "Significance in Relationships":
      "Influences assertiveness and pursuit of desires, affecting relationship dynamics.",
    "Source of Calculation": "Date and Time of Birth",
    imageUrl: patternIcon9,
  },
  {
    Name: "Ascendant (Rising Sign)",
    "Significance in Relationships":
      "Represents self-image and initial approach to relationships, impacting first impressions.",
    "Source of Calculation": "Date, Time, and Place of Birth",
    imageUrl: patternIcon10,
  },
];

export function YourGoalSlide() {
  return (
    <Slide
      id="your-goal"
      type="multi"
      variant="list"
      options={[
        {
          text: "Fix relationship problems",
          icon: "🔥",
        },
        {
          text: "Increase relationship satisfaction",
          icon: "💞",
        },
        {
          text: "Keep the current relationship",
          icon: "🤗",
        },
        {
          text: "Other",
          icon: "",
        },
      ]}
    >
      <Title>What are your primary goals regarding relationships?</Title>
      <Subtitle>
        Knowing your <Span>goal</Span> will allow us to provide more tailored advice to you.
      </Subtitle>
      <Selector />
    </Slide>
  );
}

export function YourGenderSlide() {
  return (
    <Slide
      id="your-gender"
      type="single"
      variant="picture"
      size="small"
      options={[
        {
          text: "Female",
          imgComponent: (
            <StaticImage
              alt="image of a female"
              src="../../images/female.png"
              placeholder="blurred"
            />
          ),
        },
        {
          text: "Male",
          imgComponent: (
            <StaticImage alt="image of a male" src="../../images/male.png" placeholder="blurred" />
          ),
        },
        {
          text: "Other",
          imgComponent: (
            <StaticImage
              alt="image of a gender neutral"
              src="../../images/neutral.png"
              placeholder="blurred"
            />
          ),
        },
      ]}
    >
      <Title>Let's start with your gender</Title>
      <Subtitle>
        <Span>Gender</Span> is a key characteristic that allows us to provide a fine-tuned
        relationship guidance.
      </Subtitle>
      <Selector />
    </Slide>
  );
}

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

export function YourBirthDateSlide() {
  return (
    <Slide id="your-birth-date" type="date">
      <Title>When were you born?</Title>
      <Selector />
    </Slide>
  );
}

export function YourBirthTimeSlide() {
  return (
    <Slide id="your-birth-time" type="time" optional>
      {({ quizState }) => {
        return (
          <Fragment>
            <Title>Time of birth?</Title>
            <StaticImage
              src={"../../images/time.png"}
              alt="time of birth"
              placeholder="blurred"
              style={{ borderRadius: 12 }}
            />
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function YourBirthPlaceSlide() {
  return (
    <Slide id="your-birth-place" type="location" placeholder="e.g. New York" optional>
      <Title>Where were you born?</Title>
      <Selector />
    </Slide>
  );
}

export function YourProfileSavingSlide() {
  return (
    <Slide
      id="your-profile-saving"
      type="loading"
      duration={1}
      autoProceed
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
    >
      {({ state }) => {
        return (
          <Fragment>
            <Title color="white" textAlign={"center"}>
              {`Updating your Spiritual Profile`}
            </Title>
            <TransitionText
              height={6}
              textAlign={"center"}
              color="white"
              text={state.isComplete ? `Done!` : "Loading..."}
            />
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

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
          <AstroChart
            date={yourBirthDate}
            time={yourBirthTime}
            location={{
              lat: yourBirthLocation.lat,
              long: yourBirthLocation.long,
            }}
          />
        );
      }}
    </Slide>
  );
}

type AstroChartProps = {
  date: DateValue;
  time: Time;
  location: { lat: number; long: number };
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

    const _ = chart.radix(data);

    // radix.aspects();
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
        <Text color="brand.600">Telsiai, Telšių Apskritis, Lithuania</Text>
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

export function NatalChartInterpretationSlide() {
  return (
    <Slide
      id="natal-chart-interpretation"
      type="filler"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
      nextButtonProps={{ title: "Continue" }}
    >
      <NatalChartInterpreter />
    </Slide>
  );
}

function NatalChartInterpreter() {
  const state = useQuizSnapshot();

  const [interpretation, setInterpretation] = React.useState<string>("");

  React.useEffect(() => {
    if (state.currentSlideID === "natal-chart-interpretation") {
      const { yourBirthDate, yourBirthTime, yourBirthLocation } = getPersonalInfoFromState(
        state.slideStateByID
      );

      const natalChart = createNatalChartData({
        year: yourBirthDate.year,
        month: yourBirthDate.month,
        date: yourBirthDate.day,
        hour: yourBirthTime.time24.hour,
        minute: yourBirthTime.time24.minute,
        latitude: yourBirthLocation.lat,
        longitude: yourBirthLocation.long,
      });

      const openai = getOpenaiService({ mock: false });
      openai.stream(natalChart, "Describe my personality", (text) => {
        setInterpretation(text);
      });
    }
  }, [state.currentSlideID]);

  return <Subtitle>{interpretation}</Subtitle>;
}

export function YourSimilarProfilesSlide() {
  const theme = useTheme();
  return (
    <Slide
      id="similar-profiles"
      type="filler"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
    >
      {({ quizState }) => {
        const { yourZodiac, yourGender } = getPersonalInfoFromState(quizState);

        return (
          <Fragment>
            <Title textAlign={"center"}>{`We helped other ${yourZodiac.name} ${
              !yourGender ? "" : yourGender === "Other" ? "people" : yourGender.toLowerCase() + "s"
            } like you`}</Title>
            <Subtitle textAlign={"center"} color="bg.600">
              We are currently guiding <Span>{yourZodiac.countOfProfiles.toLocaleString()}</Span>{" "}
              people with profiles similar to yours, who report an average <Span>2x</Span>{" "}
              improvement in their relationships after just <Span>two weeks</Span> using our service
            </Subtitle>

            <Flex p={8} gap={2} flexDirection={"column"}>
              {yourZodiac.svgComponent &&
                createElement(yourZodiac.svgComponent, {
                  height: 160,
                  width: "100%",
                  fill: theme.colors.bg["200"],
                  stroke: theme.colors.bg["600"],
                  strokeWidth: 2,
                })}
              <Text
                fontSize={"3xl"}
                fontWeight={"semibold"}
                textAlign={"center"}
                fontFamily={"cursive"}
                color="brand.500"
              >
                {yourZodiac.name}
              </Text>
            </Flex>
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function YourValuesAndPrioritiesSlide() {
  return (
    <Slide
      id="your-values-and-priorities"
      type="single"
      variant="list"
      options={[
        {
          text: "Romance",
          icon: "💞",
        },
        {
          text: "Freedom",
          icon: "🕊",
        },
        {
          text: "Stability",
          icon: "🏠",
        },
        {
          text: "Adventure",
          icon: "🌄",
        },
        {
          text: "Success",
          icon: "🏆",
        },
        {
          text: "Wellness",
          icon: "🧘",
        },
      ]}
    >
      <Title>What is most important to you?</Title>
      <Selector />
    </Slide>
  );
}

export function YourPersonalityTypeSlide() {
  return (
    <Slide
      id="your-personality-type"
      type="single"
      variant="list"
      options={[
        {
          text: "Adventurous and spontaneous",
          icon: "✈️",
        },
        {
          text: "Caring and nurturing",
          icon: "🤗",
        },
        {
          text: "Determined and persistent",
          icon: "🏋️",
        },
        {
          text: "Ambitious and driven",
          icon: "🚀",
        },
        {
          text: "Intellectual and curious",
          icon: "🔍",
        },
        {
          text: "Organized and methodical",
          icon: "🗂️",
        },
        {
          text: "Relaxed and easygoing",
          icon: "🌴",
        },
        {
          text: "Creative and original",
          icon: "🎨",
        },
      ]}
    >
      {({ quizState }) => {
        const { yourName } = getPersonalInfoFromState(quizState);
        return (
          <>
            <Title>{yourName}, which personality type best describes you?</Title>
            <Subtitle>
              We merge astrological insights with your <Span>personal traits</Span> to deliver
              individualized guidance.
            </Subtitle>
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

export function YourSpiritualInvolvementSlide() {
  return (
    <Slide
      id="your-spiritual-involvement"
      type="single"
      variant="list"
      options={[
        {
          text: "I'm new to spirituality",
          icon: "🌱",
        },
        {
          text: "I have a casual interest",
          icon: "🔍",
        },
        {
          text: "I actively practice and study",
          icon: "📚",
        },
        {
          text: "I consider myself deeply committed",
          icon: "🧘‍♂️",
        },
        {
          text: "Spirituality is a core part of my life",
          icon: "✨",
        },
      ]}
    >
      <Title>To what extent are you engaged with spiritual practices and concepts?</Title>
      <Subtitle>
        Knowing your <Span>engagement level</Span> allows us to fine-tune the insights and advice to
        resonate with your spiritual journey.
      </Subtitle>
      <Selector />
    </Slide>
  );
}

function CircleDiv(props: React.ComponentProps<typeof Box>) {
  return (
    <Box
      width={"32px"}
      height={"32px"}
      borderRadius={"full"}
      border="1px solid"
      borderColor={"whiteAlpha.400"}
      shadow={"lg"}
      {...props}
    />
  );
}

export function YourColorResonanceSlide() {
  return (
    <Slide
      id="your-color-resonance"
      type="single"
      variant="list"
      options={[
        {
          text: "Red",
          icon: <CircleDiv backgroundColor={"red"} />,
        },
        {
          text: "Orange",
          icon: <CircleDiv backgroundColor={"orange"} />,
        },
        {
          text: "Yellow",
          icon: <CircleDiv backgroundColor={"yellow"} />,
        },
        {
          text: "Green",
          icon: <CircleDiv backgroundColor={"green"} />,
        },
        {
          text: "Blue",
          icon: <CircleDiv backgroundColor={"blue"} />,
        },
        {
          text: "Indigo",
          icon: <CircleDiv backgroundColor={"indigo"} />,
        },
        {
          text: "Violet",
          icon: <CircleDiv backgroundColor={"violet"} />,
        },
        {
          text: "Pink",
          icon: <CircleDiv backgroundColor={"pink"} />,
        },
        {
          text: "Gold",
          icon: <CircleDiv backgroundColor={"gold"} />,
        },
        {
          text: "Silver",
          icon: <CircleDiv backgroundColor={"silver"} />,
        },
        {
          text: "White",
          icon: <CircleDiv backgroundColor={"white"} />,
        },
        {
          text: "Black",
          icon: <CircleDiv backgroundColor={"black"} />,
        },
      ]}
    >
      <Title>Which color resonates with you the most?</Title>
      <Subtitle>
        Color in astrology reflects <Span>planetary energies</Span> that influence emotional needs,
        impacting relationship compatibility
      </Subtitle>
      <Image mb={8} src={colorMap} borderRadius={"xl"} height={"160px"} mx="auto" />
      <Selector />
    </Slide>
  );
}

export function SocialProofFiller() {
  return (
    <Slide type="filler" id="user-testimonial">
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
        width={"full"}
        mb={5}
      >
        <Text color="white" textAlign="center" fontSize={"4xl"} fontWeight={700}>
          9 out of 10 users
        </Text>

        <Text color="white" textAlign="center" fontSize={"lg"} fontWeight={500}>
          say AstroPal helped overcome relationship challenges.
        </Text>
      </Box>

      <TestimonialCard
        testimonial={{
          authorName: "Louise Peereman",
          text: "Grateful for the genuine support and insights that made a profound difference in my life. Finding love after divorce is challenging, but with your guidance, I feel much more confident in my journey.",
          rating: 5,
          imgComponent: (
            <StaticImage
              layout={"constrained"}
              placeholder={"none"}
              src={"../../images/testimonial-one.jpeg"}
              alt=""
            />
          ),
        }}
      />
    </Slide>
  );
}

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
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
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

type Pos = {
  StartPosition: ChartPosition;
  EndPosition: ChartPosition;
};

type ChartPosition = {
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
};
