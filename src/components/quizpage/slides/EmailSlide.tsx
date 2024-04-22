import React from "react";
import { Selector, Slide, useQuiz, useQuizContext } from "@martynasj/quiz-lib";
import { Text } from "@chakra-ui/react";

import { Caption, SlideHeading, NextButton, Span } from "../components";
import { useState } from "react";
import { useUserProfileState } from "src/appState";
import { convertUserFromAnonymous } from "@utils/coreApi";
import { getTypedQuizState } from "@utils/state";
import posthog from "posthog-js";
import { trackPixel } from "@utils/tracking";

export function EmailSlide() {
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <ContentEmail />
    </Slide>
  );
}

type RequestStatus = {
  isLoading: boolean;
  error?: any;
};

function ContentEmail() {
  const { submitQuestion } = useQuiz();
  const quizState = useQuizContext();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>({ isLoading: false });
  const [userProfile] = useUserProfileState();

  function redirectToApp(input: { userID: string }) {
    const params = new URLSearchParams();
    params.append("userID", input.userID);
    const url = `${process.env.GATSBY_WEBAPP_URL}?${params.toString()}`;
    location.href = url;
  }

  return (
    <>
      <SlideHeading color="text.main" fontSize={"md"} mt={-3} mb={7}>
        <Span>One last thing!</Span> Enter your email and start using your personalised astrologer
      </SlideHeading>

      <Selector />

      <Caption mt={-6} mb={7}>
        🔒 We respect your privacy and are committed to protecting your personal data. We will only
        send you personalized astrological insights and updates to enlighten your journey.
      </Caption>

      {requestStatus.error && <Text>{String(requestStatus.error)}</Text>}

      <NextButton
        isLoading={requestStatus.isLoading}
        onClick={async () => {
          const result = submitQuestion();
          // validation failed
          if (!result) {
            return;
          }

          const parsedQuizState = getTypedQuizState(quizState);

          posthog.identify(parsedQuizState.email);
          trackPixel("Lead", {});

          if (!userProfile) {
            return;
          }

          setRequestStatus({ isLoading: true });
          try {
            await convertUserFromAnonymous({
              userID: userProfile.result!.id,
              email: parsedQuizState.email,
            });
            setRequestStatus({ isLoading: false });
          } catch (err) {
            setRequestStatus({ isLoading: false, error: err });
            return;
          }

          redirectToApp({ userID: userProfile.result!.id });
        }}
      >
        Take me to my astrologer
      </NextButton>
    </>
  );
}
