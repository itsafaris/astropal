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
      <Headline color="black">
        <HeadlineHighlight>Your Program</HeadlineHighlight> Is Based On A Proven Method To Harness
        Astrology
      </Headline>

      <Text fontSize={"xl"}>
        The method we use guides you to discover your true self and authentic life path through
        weekly explorations of your astrological journey. Overcoming obstacles, it empowers you to
        embrace your full potential.
      </Text>
    </Stack>
  );
}

export function LovedByUsers() {
  return (
    <Stack>
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        gap={1}
        color="yellow.400"
        mx="auto"
        fontSize={"xl"}
      >
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </Flex>

      <Text fontSize={"2xl"} textAlign={"center"} mx="auto" mb={4}>
        Loved by{" "}
        <Text as="span" fontWeight={"bold"}>
          420 000
        </Text>{" "}
        users worldwide
      </Text>

      <StaticImage src="../../images/astropal-users-conference.jpeg" alt="" />
    </Stack>
  );
}

export function PositiveReport() {
  return (
    <Stack spacing={4}>
      <Headline color="black">
        <HeadlineHighlight>93% of our users</HeadlineHighlight> report a positive impact in their
        lives in as little as 1 week
      </Headline>

      <Testimonial />
    </Stack>
  );
}

export function Testimonial() {
  return (
    <Stack backgroundColor={"white"} p={6} spacing={5}>
      <StaticImage
        alt=""
        src="../../images/user10.png"
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <Text color="black">
        "Thanks to ASMP, I've found myself more resilient in the face of challenges, equipped with
        newfound strength that fuels me each day. I highly recommend it!" 🌟"
      </Text>

      <Text textAlign={"right"} color="black">
        – Jenny McKinney
      </Text>
    </Stack>
  );
}

export function Phases() {
  return (
    <Stack spacing={8}>
      <Headline color="black">
        Discover <br /> The 3-Pillars Of <br /> <HeadlineHighlight>The Method</HeadlineHighlight>
      </Headline>

      <Text fontSize={"xl"}>
        The program follows a proven 3-Pillar method. You'll Learn, Practice, and Master steps to
        uncover your astrological self and understand your destiny.
      </Text>

      <StaticImage alt="" src="../../images/awakening-phase.png" style={{ maxHeight: 300 }} />

      <Stack mt={4} alignItems={"center"} spacing={14}>
        <PhaseCard
          img={
            <StaticImage
              alt=""
              src="../../images/phases/awakening.png"
              style={{ height: "100%" }}
            />
          }
          title={"Awakening"}
          achievements={["Basic Understanding", "Natal Chart Analysis", "Self-Reflection"]}
        />

        <PhaseCard
          img={
            <StaticImage
              alt=""
              src="../../images/phases/relationship.png"
              style={{ height: "100%" }}
            />
          }
          title={"Exploration"}
          achievements={[
            "Daily Horoscope Tracking",
            "Career Guidance",
            "Relationship Insights",
            "Personal Growth Plan",
          ]}
        />

        <PhaseCard
          img={
            <StaticImage
              alt=""
              src="../../images/phases/evolution.png"
              style={{ height: "100%" }}
            />
          }
          title={"Mastery"}
          achievements={[
            "Continued Self-Reflection",
            "24/7 Astrologer Assistance",
            "Sharing Insights with Others",
          ]}
        />
      </Stack>
    </Stack>
  );
}

function PhaseCard(props: { title: string; achievements: string[]; img: React.ReactNode }) {
  return (
    <Grid gridTemplateColumns={"auto 1fr"} gap={5}>
      <Stack fontWeight={"bold"} spacing={0} textAlign={"center"} textTransform={"uppercase"}>
        <Box height={"65px"} width={"65px"} borderRadius={"50%"} overflow={"hidden"} mb={3}>
          {props.img}
        </Box>
      </Stack>

      <Stack spacing={3} flexGrow={1} width={"250px"}>
        <Headline textAlign={"left"} color={"brand.500"}>
          <HeadlineHighlight>{props.title}</HeadlineHighlight>
        </Headline>

        <Text textTransform={"uppercase"} fontSize={"sm"} fontWeight={"bold"}>
          Achievements:
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
