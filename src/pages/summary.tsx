import React, { useEffect, useState } from "react";
import { Box, Container, Text, Stack, Heading, Button, Icon, Card, Flex } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import { CheckIcon, CloseIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Link } from "gatsby";

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
    group: "💼 Career 💼",
    color: "teal",
    questions: [
      { text: "What job aligns with my astrological strengths?" },
      { text: "Is this the right time for a career change?" },
      { text: "How can I deal with office politics according to my sign?" },
      { text: "What should I focus on for professional development?" },
      { text: "When's the best time to ask for a promotion?" },
    ],
  },
  {
    group: "💖 Love 💖",
    color: "red",
    questions: [
      { text: "What signs am I most compatible with for a romantic relationship?" },
      { text: "How can I enhance the connection with my current partner?" },
      { text: "When will I find love?" },
      { text: "What should I do to prepare for a significant relationship?" },
      { text: "How can I use astrology to overcome challenges in my love life?" },
    ],
  },
  {
    group: "💸 Finances 💸",
    color: "orange",
    questions: [
      { text: "What's the outlook on my financial prosperity this year?" },
      { text: "When is a good time to make a significant investment?" },
      { text: "How can I improve my financial stability through astrology?" },
      { text: "Is this a good year to buy or sell property?" },
      { text: "What should I be cautious about financially in the coming months?" },
    ],
  },
  {
    group: "🌱 Personal Growth 🌱",
    color: "green",
    questions: [
      { text: "How can I use astrology to enhance my personal development?" },
      { text: "Which habits should I develop for spiritual growth?" },
      { text: "What are my hidden talents and how can I nurture them?" },
      { text: "How can I find motivation based on my astrological chart?" },
      { text: "What self-care practices are most beneficial for my sign?" },
    ],
  },
];

export default function SummaryPage() {
  return (
    <Box py={4} bg="bg.100" color="bg.900">
      <Container>
        <HeroSection />
        <AreasOfLifeGuidance />
        <ExampleQuestionsSection />
        <QuestionsWeHaveAnswered />
        <SimilarUsersLikeYouSection />
        <TestimonialsSection />
        <ComparisonWithRegularAstrologerSection />
      </Container>
    </Box>
  );
}

function ExampleQuestionsSection() {
  return (
    <Box id="example-questions-section" as="section" my={12}>
      <Text fontSize={"xl"} fontWeight={"bold"} mb={4} textAlign={"center"}>
        Here are some most recent questions our users asked
      </Text>
      <Stack spacing={4}>
        {exampleQuestions.map((g) => {
          const bg = `${g.color}.50`;
          return (
            <Box
              key={g.group}
              borderRadius={"xl"}
              bg={bg}
              border="2px solid"
              borderColor={`${g.color}.500`}
              pl={6}
              pr={4}
              py={3}
              color="black"
            >
              <Text
                fontSize={"lg"}
                textAlign={"center"}
                fontWeight={"bold"}
                mb={4}
                color={`${g.color}.800`}
              >
                {g.group}
              </Text>
              <Stack spacing={"1px"}>
                {g.questions.map((q) => {
                  return (
                    <Stack key={q.text} bg={bg} spacing={0} py={2}>
                      <Text fontSize={"sm"} fontWeight={"semibold"}>
                        {q.text}
                      </Text>
                      <Text fontSize={"xs"} color={`${g.color}.500`}>
                        2h ago by{" "}
                        <Text as="span" fontWeight={"bold"}>
                          Aries Male
                        </Text>
                      </Text>
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

function QuestionsWeHaveAnswered() {
  return (
    <Box my={8}>
      <Text fontSize={{ base: "md" }} fontWeight={"bold"}>
        We have already answered
      </Text>
      <HappyCustomersCounter />
      <Text fontSize={{ base: "md" }} fontWeight={"bold"}>
        questions to our users
      </Text>
    </Box>
  );
}

function AreasOfLifeGuidance() {
  return (
    <Box id="guidance-section" my={12}>
      <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"} mb={8}>
        Get instant guidance in these areas of your life
      </Text>
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
    <Box id="comparison-with-regular-astrologer-section" as="section">
      <Heading>This is how it compares with a regular astrologer</Heading>

      <Stack>
        <Text fontWeight={"bold"}>Astropal Astrologer</Text>
        <Stack spacing={4} rounded={"xl"}>
          <Feature
            title="24/7 Availability"
            text="Access personalised insights any time, no waiting for appointments."
            isBenefit
          />
          <Feature
            title="Hyper-Personalized Readings"
            text="Insights based on your natal chart, tailored to your life's questions."
            isBenefit
          />
          <Feature
            title="At-Home Privacy"
            text="Receive guidance in the privacy and comfort of your own space."
            isBenefit
          />
          <Feature
            title="Unlimited Access"
            text="A cost-effective subscription model for all your astrological needs."
            isBenefit
          />
          <Feature
            title="Learning & Development"
            text="A rich library of content for continuous astrological learning."
            isBenefit
          />
          <Feature
            title="Data-Driven Insights"
            text="Uses AI and analytics for precise, informed readings."
            isBenefit
          />
          <Feature
            title="Real-Time Astronomical Data"
            text="Integrates the latest events from sources like NASA for current and precise advice."
            isBenefit
          />
        </Stack>
      </Stack>

      <Stack>
        <Text fontWeight={"bold"}>Regular Astrologer</Text>
        <Stack spacing={4} p={6} rounded={"xl"}>
          <Feature
            title="Appointment-Based"
            text="Limited to the astrologer's schedule and availability."
          />
          <Feature
            title="General Advice"
            text="Often one-size-fits-all, lacking personal relevance."
          />
          <Feature
            title="Face-to-Face Sessions"
            text="Requires sharing personal issues in person."
          />
          <Feature
            title="Per-Session Charges"
            text="Can become costly with multiple visits or questions."
          />
          <Feature title="One-Off Readings" text="May not support ongoing personal growth." />
          <Feature
            title="Traditional Interpretation"
            text="Relies on the astrologer's individual methodology."
          />
          <Feature
            title="Static Predictions"
            text="May not use up-to-the-minute celestial data in readings."
          />
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
    <Box id="hero-section" as="section" pt={16}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Text fontWeight="bold" textAlign={"center"} width={"full"} fontSize={"2xl"} color="white">
          Your Personal <br /> Astrologer Is Created
        </Text>

        <Text my={2} textAlign={"center"} width={"full"} fontSize={"md"} color={"whiteAlpha.600"}>
          Scroll to find out
        </Text>

        <ArrowDownIcon mb={6} color="whiteAlpha.600" fontSize={"3xl"} />

        <Box position="relative">
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

const Feature = ({
  title,
  text,
  isBenefit,
}: {
  title: string;
  text: string;
  isBenefit?: boolean;
}) => {
  return (
    <Stack direction={"row"} bg="green.800" align={"center"} px={4} py={2} borderRadius={"xl"}>
      <Icon as={isBenefit ? CheckIcon : CloseIcon} color={isBenefit ? "bg.500" : "bg.400"} />
      <Box>
        <Text fontWeight={"bold"} color={isBenefit ? "white" : "bg.500"}>
          {title}
        </Text>
        <Text color={isBenefit ? "bg.800" : "bg.500"}>{text}</Text>
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

const HappyCustomersCounter = ({ initialCount = 1642305, incrementRate = 1 }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + getRandomIncrement(1, 9));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [incrementRate]);

  return (
    <Box textAlign="center">
      <Text fontSize={"3xl"} fontWeight={"black"} color="brand.600">
        {count.toLocaleString()}
      </Text>
    </Box>
  );
};

function getRandomIncrement(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
