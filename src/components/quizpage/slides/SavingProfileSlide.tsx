import React from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { Box, Flex, Text, Slide as SlideAnimation } from "@chakra-ui/react";
import { TestimonialCard } from "@components/TestimonialCard";
import { StaticImage } from "gatsby-plugin-image";
import { NextButton, SlideHeading } from "../components";

const testimonials = [
  {
    name: "Sarah",
    quote: `I've always loved astrology, but never had insights made just for me. It's been surprisingly helpful in understanding my partner and dealing with tough times more kindly. Now, we're learning to appreciate our differences`,
    question: "",
    avatar: <StaticImage alt="Astropal user image" src="../../../images/user3.png" />,
    commentAge: "7d",
  },
  {
    name: "Michelle Richards",
    quote:
      "Our marriage got a major upgrade thanks to the insights – turning challenges into growth moments!",
    question: "",
    avatar: <StaticImage alt="Astropal user image" src="../../../images/user2.png" />,
    commentAge: "4d",
  },
  {
    name: "Thomas",
    quote: "The insights and ideas are valuable. Great product!",
    question: "",
    avatar: <StaticImage alt="Astropal user image" src="../../../images/user6.png" />,
    commentAge: "2d",
  },
];

export function SavingProfileSlide() {
  const [testimonialIdx, setTestimonialIdx] = React.useState<number>(0);
  const [showInput, setShowInput] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setTestimonialIdx((idx) => (idx + 1 <= testimonials.length - 1 ? idx + 1 : 0));
    }, 3000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <Slide
      id="saving-profile"
      type="loading"
      duration={4}
      onLoadingCompleted={() => setShowInput(true)}
    >
      <SlideHeading
        textAlign={"center"}
        text="Updating your Natal Chart to offer the best insights"
      />

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box my={5}>
          <Selector />
        </Box>

        {showInput && <NextButton mb={5}>Continue</NextButton>}

        <Box
          p={4}
          pb={0}
          bg="white"
          width={"full"}
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
        >
          <Text textAlign={"center"} color="bg.100" fontWeight={"semibold"} fontSize={"md"}>
            See what others say
          </Text>
        </Box>

        <Box
          color="black"
          borderBottomLeftRadius={8}
          borderBottomRightRadius={8}
          p={4}
          bg="white"
          position={"relative"}
          width={"full"}
          height={240}
          overflow={"hidden"}
        >
          {testimonials.map((it, idx) => {
            return (
              <SlideAnimation
                key={it.name}
                in={testimonialIdx === idx}
                unmountOnExit
                transition={{ exit: { duration: 0 }, enter: { duration: 0.7 } }}
                style={{
                  position: "absolute",
                  width: "90%",
                  left: "5%",
                  top: "15px",
                }}
              >
                <TestimonialCard testimonial={it} />
              </SlideAnimation>
            );
          })}
        </Box>
      </Flex>
    </Slide>
  );
}

{
  /* <Text textAlign={"center"} color="brand.600" fontSize={"3xl"} fontWeight={"black"}>
31,000+ people
</Text>

<Text textAlign={"center"} color="white" fontWeight={"bold"} fontSize={"lg"} mb={5}>
have chosen Astropal
</Text> */
}
