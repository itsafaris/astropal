import { Selector, Slide } from "@martynasj/quiz-lib";
import { Box, Flex, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import { FaArrowDown } from "react-icons/fa";

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
      {/* <Flex position={"relative"} justifyContent={"center"} my={8} height={260}>
        <BookCover
          left={"20px"}
          position={"absolute"}
          height={260}
          gender="male"
          author="[your name here]"
          transform={"rotate(-10deg)"}
        />
        <Box
          position={"absolute"}
          left={"80px"}
          top="-20px"
          boxShadow={"-9px 5px 10px 0px #00000069"}
        >
          <BookCover height={280} gender="female" author="[your name here]" />
        </Box>
      </Flex> */}

      <Box textAlign={"center"}>
        <Text
          mt={8}
          mb={2}
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          maxWidth={"70%"}
          mx="auto"
          lineHeight={"1.4"}
        >
          Take a Full Control of Your Life
          <br />
          With Astrology
        </Text>

        <Text textAlign={"center"} mb={4} color="red.600" fontWeight={"semibold"}></Text>
      </Box>

      <Box mx="auto" mb={8}>
        <Text>✅ Relationships</Text>
        <Text>✅ Career</Text>
        <Text>✅ Personal Growth</Text>
        <Text>✅ Finance</Text>
        <Text>✅ Future Decisions</Text>
      </Box>

      <Flex flexDirection={"column"} alignItems={"center"} gap={2}>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"lg"}>
          Choose your gender to get started
        </Text>
        <FaArrowDown />
      </Flex>

      <Selector />
    </Slide>
  );
}
