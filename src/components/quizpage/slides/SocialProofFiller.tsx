import React, { useState } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { StaticImage } from "gatsby-plugin-image";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { SlideHeading, NextButton } from "../components";

export function SocialProofFiller() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide type="filler" id="user-testimonial">
      <SlideHeading
        text="Thank you for your feedback 😊. Here's what people like you are saying after using a personalized astrologer"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <>
          <TestimonialCard
            testimonial={{
              authorName: "Louise Peereman, 52",
              text: "I've been using my personalized astrologer for a couple of months now, and it's been surprisingly insightful. What's cool is I can get answers whenever, wherever. Very convenient!",
              // text: "I've been using my personalized astrologer for a couple of months now, and it's been surprisingly insightful. What's cool is, I don't have to go searching for info anymore — I can get answers whenever, wherever. Very convenient!",
              // text: "I've gained some insights that actually make sense about my husband and me. Who would've thought, right? Anyway, it's been a thoughtful journey, and I'm appreciating the personalized astrologer for shedding light on aspects that bring us closer.",
              // text: "Grateful for the genuine support and insights that made a profound difference in my life. Finding love after divorce is challenging, but with your guidance, I feel much more confident in my journey.",
              rating: 5,
              imgComponent: (
                <StaticImage
                  layout={"constrained"}
                  placeholder={"none"}
                  src={"../../images/testimonial-3.png"}
                  alt=""
                />
              ),
            }}
          />

          <NextButton mt={4} onClick={() => submitQuestion()}>
            Continue
          </NextButton>
        </>
      )}
    </Slide>
  );
}

type ITestimonial = {
  authorName: string;
  text: string;
  rating: number;
  imgComponent: React.ReactNode;
};

export function TestimonialCard({ testimonial }: { testimonial: ITestimonial }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="4"
      width="100%"
      color="white"
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"50%"}
        overflow={"hidden"}
        height={150}
        width={150}
      >
        {testimonial.imgComponent}
      </Box>

      <Box display="flex" flexDirection="row" gap={4}>
        <Text
          height={"100%"}
          fontSize={40}
          fontWeight={700}
          fontFamily={"serif"}
          alignSelf={"flex-start"}
          color="inherit"
        >
          “
        </Text>
        <Text fontSize="medium" fontStyle="italic" fontWeight="light" color="inherit">
          {testimonial.text}
        </Text>
        <Text
          height={"100%"}
          fontSize={40}
          fontWeight={700}
          fontFamily={"serif"}
          alignSelf={"flex-end"}
          color="inherit"
        >
          „
        </Text>
      </Box>

      <Text fontWeight="semibold" width={"full"} textAlign={"center"} color="inherit">
        {testimonial.authorName}
      </Text>

      <Rating value={testimonial.rating} />
    </Box>
  );
}

export function Rating({ value }: { value: number }) {
  const maxCount = 5;
  const fullCount = value >= maxCount ? maxCount : Math.floor(value);
  const emptyCount = maxCount - fullCount;

  return (
    <Box display="flex" alignItems="center" gap="1" height="4">
      {[...Array(fullCount)].map((_, idx) => (
        <StarIcon key={idx} boxSize={4} color="orange" stroke="4" fill="orange" />
      ))}
      {[...Array(emptyCount)].map((_, idx) => (
        <StarIcon key={idx} boxSize={4} color="#cbcbcb" stroke="4" fill="#cbcbcb" />
      ))}
    </Box>
  );
}
