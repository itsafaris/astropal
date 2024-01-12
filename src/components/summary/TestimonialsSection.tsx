import React from "react";
import { Box, Text, Stack, Heading } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";

type Testimonial = {
  name: string;
  quote: string;
  question: string;
  avatar: React.ReactNode;
  commentAge: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Linda Thompson",
    quote:
      "Astropal provided me with clear insights into my career path that aligned perfectly with my sun sign's strengths. I got the promotion!",
    question: "Should I change my job now or wait?",
    avatar: <StaticImage alt="Astropal user image" src="../../images/user1.png" />,
    commentAge: "7d",
  },
  {
    name: "Michelle Richards",
    quote:
      "I was skeptical at first, but the relationship advice was spot-on. my partner and I have never been closer. Thank you",
    question: "Is it a good time to invest my savings?",
    avatar: <StaticImage alt="Astropal user image" src="../../images/user2.png" />,
    commentAge: "4d",
  },
  {
    name: "Jennifer Miller",
    quote:
      "Astropal's numerology reading was a game-changer for my personal growth. I've found a new sense of purpose.",
    question: "Will I find a meaningful relationship soon?",
    avatar: <StaticImage alt="Astropal user image" src="../../images/user3.png" />,
    commentAge: "1w",
  },
  {
    name: "Barbara Johnson",
    quote:
      "Thanks to Astropal, I made a confident financial decision during Mercury Retrograde. It paid off big time!",
    question: "How can I improve my self-care routine?",
    avatar: <StaticImage alt="Astropal user image" src="../../images/user4.png" />,
    commentAge: "3w",
  },
  {
    name: "Michael Andrews",
    quote:
      "I relocated my house based on Astropal's advice, aligning with my zodiac's energy flow. Best decision ever!",
    question: "What's the best time to launch my new product?",
    avatar: <StaticImage alt="Astropal user image" src="../../images/user5.png" />,
    commentAge: "2m",
  },
];

export function TestimonialsSection() {
  return (
    <Box id="testimonials-section" as="section" my={12}>
      <Heading textAlign={"center"} fontSize={"3xl"} mb={10} color="white">
        Hear it <br /> from our users
      </Heading>
      <Stack>
        {testimonials.map((testimonial) => {
          return <TestimonialCard key={testimonial.name} testimonial={testimonial} />;
        })}
      </Stack>
    </Box>
  );
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Box color="black" boxShadow={"lg"} p={4} bg="white">
      <Stack spacing={2} direction={"row"}>
        <Box
          flexShrink={0}
          width={8}
          height={8}
          bg="blue"
          borderRadius={"full"}
          overflow={"hidden"}
        >
          {testimonial.avatar}
        </Box>
        <Stack>
          <Stack spacing={0} bg={"gray.100"} px={3} py={2} borderRadius={18}>
            <Text color="black" fontWeight={600} fontSize={"xs"}>
              {testimonial.name}
            </Text>
            <Text fontSize={"xs"}>{testimonial.quote}</Text>
          </Stack>
          <Stack px={2} direction={"row"} fontSize={"xs"} color="gray.500" fontWeight={"bold"}>
            <Text color="gray.700" fontWeight={"thin"}>
              {testimonial.commentAge}
            </Text>
            <Text>Like</Text>
            <Text>Reply</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
