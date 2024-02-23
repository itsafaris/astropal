import { Selector, Slide } from "@martynasj/quiz-lib";
import { Container, Flex, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import { FaArrowDown } from "react-icons/fa";
import { Headline, InvertedHighlight } from "@components/summary/components";

export function YourGenderSlide() {
  return (
    <Slide
      id="your-gender"
      type="single"
      variant="picture"
      size="medium"
      label=""
      options={[
        {
          text: "Female",
          imgComponent: (
            <StaticImage
              alt="image of a female"
              src="../../../images/female.png"
              placeholder="blurred"
              style={{ borderRadius: "8px" }}
              height={140}
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
              style={{ borderRadius: "8px" }}
              height={140}
            />
          ),
        },
      ]}
    >
      <Container>
        <Flex flexDirection={"column"} gap={2}>
          <Flex flexDirection={"row"} justifyContent={"center"}>
            <Flex
              borderRadius={"full"}
              overflow={"hidden"}
              height={"150px"}
              width={"150px"}
              boxShadow={"inset 0 0 50px 0 #ffc9001f, 0 0 50px 0 #ffc9002b"}
              position={"relative"}
            >
              <StaticImage
                src={`../../../images/partner-3.png`}
                alt="Option - in relationship"
                placeholder="none"
                width={140}
                height={140}
                layout="fixed"
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: `1px solid #e4b382`,
                  borderRadius: "50%",
                }}
              />

              <StaticImage
                style={{ opacity: 1, position: "absolute", top: 0, left: 0, zIndex: 0 }}
                alt=""
                src="../../../images/astro-avatar.png"
                width={170}
                height={170}
              />
            </Flex>
          </Flex>

          <Headline fontSize={"3xl"} my={4}>
            <InvertedHighlight>
              Experience the Most Accurate Personalized Astrology
            </InvertedHighlight>
          </Headline>

          {/* <Flex
            flexDirection={"column"}
            color="white"
            fontSize="md"
            alignItems={"start"}
            mx="auto"
            gap={2}
          >
            <Text textAlign="center">
              <CheckIcon mr={3} color="green.500" />
              Time Your Opportunities
            </Text>
            <Text textAlign="center">
              <CheckIcon mr={3} color="green.500" />
              Make Decisions with Confidence
            </Text>
            <Text textAlign="center">
              <CheckIcon mr={3} color="green.500" />
              Capitalize on Your Talents
            </Text>
          </Flex> */}

          <Flex flexDirection={"column"} alignItems={"center"} gap={2} mb={4}>
            <Text mt={5} color={"white"} fontSize={"md"} fontWeight={"bold"} textAlign={"center"}>
              Choose your gender to get started
            </Text>
            <FaArrowDown color="white" />
          </Flex>
        </Flex>
      </Container>

      <Selector />
    </Slide>
  );
}
