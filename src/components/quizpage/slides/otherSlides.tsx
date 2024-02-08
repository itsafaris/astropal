import React, { useState } from "react";
import { Selector, Slide, useQuiz, useQuizState } from "@martynasj/quiz-lib";
import { Box, Card, Flex, Text } from "@chakra-ui/react";

import { SlideHeading, NextButton, Span, SpanJust } from "../components";
import { StaticImage } from "gatsby-plugin-image";
import { NatalChartInterpreter } from "../interpreter";

import { bookToc } from "@utils/book";

import { SquaredStar } from "@components/svg/icons";
import { getPersonalInfoFromState } from "@utils/state";

export function AstrologerThemePreferences() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide
      id="astrologer-theme-preferences"
      type="multi"
      variant="list"
      options={[
        { text: "Career", icon: "💼" },
        { text: "Finances", icon: "💰" },
        { text: "Love & Relationships", icon: "💞" },
        { text: "Personal Growth", icon: "🍀" },
        { text: "Self understanding", icon: "🧘" },
      ]}
    >
      <SlideHeading text="Select which of the chapters should be included in your book?" />
      <Selector />
      <NextButton onClick={() => submitQuestion()}>Continue</NextButton>
    </Slide>
  );
}

export function BookTone() {
  return (
    <Slide
      id="book-tone"
      type="single"
      variant="list"
      options={[
        { text: "Friendly and easy to read", icon: "🌅" },
        { text: "Balanced", icon: "☀️" },
        { text: "Scientific", icon: "🌃" },
      ]}
    >
      <SlideHeading>How do you want your book to be written?</SlideHeading>
      <Selector />
    </Slide>
  );
}

export function NotificationReceiver() {
  return (
    <Slide
      id="weekly-forecast"
      type="single"
      variant="list"
      options={[
        { text: "Yes", icon: "✅" },
        { text: "No", icon: "➖" },
      ]}
    >
      <SlideHeading
        text={
          <SpanJust>
            Would you like to <Span color="green.400">receive notifications</Span> for making
            important life decisions based on cosmic events?
          </SpanJust>
        }
      />
      <Selector />
    </Slide>
  );
}

export function Loading_CreatingBirthChart() {
  return (
    <Slide
      id="loading-creating-birthchart"
      type="loading"
      duration={8}
      statusText={({ progress }) => {
        if (progress < 100) {
          return "Calculating chart...";
        }
        return "Completed";
      }}
    >
      <SlideHeading>
        We're now calculating your <Span>Birth Chart</Span> - a snapshot of the sky at the time and
        place you were born.
      </SlideHeading>
      <Selector />
    </Slide>
  );
}

export function Loading_CreatingBlueprint() {
  return (
    <Slide
      id="loading-creating-blueprint"
      type="loading"
      duration={8}
      statusText={({ progress }) => {
        if (progress < 60) {
          return "Reading your birth chart...";
        }
        if (progress < 100) {
          return "Personalising the reading...";
        }
        return "Completed";
      }}
    >
      <Selector />
      <Text textAlign={"center"} fontSize={"lg"} fontWeight={"bold"} color="bg.500" mb={4}>
        Here is what media
        <br /> says about us
      </Text>
      <Card p={4} my={4}>
        <Flex gap={1} mb={2}>
          <SquaredStar />
          <SquaredStar />
          <SquaredStar />
          <SquaredStar />
          <SquaredStar />
        </Flex>
        <Text mb={2}>
          The ultimate gift of self-discovery: Perfect for anyone seeking deeper self-awareness or a
          meaningful, personalized gift that speaks to the soul.
        </Text>
        <svg
          height={"16px"}
          style={{ alignSelf: "start" }}
          viewBox="0 0 173 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.24448 3.30971H0.755474V0.536987H10.8759V3.30971H7.38689V16.7112H4.24448V3.30971ZM17.4844 4.90402H19.6795C20.3572 5.76664 20.8194 6.62927 21.0658 7.49189C21.3123 8.35451 21.4355 9.43279 21.4355 10.7267V16.7112H18.3624V10.4957C18.3624 9.03229 18.1622 7.97712 17.7617 7.33015H15.1738V16.7112H12.1007V0.536987H15.1738V5.73584C15.5127 5.42776 15.8285 5.2121 16.1211 5.08887C16.4292 4.96564 16.8836 4.90402 17.4844 4.90402ZM28.6753 7.33015H26.9423C26.7113 7.60742 26.5187 7.99252 26.3647 8.48545C26.226 8.97838 26.1567 9.4559 26.1567 9.91802H29.4609C29.4917 9.4559 29.4301 8.97838 29.276 8.48545C29.122 7.97712 28.9217 7.59202 28.6753 7.33015ZM31.8177 14.2851V16.7112H25.9488C24.8705 15.9872 24.108 15.0938 23.6613 14.0309C23.23 12.9526 23.0143 11.8666 23.0143 10.7729C23.0143 8.24669 23.9694 6.29038 25.8794 4.90402H29.6226C30.6547 5.65882 31.3556 6.45982 31.7253 7.30704C32.095 8.15426 32.2798 9.00918 32.2798 9.87181C32.2798 10.7344 32.2105 11.4738 32.0719 12.09H26.3185C26.3647 12.4443 26.4956 12.8525 26.7113 13.3146C26.9423 13.7613 27.1888 14.0848 27.4507 14.2851H31.8177ZM40.7888 14.0309H42.8683C43.2996 13.4917 43.6385 12.7061 43.885 11.6741C44.1468 10.642 44.2778 9.61764 44.2778 8.60098C44.2778 6.18255 43.8234 4.41879 42.9145 3.30971H40.7888V14.0309ZM37.6464 16.7112V0.536987H44.3471C46.5345 2.47789 47.6281 5.11197 47.6281 8.43924C47.6281 11.7511 46.6038 14.5084 44.555 16.7112H37.6464ZM54.6524 11.3737H52.18C51.8565 11.7742 51.6948 12.2748 51.6948 12.8756C51.6948 13.4763 51.8642 13.9462 52.2031 14.2851H54.6524V11.3737ZM49.6846 4.90402H55.4149C56.3391 5.45856 56.9476 6.09783 57.2402 6.82182C57.5329 7.5304 57.6793 8.50085 57.6793 9.73317V13.1991C57.6793 14.4776 57.7101 15.6483 57.7717 16.7112H55.1376L54.7217 15.8794C54.1209 16.4339 53.2737 16.7112 52.18 16.7112H50.7243C49.415 15.8486 48.7603 14.6085 48.7603 12.9911C48.7603 11.3583 49.4304 10.0721 50.7706 9.13242H52.9425C53.5433 9.13242 54.1055 9.31726 54.6293 9.68696V8.53166C54.6293 7.9309 54.3674 7.5304 53.8437 7.33015H49.6846V4.90402ZM59.6665 16.7112V4.90402H62.7165V16.7112H59.6665ZM59.6665 0.536987H62.7165V3.6563H59.6665V0.536987ZM67.7484 0.536987V16.7112H64.6984V0.536987H67.7484ZM69.661 10.2184V4.90402H72.7341V10.2415C72.7341 11.5817 73.0036 12.6984 73.5428 13.5919H74.906C75.4144 12.7138 75.6685 11.5971 75.6685 10.2415V4.90402H78.7416V10.0567C78.7416 11.212 78.5876 12.2286 78.2795 13.1066C77.9868 13.9847 77.5016 14.9782 76.8238 16.0873L75.2757 18.6059C74.9985 19.0834 74.7058 19.4377 74.3977 19.6687C74.0896 19.8998 73.6891 20.0693 73.1962 20.1771H69.5454V17.751H72.0409C72.3644 17.6585 72.6339 17.4968 72.8496 17.2657C73.0653 17.0347 73.2886 16.7035 73.5197 16.2722L73.6583 16.018H72.064C71.3246 15.4172 70.7393 14.6085 70.3079 13.5919C69.8766 12.5598 69.661 11.4353 69.661 10.2184ZM91.3532 16.7112L90.8679 14.1464H87.2172L86.732 16.7112H83.5895L86.7089 0.536987H91.4918L94.4494 16.7112H91.3532ZM88.9964 3.54077L88.0952 8.92446L87.5869 11.6741H90.4751L89.9437 8.92446L89.0426 3.54077H88.9964ZM96.8347 4.90402H101.941V7.33015H98.3366L100.532 10.5881C101.518 11.9899 102.064 12.9526 102.172 13.4763C102.234 13.7228 102.265 13.977 102.265 14.2388C102.265 15.3325 101.856 16.1566 101.04 16.7112H95.148V14.2851H99.3764L96.904 10.6574C96.7962 10.488 96.6267 10.2492 96.3957 9.94113C96.18 9.63305 96.0106 9.38658 95.8874 9.20173C95.7641 9.00148 95.6794 8.85514 95.6332 8.76272C95.587 8.6703 95.5254 8.55477 95.4483 8.41613C95.3713 8.26209 95.3174 8.13116 95.2866 8.02333C95.225 7.73065 95.1942 7.49189 95.1942 7.30704C95.1942 6.18255 95.741 5.38154 96.8347 4.90402ZM104.451 11.5585V7.33015H102.856V4.90402H104.451V1.69229H107.524V4.90402H109.418V7.33015H107.524V12.2979C107.524 13.2376 107.685 13.9 108.009 14.2851H109.418V16.7112H106.137C105.321 15.9564 104.828 15.14 104.659 14.2619C104.52 13.5226 104.451 12.6214 104.451 11.5585ZM110.979 16.7112V4.90402H113.174L113.751 6.15174C114.368 5.31993 115.145 4.90402 116.085 4.90402H116.986V8.00022H114.052V16.7112H110.979ZM124.907 16.7112H119.87C118.33 15.2786 117.559 13.3223 117.559 10.8423C117.559 9.59454 117.729 8.50855 118.068 7.58431C118.422 6.66008 118.977 5.76664 119.731 4.90402H125.138C125.939 5.82826 126.486 6.72939 126.779 7.60742C127.071 8.47004 127.218 9.54832 127.218 10.8423C127.218 13.3223 126.447 15.2786 124.907 16.7112ZM121.51 14.2851H123.267C123.821 13.2068 124.098 11.9822 124.098 10.6112C124.098 9.24024 123.813 8.14656 123.243 7.33015H121.51C120.956 8.11575 120.679 9.23254 120.679 10.6805C120.679 12.1131 120.956 13.3146 121.51 14.2851ZM131.922 0.536987V16.7112H128.872V0.536987H131.922ZM140.928 16.7112H135.891C134.35 15.2786 133.58 13.3223 133.58 10.8423C133.58 9.59454 133.75 8.50855 134.088 7.58431C134.443 6.66008 134.997 5.76664 135.752 4.90402H141.159C141.96 5.82826 142.507 6.72939 142.799 7.60742C143.092 8.47004 143.238 9.54832 143.238 10.8423C143.238 13.3223 142.468 15.2786 140.928 16.7112ZM137.531 14.2851H139.287C139.842 13.2068 140.119 11.9822 140.119 10.6112C140.119 9.24024 139.834 8.14656 139.264 7.33015H137.531C136.977 8.11575 136.699 9.23254 136.699 10.6805C136.699 12.1131 136.977 13.3146 137.531 14.2851ZM153.834 4.90402V15.4866C153.834 16.6573 153.68 17.5969 153.372 18.3055C153.08 19.0141 152.487 19.6379 151.593 20.1771H146.325V17.7741H150.276C150.661 17.543 150.854 17.1733 150.854 16.665V15.3017C150.284 15.7792 149.375 16.018 148.127 16.018H146.441C145.193 14.5238 144.569 12.7909 144.569 10.8192C144.569 9.40199 144.769 8.24669 145.17 7.35325C145.57 6.44442 146.156 5.62801 146.926 4.90402H148.636C149.637 4.90402 150.43 5.2275 151.016 5.87447L151.431 4.90402H153.834ZM150.761 7.33015H148.52C147.966 8.2852 147.688 9.38658 147.688 10.6343C147.688 11.8666 147.927 12.8833 148.405 13.6843H150.761V7.33015ZM161.061 7.33015H159.328C159.097 7.60742 158.904 7.99252 158.75 8.48545C158.612 8.97838 158.542 9.4559 158.542 9.91802H161.846C161.877 9.4559 161.816 8.97838 161.662 8.48545C161.508 7.97712 161.307 7.59202 161.061 7.33015ZM164.203 14.2851V16.7112H158.334C157.256 15.9872 156.494 15.0938 156.047 14.0309C155.616 12.9526 155.4 11.8666 155.4 10.7729C155.4 8.24669 156.355 6.29038 158.265 4.90402H162.008C163.04 5.65882 163.741 6.45982 164.111 7.30704C164.481 8.15426 164.665 9.00918 164.665 9.87181C164.665 10.7344 164.596 11.4738 164.457 12.09H158.704C158.75 12.4443 158.881 12.8525 159.097 13.3146C159.328 13.7613 159.574 14.0848 159.836 14.2851H164.203ZM166.239 16.7112V4.90402H168.434L169.012 6.15174C169.628 5.31993 170.406 4.90402 171.345 4.90402H172.247V8.00022H169.312V16.7112H166.239Z"
            fill="black"
          />
        </svg>
      </Card>
    </Slide>
  );
}

export function Filler_BirthChartInterpretation() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="filler-birth-chart-interpretation" type="filler">
      <SlideHeading>
        <Span color="purple.600">The Book of You</Span> is created from your{" "}
        <Span>Birth Chart</Span>. It is an easy to read interpretation of the information encoded in
        the chart
      </SlideHeading>

      <NextButton mt={8} onClick={() => submitQuestion()}>
        Personalise interpretation
      </NextButton>

      <Box
        position={"absolute"}
        left={"50%"}
        transform={"translateX(-50%)"}
        width={"70%"}
        mt={4}
        borderRadius={"xl"}
        bottom="0"
        overflow={"hidden"}
      >
        <StaticImage
          alt="Clarity increase when using astrologer guidance chart"
          src="../../../images/book1.png"
        />
      </Box>
    </Slide>
  );
}

export function Filler_IntroToPersonality() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="filler-personality" type="filler">
      <SlideHeading>
        Believe it or not, your Birth Chart contains the <Span color="purple.600">reasons</Span>{" "}
        behind most of <Span color="purple.600">your actions</Span> and{" "}
        <Span color="purple.600">choices</Span>.{" "}
        <Span>It can be decoded to reveal the most significant insights</Span>
      </SlideHeading>

      <Box width={"70%"} mx="auto" mt={4} borderRadius={"xl"} bottom="0" overflow={"hidden"}>
        <StaticImage
          alt="Clarity increase when using astrologer guidance chart"
          src="../../../images/iceberg.png"
        />
      </Box>

      <NextButton mt={8} onClick={() => submitQuestion()}>
        Continue
      </NextButton>
    </Slide>
  );
}

export function PersonalizedBirthChartReading() {
  return (
    <Slide
      id="personalized-birth-chart-reading"
      type="single"
      variant="list"
      options={[
        { text: "Yes", icon: "✅" },
        { text: "No", icon: "❌" },
        { text: "Not sure", icon: "😕" },
      ]}
    >
      <SlideHeading text={"Have you ever received a personalised reading of your birth chart?"} />
      <Selector />
    </Slide>
  );
}

export function Filler_BookStructure() {
  return (
    <Slide id="filler-book-structure" type="filler">
      <SlideHeading>
        Your Personalised Self-Discovery Guide will contain <Span>78 pages of unique content</Span>.
        Here's a sneak peek:
      </SlideHeading>

      <Box
        bg="white"
        mx="auto"
        px={4}
        py={8}
        boxShadow={"4px 4px 9px 0px #cebeaf"}
        borderRadius={"md"}
        width={"300px"}
      >
        <Text textAlign={"center"} mb={4}>
          Chapters
        </Text>
        <Box>
          {bookToc.chapters.map((chapter) => {
            return (
              <Box key={chapter.title} mb={2}>
                <Text key={chapter.title} fontSize={"2xs"} fontFamily={"monospace"}>
                  {chapter.title}
                </Text>
                <Box ml={4}>
                  {chapter.chapters?.map((subchapter) => {
                    return (
                      <Text
                        key={subchapter.title}
                        fontSize={"2xs"}
                        fontFamily={"monospace"}
                        fontWeight={"semibold"}
                      >
                        {subchapter.title}
                      </Text>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function Filler_FactOnMissedOpportunities() {
  return (
    <Slide id="filler-missed-opportunities" type="filler">
      <SlideHeading>
        Did you know that the main cause of hesitation is the{" "}
        <Span>lack of self understanding</Span>
      </SlideHeading>
      <StaticImage
        alt="unused opportunities by people"
        src="../../../images/confidence_chart.png"
      />
      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function Filler_BookBlueprintSummary() {
  return (
    <Slide id="filler-book-blueprint-summary" type="filler">
      <SlideHeading>
        A personalised <Span>Self-Discovery Guide</Span> is the most optimal way to staying on the
        right path
      </SlideHeading>
      <Box my={4} overflow={"hidden"} borderRadius={"lg"} bg="white" p={4}>
        <StaticImage
          alt="road to reaching a goal"
          placeholder="none"
          src="../../../images/reaching_goal.png"
        />
      </Box>
      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function YourGuidanceIsReady() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="guidance-ready" type="filler">
      <SlideHeading
        text={
          <SpanJust>
            Your astrologer is now ready to provide you a <Span>personalized life guidance</Span>
          </SpanJust>
        }
      />
      <Box mt={4} overflow={"hidden"}>
        <StaticImage
          alt="Clarity increase when using astrologer guidance chart"
          src="../../../images/clarity_chart.png"
        />
      </Box>

      <NextButton mt={8} onClick={() => submitQuestion()}>
        Continue
      </NextButton>
    </Slide>
  );
}

export function AstrologerAdvicePersonality() {
  const [showInput, setShowInput] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="personality-description" type="filler">
      <SlideHeading text="   Tell me about my personality" />

      <NatalChartInterpreter
        title="Your personality"
        prompt="What is my personality like? Provide a short list of my strenghts and weaknesses"
        onFinishedAnswer={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <NextButton
          onClick={() => {
            quiz.submitQuestion();
          }}
          my={8}
        >
          Continue
        </NextButton>
      )}
    </Slide>
  );
}

export function AstrologerAdviceCareer() {
  const [showInput, setShowInput] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="advice-career" type="filler">
      <SlideHeading text="What are my career prospects?" />

      <NatalChartInterpreter
        title="Your career"
        prompt={`Describe my career. Structure your response in these sections. Section titles should be as follows:
        - Short summary of what generic career and professional choices are good for me (do not include the section title).
        - Careers that fit you
        - Career choices to avoid
        
         Only respond with what is asked for. Do not add any other text to your response beyong the sections that are asked for.
        `}
        onFinishedAnswer={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <NextButton
          onClick={() => {
            quiz.submitQuestion();
          }}
          my={8}
        >
          Continue
        </NextButton>
      )}
    </Slide>
  );
}

export function AstrologerAdviceRelationships() {
  const [showInput, setShowInput] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="advice-relationships" type="filler">
      <SlideHeading text="Tell me about my relationships" />

      <NatalChartInterpreter
        title="Your relationships"
        prompt={`Describe me what am I in a relationships? Structure your response in these sections:
        - Short summary (do not include section title)
        - Zodiac signs that I match well with (include section title). Every list item should have an emoji representing this zodiac sign. Include a few word description summarising the match with this sign.
        - A list of zodiac signs that I should avoid (include section title).
        - A short list of my weaknesses in relationships.
        
         Only respond with what is asked for. Do not add any other text to your response beyong the sections that are asked for.
        `}
        onFinishedAnswer={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <NextButton
          onClick={() => {
            quiz.submitQuestion();
          }}
          my={8}
        >
          Continue
        </NextButton>
      )}
    </Slide>
  );
}
