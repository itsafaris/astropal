import React, { useState } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { TestimonialCard } from "@components/testimonial";
import { StaticImage } from "gatsby-plugin-image";

import { ChatBubble, NextButton } from "../components";

export function SocialProofFiller() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide type="filler" id="user-testimonial">
      <ChatBubble
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
