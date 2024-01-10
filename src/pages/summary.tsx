import React, { useEffect, useState } from "react";
import { Box, Container, Text, Stack, Heading, Button, Icon, Card, Flex } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import { CheckIcon, CloseIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Link } from "gatsby";
import { orderBy, take } from "lodash";
import { TopNavigation } from "@components/topnavigation";

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
    name: "John Carter",
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

export default function SummaryPage() {
  return (
    <Box py={4} pb={24} bg="bg.100" color="bg.900">
      <Container>
        <TopNavigation />
        <HeroSection />
        <AreasOfLifeGuidance />
        <ExampleQuestionsSection />
        <SimilarUsersLikeYouSection />
        <TestimonialsSection />
        <ComparisonWithRegularAstrologerSection />
      </Container>
    </Box>
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
      <Heading fontSize={"2xl"} mb={8} mx={4} textAlign={"center"}>
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
                <Stack bg={"white"} py={2} px={4} borderRadius={"xl"}>
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
                            {/* <Badge>{g.group}</Badge> */}
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
      <Heading textAlign={"center"} fontWeight={"bold"} mb={8} mx={8} fontSize={"2xl"}>
        Bring clarity into every
        <br /> area of your life
      </Heading>
      <Stack spacing={6}>
        <Feature2
          title="Uncertain Decisions"
          text="Find your way with star-mapped guidance for life's crossroads."
          emoji="🤔"
        />
        <Feature2
          title="Identity Quest"
          text="Reveal your cosmic identity and destiny through the stars."
          emoji="🌟"
        />
        <Feature2
          title="Missed Opportunities"
          text="Capture your golden moments with timely cosmic alerts."
          emoji="⏳"
        />
        <Feature2
          title="Relationship Struggles"
          text="Forge stronger bonds with the universe's love insights."
          emoji="💞"
        />
        <Feature2
          title="Financial Uncertainty"
          text="Chart a prosperous course with celestial financial advice."
          emoji="💰"
        />
        <Feature2
          title="Inaccessibility to Guidance"
          text="Instant, anywhere wisdom from your pocket astrologer."
          emoji="🚀"
        />
      </Stack>
    </Box>
  );
}

function SimilarUsersLikeYouSection() {
  return (
    <Heading
      fontWeight={"semibold"}
      fontSize={{ base: "xl" }}
      bg="teal.800"
      p={8}
      color="brand.700"
      borderRadius={"xl"}
    >
      Our users with a similar Astrological Profile as yours report a high satisfaction rate after
      just 2 weeks of using our astrologer.
    </Heading>
  );
}

function TestimonialsSection() {
  return (
    <Box id="testimonials-section" as="section" my={12}>
      <Heading textAlign={"center"} fontSize={"xl"} my={6}>
        Hear it from our users
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
      <Heading mb={8} textAlign={"center"}>
        10x better than your regular astrologer
      </Heading>
      <Stack spacing={8}>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <StaticImage src={`../images/favicon.png`} alt="Astropal logo" height={35} width={35} />
            <Text fontSize={"md"} fontWeight={"bold"} color="brand.600">
              Our Astrologer
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

function HeroSection() {
  return (
    <Box id="hero-section" as="section">
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Text fontWeight="bold" textAlign={"center"} width={"full"} fontSize={"2xl"} color="white">
          Your Personal <br /> Astrologer Is Created
        </Text>

        <Text my={2} textAlign={"center"} width={"full"} fontSize={"md"} color={"whiteAlpha.600"}>
          Scroll to find out
        </Text>

        <ArrowDownIcon mb={6} color="whiteAlpha.600" fontSize={"3xl"} />

        <Box position="relative">
          <Box
            position={"absolute"}
            height="100%"
            width="80%"
            top="6%"
            left="10%"
            boxShadow={`0 0 80px 1px #2f7281`}
          ></Box>
          <StaticImage alt="Astropal UI preview" src="../images/phone_ui.png" />
          <Box position={"absolute"} top="40%" width="100%" px={16}>
            <Text fontSize={"xl"} textAlign={"center"}>
              Hi,{" "}
              <Text as="span" color="brand.500">
                Marty!
              </Text>
            </Text>
            <Text textAlign={"center"}>What would you like to ask?</Text>
          </Box>
        </Box>
      </Flex>
      <Stack
        id="white-card-with-benefits"
        textAlign={"center"}
        bg="white"
        px={6}
        py={6}
        color="black"
        borderRadius={"xl"}
        zIndex={1}
        position={"relative"}
      >
        <Text fontSize={"xl"} fontWeight={"bold"} mb={4}>
          Your astrologer is:
        </Text>
        <Stack textAlign={"left"} spacing={4}>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            🌟 Trained on your Birth Chart
          </Text>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            ⚡ Always available instantly
          </Text>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            🌌 Aligned with current cosmic events
          </Text>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            🔍 Capable of providing in depth analysis
          </Text>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            📅 Deliver daily insights tailored for your profile
          </Text>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            🎓 Learns about you and get's better with time
          </Text>
        </Stack>
        <Flex display={"none"} direction={"row"} gap={4}>
          <Flex direction={"column"} gap={2}>
            <Card
              bg="bg.900"
              height={"120px"}
              p={4}
              fontSize={"2xl"}
              fontWeight={"bold"}
              color="bg.300"
            >
              <Text>24/7</Text>
              <Text fontSize={"sm"}>Availability</Text>
            </Card>
          </Flex>
          <Flex direction={"column"} gap={2}>
            <Card
              bg="bg.900"
              height={"120px"}
              p={4}
              fontSize={"2xl"}
              fontWeight={"bold"}
              color="bg.300"
            >
              <Text>10</Text>
              <Text fontSize={"sm"}>questions / day</Text>
            </Card>
          </Flex>
          <Flex direction={"column"} gap={2}>
            <Card
              bg="bg.900"
              height={"120px"}
              p={4}
              fontSize={"2xl"}
              fontWeight={"bold"}
              color="bg.300"
            >
              <Text>30</Text>
              <Text fontSize={"sm"}>seconds</Text>
            </Card>
          </Flex>
        </Flex>

        <Stack spacing={4} mt={8}>
          <Link to="/pricing">
            <Button bg="brand.600">Get my astrologer</Button>
          </Link>
          {/* <Stack direction={"row"}>
              <AppStoreLogo />
              <PlayStoreLogo />
            </Stack> */}
        </Stack>

        {/* <Stack mt={4}>
            <Stack direction={"row"} color="gold" justifyContent={"center"}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </Stack>
            <Text>4.72 user rating</Text>
          </Stack> */}
      </Stack>
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
    <Stack direction={"column"} px={8}>
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

function getRandomIncrement(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
