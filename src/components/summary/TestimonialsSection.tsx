import React from "react";
import { Box, Stack, Heading } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { Testimonial, TestimonialCard } from "@components/TestimonialCard";

const testimonials: Testimonial[] = [
  {
    name: "Linda Thompson",
    quote:
      "Intuvist provided me with clear insights into my career path that aligned perfectly with my sun sign's strengths. I got the promotion!",
    question: "Should I change my job now or wait?",
    avatar: <StaticImage alt="Intuvist user image" src="../../images/user1.png" />,
    commentAge: "7d",
  },
  {
    name: "Michelle Richards",
    quote:
      "I was skeptical at first, but the relationship advice was spot-on. my partner and I have never been closer. Thank you",
    question: "Is it a good time to invest my savings?",
    avatar: <StaticImage alt="Intuvist user image" src="../../images/user2.png" />,
    commentAge: "4d",
  },
  {
    name: "Jennifer Miller",
    quote:
      "Intuvist's numerology reading was a game-changer for my personal growth. I've found a new sense of purpose.",
    question: "Will I find a meaningful relationship soon?",
    avatar: <StaticImage alt="Intuvist user image" src="../../images/user3.png" />,
    commentAge: "1w",
  },
  {
    name: "Barbara Johnson",
    quote:
      "Thanks to Intuvist, I made a confident financial decision during Mercury Retrograde. It paid off big time!",
    question: "How can I improve my self-care routine?",
    avatar: <StaticImage alt="Intuvist user image" src="../../images/user4.png" />,
    commentAge: "3w",
  },
  {
    name: "Michael Andrews",
    quote:
      "I relocated my house based on Intuvist's advice, aligning with my zodiac's energy flow. Best decision ever!",
    question: "What's the best time to launch my new product?",
    avatar: <StaticImage alt="Intuvist user image" src="../../images/user5.png" />,
    commentAge: "2m",
  },
];

export function TestimonialsSection() {
  return (
    <Box id="testimonials-section" as="section" my={12}>
      <Heading textAlign={"center"} fontSize={"3xl"} mb={10} color="text.main">
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
