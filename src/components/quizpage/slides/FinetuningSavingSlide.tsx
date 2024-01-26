import React from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { ChatBubble } from "../components";
import { Flex, Text } from "@chakra-ui/react";
import { TestimonialCard } from "@components/TestimonialCard";
import { StaticImage } from "gatsby-plugin-image";

export function SavingWithTestimonialSlide() {
  const [showInput, setShowInput] = React.useState(false);

  return (
    <Slide id="preference-saving" type="loading" duration={7} autoProceed={true}>
      <ChatBubble
        text="Take a moment as we put the finishing touches on your Self-Discovery guide just for you! 🙏"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Selector />

          <Text textAlign={"center"} color="teal.300" fontSize={"3xl"} fontWeight={"bold"}>
            31,000+ people
          </Text>
          <Text textAlign={"center"} color="white" fontWeight={"bold"} fontSize={"lg"} mb={5}>
            have chosen Astropal
          </Text>

          <TestimonialCard
            testimonial={{
              name: "Michelle Richards",
              quote:
                "Relationship advices were spot-on. My partner and I have never been closer. Thank you",
              question: "Is it a good time to invest my savings?",
              avatar: <StaticImage alt="Astropal user image" src="../../../images/user2.png" />,
              commentAge: "4d",
            }}
          />
        </Flex>
      )}
    </Slide>
  );
}
