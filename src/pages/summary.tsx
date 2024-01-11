import React, { ComponentProps, useEffect, useState } from "react";
import {
  Box,
  Container,
  Text,
  Stack,
  Heading,
  Button,
  Icon,
  Flex,
  useTheme,
} from "@chakra-ui/react";
import { Link, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { CheckIcon, CloseIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { orderBy, take } from "lodash";

import { TopNavigation } from "@components/topnavigation";
import { loadQuizState } from "@utils/localStorage";
import { QuizStateParsed } from "@utils/state";
import { BoltIcon, InfinityIcon, MoonIcon } from "@components/svg/icons";

type Testimonial = {
  name: string;
  quote: string;
  question: string;
  avatar: React.ReactNode;
  commentAge: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Linda Thompson",
    quote:
      "Astropal provided me with clear insights into my career path that aligned perfectly with my sun sign's strengths. I got the promotion!",
    question: "Should I change my job now or wait?",
    avatar: <StaticImage alt="Astropal user image" src="../images/user1.png" />,
    commentAge: "7d",
  },
  {
    name: "Michelle Richards",
    quote:
      "I was skeptical at first, but the relationship advice was spot-on. my partner and I have never been closer. Thank you",
    question: "Is it a good time to invest my savings?",
    avatar: <StaticImage alt="Astropal user image" src="../images/user2.png" />,
    commentAge: "4d",
  },
  {
    name: "Jennifer Miller",
    quote:
      "Astropal's numerology reading was a game-changer for my personal growth. I've found a new sense of purpose.",
    question: "Will I find a meaningful relationship soon?",
    avatar: <StaticImage alt="Astropal user image" src="../images/user3.png" />,
    commentAge: "1w",
  },
  {
    name: "Barbara Johnson",
    quote:
      "Thanks to Astropal, I made a confident financial decision during Mercury Retrograde. It paid off big time!",
    question: "How can I improve my self-care routine?",
    avatar: <StaticImage alt="Astropal user image" src="../images/user4.png" />,
    commentAge: "3w",
  },
  {
    name: "Michael Andrews",
    quote:
      "I relocated my house based on Astropal's advice, aligning with my zodiac's energy flow. Best decision ever!",
    question: "What's the best time to launch my new product?",
    avatar: <StaticImage alt="Astropal user image" src="../images/user5.png" />,
    commentAge: "2m",
  },
];

const exampleQuestions = [
  {
    group: "Career  💼",
    color: "teal",
    questions: [
      { text: "What job aligns with my astrological strengths?", when: 1 },
      { text: "Is this the right time for a career change?", when: 3 },
      { text: "How can I deal with office politics according to my sign?", when: 12 },
      { text: "What should I focus on for professional development?", when: 18 },
      { text: "When's the best time to ask for a promotion?", when: 24 },
    ],
  },
  {
    group: "Love  💖",
    color: "red",
    questions: [
      { text: "What signs am I most compatible with for a romantic relationship?", when: 2 },
      { text: "How can I enhance the connection with my current partner?", when: 8 },
      { text: "When will I find love?", when: 11 },
      { text: "What should I do to prepare for a significant relationship?", when: 14 },
      { text: "How can I use astrology to overcome challenges in my love life?", when: 15 },
    ],
  },
  {
    group: "Finances  💸",
    color: "orange",
    questions: [
      { text: "What's the outlook on my financial prosperity this year?", when: 1 },
      { text: "When is a good time to make a significant investment?", when: 2 },
      { text: "How can I improve my financial stability through astrology?", when: 6 },
      { text: "Is this a good year to buy or sell property?", when: 8 },
      { text: "What should I be cautious about financially in the coming months?", when: 11 },
    ],
  },
  {
    group: "Personal Growth  🌱",
    color: "green",
    questions: [
      { text: "How can I use astrology to enhance my personal development?", when: 1 },
      { text: "Which habits should I develop for spiritual growth?", when: 3 },
      { text: "What are my hidden talents and how can I nurture them?", when: 4 },
      { text: "How can I find motivation based on my astrological chart?", when: 8 },
      { text: "What self-care practices are most beneficial for my sign?", when: 10 },
    ],
  },
];

export default function SummaryPage({ location }: PageProps) {
  const [quizState, setQuizState] = useState<QuizStateParsed | undefined>();

  useEffect(() => {
    const q = loadQuizState();
    setQuizState(q);
  }, []);

  return (
    <Box py={4} pb={24} bgGradient="linear(to-b, bg.50, bg.100)" color="bg.900">
      <Container>
        <TopNavigation />
      </Container>
      <HeroSection quizState={quizState} />
      <Container>
        <AreasOfLifeGuidance />
        <ExampleQuestionsSection />
        <SimilarUsersLikeYouSection />
        <TestimonialsSection />
        <ComparisonWithRegularAstrologerSection />
        <MediaCoverage />
      </Container>
    </Box>
  );
}

export function MediaCoverage() {
  return (
    <Stack id="media-coverage" gap={6} alignItems={"center"} my={10}>
      <Text fontSize={"md"} color="bg.500" fontWeight={"semibold"}>
        As featured in:
      </Text>

      <Flex width={"200px"} opacity={0.8}>
        <StaticImage alt="New york times" src="../images/media-nyt.svg" />
      </Flex>

      <Flex width={"120px"} opacity={0.8}>
        <StaticImage alt="Cosmopolitan" src="../images/media-cosmopolitan.svg" />
      </Flex>

      <Flex width={"90px"} opacity={0.8}>
        <StaticImage alt="Vogue" src="../images/media-vogue.svg" />
      </Flex>

      <Flex width={"100px"} opacity={0.8}>
        <StaticImage alt="The guardian" src="../images/media-guardian.svg" />
      </Flex>
    </Stack>
  );
}

function ExampleQuestionsSection() {
  const mixedQuestionGroups = take(
    orderBy(
      exampleQuestions.flatMap((g) => {
        return g.questions.map((q) => {
          return {
            text: q.text,
            when: q.when,
            color: g.color,
            group: g.group,
          };
        });
      }),
      "when"
    ),
    8
  );

  return (
    <Box id="example-questions-section" as="section" my={20}>
      <Heading fontSize={"3xl"} mb={10} mx={4} textAlign={"center"} color="white">
        Our user's are asking questions every minute
      </Heading>
      <QuestionsWeHaveAnswered />

      <Stack spacing={4}>
        {mixedQuestionGroups.map((q, idx) => {
          const gap = idx % 2 === 0 ? "48px" : "96px";
          return (
            <Flex key={q.text} position={"relative"} gap={2}>
              <Box
                visibility={"hidden"}
                height={"2px"}
                width={gap}
                bg="bg.400"
                ml={-4}
                mt={"10px"}
              ></Box>
              <Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <Text fontWeight={"semibold"} color={`${q.color}.400`} fontSize={"sm"}>
                    {q.group}
                  </Text>
                  <Text fontSize={"xs"}>
                    Asked{" "}
                    <Text as="span" fontWeight={"bold"}>
                      {q.when} min ago
                    </Text>{" "}
                  </Text>
                </Stack>
                <Stack bg={"bg.900"} py={2} px={4} borderRadius={"xl"}>
                  <Text fontSize={"sm"} fontWeight={"semibold"} color="black">
                    → {q.text}
                  </Text>
                </Stack>
              </Stack>
            </Flex>
          );
        })}

        <Box display={"none"}>
          {exampleQuestions.map((g) => {
            return (
              <Box key={g.group} borderRadius={"xl"} py={3} color="black">
                <Text
                  fontSize={"lg"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  mb={4}
                  color={`${g.color}.100`}
                  whiteSpace={"pre"}
                >
                  {g.group}
                </Text>

                <Stack spacing={0} direction={"row"} position={"relative"} alignItems={"stretch"}>
                  <Box width={"2px"} bg="bg.400"></Box>
                  <Stack spacing={4}>
                    {g.questions.map((q, idx) => {
                      const gap = idx % 2 === 0 ? "24px" : "48px";
                      return (
                        <Flex key={q.text} position={"relative"}>
                          <Box height={"2px"} width={gap} bg="bg.400" mt={4}></Box>
                          <Stack bg={"white"} py={2} px={4} borderRadius={"xl"}>
                            <Text fontSize={"sm"} fontWeight={"semibold"} color="black">
                              → {q.text}
                            </Text>
                            <Text fontSize={"xs"} color={`${g.color}.500`}>
                              Asked{" "}
                              <Text as="span" fontWeight={"bold"}>
                                {q.when} min ago
                              </Text>{" "}
                            </Text>
                          </Stack>
                        </Flex>
                      );
                    })}
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Stack>

      <Stack alignItems={"center"} my={16} px={6}>
        <Heading fontSize={"xl"} textAlign={"center"} mb={2}>
          You can ask any question you can think of, your personal astrologer will answer instantly
        </Heading>
        <StaticImage
          height={120}
          src="../images/astrologer.png"
          alt="Astrologer, sitting and thinking"
        />
        <CTALinkToPricing id="comparison-section-cta" />
      </Stack>
    </Box>
  );
}

function QuestionsWeHaveAnswered() {
  return (
    <Stack my={8} spacing={2} justifyContent={"center"} alignItems={"center"}>
      <HappyCustomersCounter />
      <Text fontSize={{ base: "xs" }} fontWeight={"bold"}>
        Questions answered today
      </Text>
    </Stack>
  );
}

function AreasOfLifeGuidance() {
  return (
    <Box id="guidance-section" my={20}>
      <Heading
        textAlign={"center"}
        fontWeight={"bold"}
        mb={12}
        mx={8}
        fontSize={"2xl"}
        color="white"
      >
        Life's uncertainties shouldn't overshadow your journey
      </Heading>

      <Box borderRadius={"xl"} overflow={"hidden"} backgroundColor={"bg.150"} pb={12}>
        <StaticImage
          style={{ height: "200px" }}
          alt="A person facing uncertainty in their life"
          src="../images/uncertain_life.png"
        />
        <Stack mt={8} spacing={4}>
          <Feature2
            title="Uncertain Decisions"
            text="Stop second-guessing your next big life change. Our astrologer offers the assurance you need."
            emoji="🤔"
          />
          <Separator />
          <Feature2
            title="Identity Quest"
            text="Feeling lost in the crowd? We will help you pinpoint your unique strengths and path."
            emoji="🌟"
          />
          <Separator />
          <Feature2
            title="Missed Opportunities"
            text="Worried you're overlooking life's 'what ifs'? Our insights will help you catch the right waves."
            emoji="⏳"
          />
          <Separator />
          <Feature2
            title="Relationship Struggles"
            text="Tired of the guessing game in relationships? Gain understanding to foster deeper connections."
            emoji="💞"
          />
          <Separator />
          <Feature2
            title="Financial Uncertainty"
            text="Confused about money matters? Let the stars align your financial decisions toward stability."
            emoji="💰"
          />
        </Stack>
      </Box>
    </Box>
  );
}

function Separator() {
  return (
    <Flex width={"full"} alignItems={"center"} flexDirection={"column"}>
      <Box height={"2px"} width="80%" backgroundColor={"bg.200"} borderRadius={"full"} />
    </Flex>
  );
}

function SimilarUsersLikeYouSection() {
  return (
    <Box p={2} bg="teal.800" borderRadius={"xl"}>
      <Heading px={4} py={4} fontWeight={"semibold"} fontSize={{ base: "2xl" }} color="brand.700">
        On average,{" "}
        <Text as="span" color="green.400">
          93%
        </Text>{" "}
        of our users report feeling less self-doubt and greater clarity in their lives within just{" "}
        <Text as="span" color="green.400">
          14 days
        </Text>{" "}
        of consulting personalized astrologer.
      </Heading>

      <Box mt={4} overflow={"hidden"}>
        <StaticImage
          alt="Clarity increase when using astrologer guidance chart"
          src="../images/clarity_chart.png"
        />
      </Box>
    </Box>
  );
}

function TestimonialsSection() {
  return (
    <Box id="testimonials-section" as="section" my={12}>
      <Heading textAlign={"center"} fontSize={"3xl"} mb={10} color="white">
        Hear it <br /> from our users
      </Heading>
      <Stack>
        {testimonials.map((testimonial) => {
          return <TestimonialCard key={testimonial.name} testimonial={testimonial} />;
        })}
      </Stack>
    </Box>
  );
}

function ComparisonWithRegularAstrologerSection() {
  return (
    <Box id="comparison-with-regular-astrologer-section" as="section" px={2}>
      <Heading mb={10} textAlign={"center"} color="white">
        10x better than your regular astrologer
      </Heading>
      <Stack spacing={8}>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <StaticImage src={`../images/favicon.png`} alt="Astropal logo" height={35} width={35} />
            <Text fontSize={"md"} fontWeight={"bold"} color="brand.600">
              Your Personalized Astrologer
            </Text>
          </Stack>
          <Stack spacing={1}>
            <ComparisonItem title="Communicates like a real person" isBenefit />
            <ComparisonItem title="Instant access, no need to schedule in advance" isBenefit />
            <ComparisonItem title="At-Home Privacy and comfort" isBenefit />
            <ComparisonItem title="100% Hyper-Personalized Readings" isBenefit />
            <ComparisonItem title="Uses accurate Real-Time Astronomical Data" isBenefit />
            <ComparisonItem title="Does not make mistakes, 100% accurate" isBenefit />
            <ComparisonItem title="Super cheap sessions" isBenefit />
          </Stack>
        </Stack>

        <Stack>
          <Text fontSize={"md"} fontWeight={"bold"} color="brand.600" whiteSpace={"pre-wrap"}>
            👩‍💼 {"   "}Regular Astrologer
          </Text>
          <Stack spacing={1}>
            <ComparisonItem title="Communicates like a real person" isBenefit />
            <ComparisonItem title="Busy, you need to fit their schedule" />
            <ComparisonItem title="Requires sharing personal issues in person." />
            <ComparisonItem title="Often one-size-fits-all advice" />
            <ComparisonItem title="May not use up-to-the-minute celestial data in readings." />
            <ComparisonItem title="Prone to make mistakes" />

            <ComparisonItem title="Very expensive, pay by the hour" />
          </Stack>
        </Stack>
      </Stack>
      <Flex justifyContent={"center"}>
        <CTALinkToPricing id="comparison-section-cta" my={8} />
      </Flex>
    </Box>
  );
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Box color="black" boxShadow={"lg"} p={4} bg="white">
      <Stack spacing={2} direction={"row"}>
        <Box
          flexShrink={0}
          width={8}
          height={8}
          bg="blue"
          borderRadius={"full"}
          overflow={"hidden"}
        >
          {testimonial.avatar}
        </Box>
        <Stack>
          <Stack spacing={0} bg={"gray.100"} px={3} py={2} borderRadius={18}>
            <Text color="black" fontWeight={600} fontSize={"xs"}>
              {testimonial.name}
            </Text>
            <Text fontSize={"xs"}>{testimonial.quote}</Text>
          </Stack>
          <Stack px={2} direction={"row"} fontSize={"xs"} color="gray.500" fontWeight={"bold"}>
            <Text color="gray.700" fontWeight={"thin"}>
              {testimonial.commentAge}
            </Text>
            <Text>Like</Text>
            <Text>Reply</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

function HeroSection({ quizState }: { quizState?: QuizStateParsed }) {
  return (
    <Box id="hero-section" as="section" position={"relative"}>
      <Box
        position={"absolute"}
        height="550px"
        width="100%"
        bottom="0"
        left="0"
        bgGradient="linear(to-t, bg.300, blackAlpha.100)"
      />
      <Box
        position={"absolute"}
        height="60px"
        width="100%"
        bottom="0"
        left="0"
        opacity={0.3}
        bgGradient="linear(to-t, bg.600, blackAlpha.100)"
        zIndex={1}
      />
      <Container>
        <Flex flexDirection={"column"} alignItems={"center"} position={"relative"}>
          <Text
            fontWeight="bold"
            textAlign={"center"}
            width={"full"}
            fontSize={"3xl"}
            color="white"
          >
            <Text as="span" color="teal.500">
              {quizState?.firstName}
            </Text>
            , <br /> Your Personal <br /> Astrologer Is Ready
          </Text>

          <Stack my={10} alignItems={"start"} color="brand.700">
            <Text fontWeight={"semibold"}>
              <InfinityIcon color="brand.500" height={"24px"} width={"24px"} mr={2} />
              Ask unlimited questions
            </Text>
            <Text fontWeight={"semibold"}>
              <BoltIcon color="brand.500" height={"24px"} width={"24px"} mr={2} />
              Get Instant answers
            </Text>
            <Text fontWeight={"semibold"}>
              <MoonIcon color="brand.500" height={"24px"} width={"24px"} mr={2} />
              Receive daily horoscopes
            </Text>
          </Stack>

          <CTALinkToPricing />

          <Text
            mt={8}
            mb={2}
            textAlign={"center"}
            width={"full"}
            fontSize={"sm"}
            color={"whiteAlpha.600"}
          >
            Or scroll to find out more
          </Text>
          <ArrowDownIcon mb={6} color="whiteAlpha.600" fontSize={"2xl"} />

          <Box position="relative" overflow={"hidden"}>
            <StaticImage alt="Astropal UI preview" src="../images/phone_ui.png" />

            <Box position={"absolute"} top="40%" width="100%" px={16}>
              <Text fontSize={"xl"} textAlign={"center"}>
                Hi,{" "}
                <Text as="span" color="brand.500">
                  {quizState?.firstName}!
                </Text>
              </Text>
              <Text textAlign={"center"}>What would you like to ask?</Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

const ComparisonItem = ({ title, isBenefit }: { title: string; isBenefit?: boolean }) => {
  return (
    <Stack direction={"row"} align={"center"} borderRadius={"xl"}>
      <Icon as={isBenefit ? CheckIcon : CloseIcon} color={isBenefit ? "green.500" : "red.400"} />
      <Box>
        <Text fontSize={"sm"} color={isBenefit ? "white" : "bg.500"}>
          {title}
        </Text>
      </Box>
    </Stack>
  );
};

const Feature2 = ({ title, text, emoji }: { title: string; text: string; emoji?: string }) => {
  return (
    <Stack direction={"column"} px={6} gap={4}>
      <Text fontWeight={"bold"} color={"white"}>
        {emoji} {title}
      </Text>
      <Text color={"bg.800"}>{text}</Text>
    </Stack>
  );
};

const HappyCustomersCounter = ({ initialCount = 12305, incrementRate = 1 }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + getRandomIncrement(1, 4));
    }, 1500);

    return () => clearInterval(intervalId);
  }, [incrementRate]);

  return (
    <Box textAlign="center">
      <Text fontSize={"2xl"} lineHeight={"80%"} fontWeight={"black"} color="brand.600">
        {count.toLocaleString()}
      </Text>
    </Box>
  );
};

function CTALinkToPricing(props: ComponentProps<typeof Button>) {
  const theme = useTheme();

  return (
    <Link to="/pricing">
      <Button
        bg="orange.500"
        color="white"
        boxShadow={`0 0 0 6px ${theme.colors.orange["400"]}`}
        _hover={{
          backgroundColor: "orange.600",
        }}
        {...props}
      >
        Get my astrologer
      </Button>
    </Link>
  );
}

function getRandomIncrement(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
