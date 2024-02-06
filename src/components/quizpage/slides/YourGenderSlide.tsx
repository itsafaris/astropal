import { Selector, Slide } from "@martynasj/quiz-lib";
import { Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

import { SlideHeading, Span } from "../components";

export function YourGenderSlide() {
  return (
    <Slide
      id="your-gender"
      type="single"
      variant="picture"
      size="medium"
      options={[
        {
          text: "Female",
          imgComponent: (
            <StaticImage
              alt="image of a female"
              src="../../../images/female.png"
              placeholder="blurred"
            />
          ),
        },
        {
          text: "Male",
          imgComponent: (
            <StaticImage
              alt="image of a male"
              src="../../../images/male.png"
              placeholder="blurred"
            />
          ),
        },
      ]}
    >
      <SlideHeading textAlign={"center"} fontWeight={"bold"}>
        A hyper-personalised guide
        <br /> to self-discovery
      </SlideHeading>
      <Text textAlign={"center"} mb={12}>
        A perfect blend of <Span color="purple.700">Astrology</Span> and your{" "}
        <Span color="orange.500">Personality</Span>
      </Text>
      <Selector />
    </Slide>
  );
}
