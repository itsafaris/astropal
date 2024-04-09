import React from "react";
import { Callout, Selector, Slide, useQuiz, useQuizState } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";
import { StaticImage } from "gatsby-plugin-image";
import { QuizStateParsed, getPersonalInfoFromState } from "@utils/state";
import { useUserProfileState } from "src/appState";
import { createNatalChartReading, createNewUserProfile } from "@utils/coreApi";

export function YourBirthPlaceSlide() {
  const { checkQuestion, submitQuestion } = useQuiz();
  const { quizState } = useQuizState();
  const [userProfile, setUserProfile] = useUserProfileState();

  const p = getPersonalInfoFromState(quizState);

  async function createUser(p: QuizStateParsed) {
    setUserProfile({ isLoading: true, result: undefined, error: undefined });
    createNewUserProfile(p)
      .then((result) => {
        setUserProfile({ isLoading: false, error: undefined, result });
        submitQuestion();
        // this does not need to be awaited, it's only for the backend to make things quicker to appear
        void createNatalChartReading({ userID: result.id });
      })
      .catch((err) => {
        console.error(err);
        setUserProfile({ isLoading: false, error: err, result: undefined });
      });
  }

  return (
    <Slide id="your-birth-place" type="location" placeholder="e.g. New York">
      <SlideHeading mb={2} text="What city were you born in?" />
      <StaticImage
        src="../../../images/city_skyline_pencil.png"
        alt="pencil drawing of a city skyline"
        layout="fixed"
        placeholder="blurred"
        height={180}
        style={{ margin: "0 auto 32px" }}
      />
      <Callout mb={0}>
        💡 If you're unsure of the exact location, enter a nearby major city.
      </Callout>

      <Selector />
      <NextButton
        isLoading={userProfile.isLoading}
        isDisabled={!!userProfile.error}
        onClick={() => {
          const r = checkQuestion();
          if (!r) {
            return;
          }

          void createUser(p);
        }}
      >
        Continue
      </NextButton>
    </Slide>
  );
}
