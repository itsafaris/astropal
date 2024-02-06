import React from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { Box, Flex, Text } from "@chakra-ui/react";
import { TestimonialCard } from "@components/TestimonialCard";
import { StaticImage } from "gatsby-plugin-image";
import { SlideHeading, SpanJust } from "../components";

export function SavingProfileSlide() {
  return (
    <Slide id="saving-profile" type="loading" duration={3} autoProceed={true}>
      <SlideHeading text={<SpanJust>Saving your profile</SpanJust>} />

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box mt={5}>
          <Selector />
        </Box>

        <Text textAlign={"center"} color="brand.600" fontSize={"3xl"} fontWeight={"black"}>
          31,000+ people
        </Text>

        <Text textAlign={"center"} color="white" fontWeight={"bold"} fontSize={"lg"} mb={5}>
          have chosen Astropal
        </Text>

        <TestimonialCard
          testimonial={{
            name: "Michelle Richards",
            quote:
              "Our marriage got a major upgrade thanks to the guide – turning challenges into growth moments!",
            question: "Is it a good time to invest my savings?",
            avatar: <StaticImage alt="Astropal user image" src="../../../images/user2.png" />,
            commentAge: "4d",
          }}
        />
      </Flex>
    </Slide>
  );
}
