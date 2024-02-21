import React from "react";
import { Box, Flex, Grid, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FaStar } from "react-icons/fa";
import { StaticImage } from "gatsby-plugin-image";

import { Headline, HeadlineHighlight } from "./components";

export function MethodSection() {
  return (
    <Stack spacing={16} color="black">
      <MethodHeadline />
      <LovedByUsers />
      <Phases />
      <PositiveReport />
    </Stack>
  );
}

export function MethodHeadline() {
  return (
    <Stack spacing={8}>
      <Headline>
        Your Guide Is Based On{" "}
        <HeadlineHighlight>Celestial Self-Discovery Method </HeadlineHighlight>
      </Headline>

      <Text fontSize={"xl"}>
        Week by week, you’ll join an incredible community of women worldwide as you tear down the
        barriers keeping you from your true self, so you can step into your potential and live the
        life you were destined to live.
      </Text>
    </Stack>
  );
}

export function LovedByUsers() {
  return (
    <Stack>
      <Text fontSize={"2xl"} textAlign={"center"} mx="auto">
        Loved by{" "}
        <Text as="span" fontWeight={"bold"}>
          420000
        </Text>{" "}
        users worldwide
      </Text>

      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        gap={1}
        color="yellow.400"
        mx="auto"
        mb={4}
        fontSize={"xl"}
      >
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </Flex>

      <StaticImage src="../../images/astropal-users-conference.jpeg" alt="" />
    </Stack>
  );
}

export function PositiveReport() {
  return (
    <Stack spacing={4}>
      <Headline>
        <HeadlineHighlight>93% of our users</HeadlineHighlight> report a positive impact in their
        lives in as little as 1 week.
      </Headline>

      <Text fontSize={"xl"} textAlign={"center"} mx="auto"></Text>

      <Testimonial />
    </Stack>
  );
}

export function Testimonial() {
  return (
    <Stack backgroundColor={"white"} p={6} spacing={4}>
      <StaticImage
        alt=""
        src="../../images/user2.png"
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <Text color="black">
        "CSDM supercharged my energy and focus and allowed me to triple my business in two months
        after the event. I'm so much more effective in all I do and I feel even more fulfilled than
        ever before. Total game changer."
      </Text>

      <Text fontSize={"lg"} textAlign={"right"} color="black" fontWeight={"semibold"}>
        – Jenny McKinney
      </Text>
    </Stack>
  );
}

export function Phases() {
  return (
    <Stack spacing={8}>
      <Headline>
        Discover The 4-Phases Of <br /> <HeadlineHighlight>The Method</HeadlineHighlight>
      </Headline>

      <Text fontSize={"xl"}>
        Week by week, you’ll join an incredible community of women worldwide as you tear down the
        barriers keeping you from your true self, so you can step into your potential and live the
        life you were destined to live.
      </Text>

      <StaticImage alt="" src="../../images/awakening-phase.png" style={{ maxHeight: 300 }} />

      <Stack mt={4} alignItems={"center"} spacing={0}>
        <PhaseCard
          img={
            <StaticImage
              alt=""
              src="../../images/phases/awakening.png"
              style={{ height: "100%" }}
            />
          }
          title={"Awakening"}
          achievements={["Self-awareness", "Self-awareness", "Self-awareness", "Self-awareness"]}
          week={"1-2"}
        />

        <PhaseCard
          img={<StaticImage alt="" src="../../images/user2.png" style={{ height: "100%" }} />}
          title={"Public Mask"}
          achievements={["Self-awareness", "Self-awareness", "Self-awareness", "Self-awareness"]}
          week={"3-4"}
        />

        <PhaseCard
          img={
            <StaticImage
              alt=""
              src="../../images/phases/relationship.png"
              style={{ height: "100%" }}
            />
          }
          title={"Relationship"}
          achievements={["Self-awareness", "Self-awareness", "Self-awareness", "Self-awareness"]}
          week={"5-6"}
        />

        <PhaseCard
          img={
            <StaticImage
              alt=""
              src="../../images/phases/evolution.png"
              style={{ height: "100%" }}
            />
          }
          title={"Evolution"}
          achievements={["Self-awareness", "Self-awareness", "Self-awareness", "Self-awareness"]}
          week={"7-..."}
        />
      </Stack>
    </Stack>
  );
}

function PhaseCard(props: {
  title: string;
  achievements: string[];
  img: React.ReactNode;
  week: string;
}) {
  return (
    <Grid gridTemplateColumns={"auto auto 1fr"} gap={3}>
      <Stack fontWeight={"bold"} spacing={0} textAlign={"center"} textTransform={"uppercase"}>
        <Box height={"70px"} width={"70px"} borderRadius={"50%"} overflow={"hidden"} mb={3}>
          {props.img}
        </Box>

        <Text>Week</Text>
        <Text>{props.week}</Text>
      </Stack>

      <Flex height={"100%"} width={"2px"} backgroundColor={"brand.500"} />

      <Stack spacing={3} flexGrow={1} pb={16} width={"250px"}>
        <Headline textAlign={"left"} color={"brand.500"}>
          {props.title}
        </Headline>

        <Text textTransform={"uppercase"} fontSize={"sm"} fontWeight={"bold"}>
          Achievements of this phase:
        </Text>

        <List spacing={1}>
          {props.achievements.map((it, idx) => {
            return (
              <ListItem key={idx}>
                <CheckIcon color="brand.600" mr={1} /> {it}
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </Grid>
  );
}
