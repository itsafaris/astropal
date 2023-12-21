import React, { Fragment, createElement } from "react";
import { Callout, Selector, Slide, Title, TransitionText } from "@martynasj/quiz-lib";

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
import PythagoreanNumbers from "@components/svg/pythagoreanNumbers";
import { StaticImage } from "gatsby-plugin-image";
import { Text, Box, useTheme, Flex, Image } from "@chakra-ui/react";

import { getPersonalInfoFromState } from "@utils/state";
import { useQuizServiceWrapper } from "./quizServiceWrapper";

import { Span, Subtitle, ImageWithCaptionWrapper, Caption } from "./components";

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

export function SingleRelationshipYourGoalSlide() {
  return (
    <Slide
      id="your-goal-single"
      type="multi"
      variant="list"
      options={[
        {
          text: "Find a soulmate",
          icon: "💞",
        },
        {
          text: "Self improvement",
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
    <Slide id="your-birth-name" type="short-text" label="Enter your name" placeholder="e.g. John">
      <Title>What's your name?</Title>
      <ImageWithCaptionWrapper>
        <PythagoreanNumbers width={"100%"} height={"unset"} color={"bg.500"} />
        <Caption>
          <Span>Destiny Number</Span> is derived from your name. It unveils your natural attractions
          in partnerships.
        </Caption>
      </ImageWithCaptionWrapper>
      <Selector />
    </Slide>
  );
}

export function YourBirthDateSlide() {
  return (
    <Slide id="your-birth-date" type="date">
      {({ quizState }) => {
        const { yourName } = getPersonalInfoFromState(quizState);
        return (
          <Fragment>
            <Title>
              <Text as="span">{yourName}</Text>
              {", "}
              when were you born?
            </Title>
            <ImageWithCaptionWrapper>
              <StaticImage
                src={"../../images/birth_inception.png"}
                alt="child birth"
                style={{ height: "180px", borderRadius: 12 }}
              />
              <Caption>
                Your birth date determines the key indicators like <Span>Life Path Number</Span>
              </Caption>
            </ImageWithCaptionWrapper>
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

      <ImageWithCaptionWrapper>
        <StaticImage
          src={"../../images/birth_inception.png"}
          alt="child birth"
          style={{ height: "180px", borderRadius: 12 }}
        />
        <Caption>
          The birthplace helps to pinpoint the arrangement of <Span>astrological houses</Span> in
          one's birth chart
        </Caption>
      </ImageWithCaptionWrapper>
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

export function YourSpiritualProfileIntroSlide() {
  return (
    <Slide
      type="filler"
      id={"your-spiritual-profile-intro"}
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
      containerProps={{ color: "bg.900" }}
    >
      <Title>Creation of your Spiritual Profile</Title>

      <Subtitle>
        Your <Span>name</Span> and <Span>date of birth</Span> hold the key to unlocking personalized
        insights about you.
      </Subtitle>

      <Box mb={4} width={"180px"} mx={"auto"} borderRadius={"full"} overflow={"hidden"}>
        <StaticImage
          alt="picture of a significant you"
          src="../../images/astro_profile.png"
          quality={60}
          placeholder="blurred"
        />
      </Box>

      <Box my={8}>
        <Text mb={2}>Significance of numbers</Text>
        <Flex
          direction="column"
          w="100%"
          fontSize={"14px"}
          color="brand.500"
          fontStyle={"italic"}
          fontFamily={"serif"}
          bg="bg.100"
          py={2}
          px={4}
          borderRadius={"xl"}
        >
          {numerologyNumbersJson.map((n) => {
            return (
              <Flex key={n.Name} py={2} gap={3} flexDirection={"row"} alignItems={"flex-start"}>
                <Image src={n.imageUrl} height={"22px"} mx="auto" />

                <Flex flexDirection={"column"} flex={1}>
                  <Box>
                    <Text color="bg.900" fontWeight={"bold"}>
                      {n.Name}
                    </Text>
                  </Box>

                  <Box>
                    <Text>{n["Significance in Relationships"]}</Text>
                  </Box>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Box>
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
