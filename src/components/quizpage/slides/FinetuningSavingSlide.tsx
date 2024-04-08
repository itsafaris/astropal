import React from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { Flex, Text } from "@chakra-ui/react";
import { TestimonialCard } from "@components/TestimonialCard";
import { StaticImage } from "gatsby-plugin-image";
import { SlideHeading, SpanJust } from "../components";

export function CreatingSelfDiscoveryGuideSlide() {
  return (
    <Slide id="finalizing-personalized-astrologer" type="loading" duration={8} autoProceed={true}>
      <SlideHeading
        text={
          <SpanJust>
            Finalizing Your Personalized <br /> Astrologer
          </SpanJust>
        }
      />

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Selector />

        <Text textAlign={"center"} color="teal.300" fontSize={"3xl"} fontWeight={"black"}>
          31,000+ people
        </Text>
        <Text textAlign={"center"} color="text.main" fontWeight={"bold"} fontSize={"lg"} mb={5}>
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
