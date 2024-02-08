import { Selector, Slide } from "@martynasj/quiz-lib";

import { Flex, Text } from "@chakra-ui/react";
import { TestimonialCard } from "@components/TestimonialCard";
import { StaticImage } from "gatsby-plugin-image";

export function Loading_CreatingBook() {
  return (
    <Slide
      id="loading-creating-book"
      type="loading"
      duration={16}
      statusText={"Generating pages"}
      autoProceed={false}
    >
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Selector />

        <Text textAlign={"center"} color="red.500" fontSize={"3xl"} fontWeight={"black"}>
          310,000+ people
        </Text>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"lg"} mb={5}>
          follow their Self-Discovery Guides
        </Text>

        <TestimonialCard
          testimonial={{
            name: "Michelle Richards",
            quote:
              "After trying countless astrology readings, I finally found this one. Now, it's my go-to source of guidance whenever I face a challenging moment.",
            question: "Is it a good time to invest my savings?",
            avatar: <StaticImage alt="Astropal user image" src="../../../images/user2.png" />,
            commentAge: "4d",
          }}
        />
      </Flex>
    </Slide>
  );
}
