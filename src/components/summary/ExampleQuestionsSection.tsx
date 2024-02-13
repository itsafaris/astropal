import { useEffect, useState } from "react";
import { Box, Text, Stack, Heading, Flex } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";

import { orderBy, take } from "lodash";

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

export function ExampleQuestionsSection() {
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
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      id="example-questions-section"
      as="section"
      px={5}
    >
      <StaticImage
        alt=""
        src="../../images/art-5.png"
        style={{ width: 80, opacity: 1, marginLeft: "auto", marginRight: "auto", marginBottom: 20 }}
      />

      <Heading
        fontWeight="semibold"
        textAlign={"center"}
        width={"full"}
        fontSize={"2xl"}
        color="white"
        lineHeight={"1.4"}
      >
        Our User's Are Asking <br /> Questions Every Hour
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
              />

              <Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <Text fontWeight={"semibold"} color={`${q.color}.400`} fontSize={"sm"}>
                    {q.group}
                  </Text>
                  <Text fontSize={"xs"} color="whiteAlpha.700">
                    Asked{" "}
                    <Text as="span" fontWeight={"bold"}>
                      {q.when} hour ago
                    </Text>{" "}
                  </Text>
                </Stack>

                <Stack bg={"white"} py={3} px={4} borderRadius={"lg"}>
                  <Text fontSize={"sm"} color="black">
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
    </Flex>
  );
}

function QuestionsWeHaveAnswered() {
  return (
    <Stack my={8} spacing={2} justifyContent={"center"} alignItems={"center"}>
      <HappyCustomersCounter />
      <Text fontSize={{ base: "xs" }} fontWeight={"bold"}>
        Questions answered this week
      </Text>
    </Stack>
  );
}

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
