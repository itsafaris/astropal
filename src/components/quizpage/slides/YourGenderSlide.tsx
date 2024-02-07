import { Selector, Slide } from "@martynasj/quiz-lib";
import { Box, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

import { SlideHeading, Span } from "../components";

export function YourGenderSlide() {
  return (
    <Slide
      id="your-gender"
      type="single"
      variant="picture"
      size="medium"
      label="Choose your gender to get started"
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
      <Text fontSize={"md"} textAlign={"center"} bg="white" p={2}>
        <Span fontWeight={"semibold"}>
          "Clear the fog of your life. Learn how to use your strenghts and weaknesses to your
          advantage."
        </Span>{" "}
        - Dr. Marty
      </Text>

      <SlideHeading
        mt={8}
        mb={2}
        textAlign={"center"}
        fontWeight={"bold"}
        maxWidth={"70%"}
        mx="auto"
      >
        Discover yourself
        <br /> with Astrology and take control of your:
      </SlideHeading>

      <Box mx="auto" mb={8}>
        <Text>✅ Relationships</Text>
        <Text>✅ Career</Text>
        <Text>✅ Personal Growth</Text>
      </Box>

      <Selector />
    </Slide>
  );
}
