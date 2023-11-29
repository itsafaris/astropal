import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import {
  Callout,
  Image,
  Quiz,
  QuizTheme,
  Segment,
  Selector,
  Slide,
  Subtitle,
  Title,
} from "@martynasj/quiz-lib";
import femaleImg from "../images/female.png";
import maleImg from "../images/male.png";
import neutralImg from "../images/neutral.png";
import palmImg from "../images/palm-map.png";
import skymapImg from "../images/skymap.png";
import { isSSR } from "@utils/ssr";
import { brandColor } from "@utils/theme";
import { useRef } from "react";

const quizTheme: QuizTheme = {
  mainColor: brandColor,
};

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

export default function QuizPage() {
  const $root = useRef<HTMLDivElement>(null);

  if (isSSR()) {
    return <div></div>;
  }

  return (
    <ChakraProvider>
      <Flex
        ref={$root}
        minHeight={"100vh"}
        direction={"column"}
        py={4}
        pb={200}
      >
        <Text
          fontSize={"2xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          fontFamily={"mono"}
          color={quizTheme.mainColor?.[700]}
        >
          AstroPal
        </Text>
        <Quiz
          theme={quizTheme}
          locationApiKey={locationApiKey}
          onErrorEvent={(_) => {
            //
          }}
        >
          <Segment title={"Intro"}>
            <Slide
              id="relationship-goals"
              type="single"
              variant="list"
              options={[
                {
                  text: "Fix relationship problems",
                },
                {
                  text: "Increase relationship satisfaction",
                },
                {
                  text: "Find partner",
                },
              ]}
            >
              <Title>
                What are your primary goals and aspirations right now?
              </Title>
              <Selector />
            </Slide>

            <Slide id="filler-sky-map" type="filler">
              <Title>
                Good! Now that we have a clear goal in mind, let's create your
                astrological avatar.
              </Title>
              <Image src={skymapImg} />
            </Slide>
          </Segment>

          <Segment title="Avatar creation">
            <Slide
              id="gender"
              type="single"
              variant="picture"
              size="small"
              options={[
                {
                  text: "Male",
                  imgUrl: maleImg,
                },
                {
                  text: "Female",
                  imgUrl: femaleImg,
                },
                {
                  text: "Other",
                  imgUrl: neutralImg,
                },
              ]}
            >
              <Title>What is your gender?</Title>
              <Selector />
            </Slide>

            <Slide
              id="birth-name"
              type="short-text"
              placeholder="Your birth name"
            >
              <Title>What is your full birth name?</Title>
              <Callout>
                A person's name holds a significant information about their
                personality and life path
              </Callout>
              <Selector />
            </Slide>

            <Slide id="filler-birth-name" type="filler">
              <Title>What is your full birth name {birthname}?</Title>
              <Callout>
                A person's name holds a significant information about their
                personality and life path
              </Callout>
              <Selector />
            </Slide>

            <Slide id="birth-date" type="date">
              <Title>What's your date of birth?</Title>
              <Callout>
                Knowing the day you were born is vital for crafting thorough and
                precise forecasts as well.
              </Callout>
              <Selector />
            </Slide>

            {/* TODO: birth time  */}

            <Slide
              id="birth-place"
              type="location"
              placeholder="Your birthplace"
              optional
            >
              <Title>Where were you born?</Title>
              <Callout>
                Discovering this place is key to uncovering the fundamental
                aspects of who you are, your innermost yearnings, and your true
                aspirations.
              </Callout>
              <Selector />
            </Slide>

            <Slide
              id="loading-one"
              type="loading"
              phases={[
                {
                  title: "Creating your meta profile",
                  duration: 2,
                },
                {
                  title: "Connecting to the stars",
                  duration: 2,
                },
                {
                  title: "Matching personalised psychics readers",
                  duration: 2,
                },
              ]}
            >
              <Title>
                We will configure your meta profile based on the phase 1 answers
              </Title>
              <Selector />
            </Slide>

            <Slide id="filler-palm" type="filler">
              <Title>
                Thank you for waiting! We can now continue with the phase 2
              </Title>
              <Image src={palmImg} />
            </Slide>
          </Segment>

          <Segment title={"Personality"}>
            <Slide
              id="personality-type"
              type="single"
              variant="list"
              options={[
                {
                  text: "Curious and Creative",
                  icon: "🧠",
                },
                {
                  text: "Friendly and Outgoing",
                  icon: "🌟",
                },
                {
                  text: "Organized and Detail-Oriented",
                  icon: "🗂️",
                },
                {
                  text: "Ambitious and Competitive",
                  icon: "🏆",
                },
                {
                  text: "Calm and Stable",
                  icon: "🏞️",
                },
                {
                  text: "Compassionate and Supportive",
                  icon: "💞",
                },
              ]}
            >
              <Title>How would you describe your personality?</Title>
              <Subtitle>
                You may find that more than one answer is suitable, but pick the
                one that resonates with your personality type the most.
              </Subtitle>
              <Selector />
            </Slide>

            <Slide
              id="most-important-thing"
              type="single"
              variant="list"
              options={[
                {
                  text: "Success",
                  icon: "🏆",
                },
                {
                  text: "Romance",
                  icon: "💖",
                },
                {
                  text: "Stability",
                  icon: "🏡",
                },
                {
                  text: "Freedom",
                  icon: "🕊️",
                },
                {
                  text: "Knowledge",
                  icon: "📚",
                },
                {
                  text: "Helping Others",
                  icon: "🤝",
                },
              ]}
            >
              <Title>What is most important to you?</Title>
              <Selector />
            </Slide>

            <Slide
              id="major-events"
              type="multi"
              variant="list"
              options={[
                {
                  text: "Having a baby",
                  icon: "👶",
                },
                {
                  text: "Going through a divorce",
                  icon: "💔",
                },
                {
                  text: "Starting a new job",
                  icon: "💼",
                },
                {
                  text: "Moving to a new place",
                  icon: "🚚",
                },
                {
                  text: "Losing a loved one",
                  icon: "🖤",
                },
                {
                  text: "Getting married",
                  icon: "💍",
                },
              ]}
            >
              <Title>What were the major events in your life?</Title>
              <Selector />
            </Slide>

            <Slide
              id="decision-making"
              type="single"
              variant="list"
              options={[
                {
                  text: "Always with my head",
                  icon: "🧠",
                },
                {
                  text: "Mostly with my head",
                  icon: "💡",
                },
                {
                  text: "Equally with my head and heart",
                  icon: "⚖️",
                },
                {
                  text: "Mostly with my heart",
                  icon: "❤️",
                },
                {
                  text: "Always with my heart",
                  icon: "💖",
                },
              ]}
            >
              <Title>Do you make decisions with your head or your heart?</Title>
              <Selector />
            </Slide>

            <Slide
              id="worry-if-not-good"
              type="single"
              variant="list"
              options={[
                {
                  text: "Yes",
                  icon: "😟",
                },
                {
                  text: "Sometimes",
                  icon: "😕",
                },
                {
                  text: "Rarely",
                  icon: "🙃",
                },
                {
                  text: "Not at all",
                  icon: "😄",
                },
              ]}
            >
              <Title>Do you often worry that you're not good enough?</Title>
              <Selector />
            </Slide>

            <Slide
              id="emotional-state"
              type="single"
              variant="list"
              options={[
                {
                  text: "Happy",
                  icon: "😊",
                },
                {
                  text: "Stressed",
                  icon: "😤",
                },
                {
                  text: "Anxious",
                  icon: "😟",
                },
                {
                  text: "Calm",
                  icon: "😌",
                },
              ]}
            >
              <Title>
                How would you describe your current emotional state?
              </Title>
              <Selector />
            </Slide>

            <Slide
              id="loading-personality-end"
              type="loading"
              phases={[
                {
                  title: "Creating your meta profile",
                  duration: 2,
                },
                {
                  title: "Connecting to the stars",
                  duration: 2,
                },
                {
                  title: "Matching personalised psychics readers",
                  duration: 2,
                },
              ]}
            >
              <Title>
                We will configure your meta profile based on the phase 1 answers
              </Title>
              <Selector />
            </Slide>
          </Segment>

          <Segment title={"Spiritual knowledge"}>
            <Slide
              id="spirituality-knowledge"
              type="single"
              variant="list"
              options={[
                {
                  text: "An expert",
                  icon: "🧘‍♂️",
                },
                {
                  text: "Curious",
                  icon: "🔍",
                },
                {
                  text: "A beginner",
                  icon: "🌱",
                },
              ]}
            >
              <Title>How knowledgeable are you about spirituality?</Title>
              <Selector />
            </Slide>

            <Slide
              id="prev-spirituality-experience"
              type="single"
              variant="list"
              options={[
                {
                  text: "Many times",
                  icon: "✨",
                },
                {
                  text: "A few memorable times",
                  icon: "🔮",
                },
                {
                  text: "Once or twice",
                  icon: "💫",
                },
                {
                  text: "Never",
                  icon: "❌",
                },
                {
                  text: "I'm not sure",
                  icon: "🤔",
                },
              ]}
            >
              <Title>
                Have you had any experiences in the past that you would consider
                spiritually significant?
              </Title>
              <Selector />
            </Slide>

            <Slide
              id="intuition-gut-feeling"
              type="single"
              variant="list"
              options={[
                {
                  text: "Highly accurate, I trust them completely",
                  icon: "🎯",
                },
                {
                  text: "Usually reliable, I often listen to them",
                  icon: "👂",
                },
                {
                  text: "Occasionally insightful, they're right sometimes",
                  icon: "💡",
                },
                {
                  text: "Unpredictable, I'm skeptical about gut feelings",
                  icon: "🎲",
                },
                {
                  text: "Non-existent, I only rely on facts and logic",
                  icon: "📊",
                },
              ]}
            >
              <Title>
                How would you describe your intuition or gut feelings?
              </Title>
              <Selector />
            </Slide>

            <Slide id="color-choice" type="single" variant="list">
              <Title>
                Is there a color that you feel particularly drawn to or that
                resonates with you?
              </Title>
              <Selector />
            </Slide>

            <Slide
              id="tension-areas"
              type="multi"
              variant="list"
              options={[
                {
                  text: "Head - I often feel energy or tension here",
                  icon: "💆‍♂️",
                },
                {
                  text: "Neck and shoulders - this is where I carry my stress",
                  icon: "🤦",
                },
                {
                  text: "Chest - I feel it flutter with excitement or tighten with anxiety",
                  icon: "❤️",
                },
                {
                  text: "Stomach - I experience 'gut feelings' or butterflies here",
                  icon: "🦋",
                },
                {
                  text: "Back - I either feel strong or sense tension along my spine",
                  icon: "🔄",
                },
                {
                  text: "Hands and feet - These extremities tingle with energy or relaxation",
                  icon: "🙌",
                },
                {
                  text: "I am not particularly aware of such sensations in my body",
                  icon: "😶",
                },
              ]}
            >
              <Title>
                How would you describe your intuition or gut feelings?
              </Title>
              <Selector />
            </Slide>

            <Slide
              id="loading-spirituality-end"
              type="loading"
              phases={[
                {
                  title: "Creating your meta profile",
                  duration: 2,
                },
                {
                  title: "Connecting to the stars",
                  duration: 2,
                },
                {
                  title: "Matching personalised psychics readers",
                  duration: 2,
                },
              ]}
            >
              <Title>
                We will configure your meta profile based on the phase 1 answers
              </Title>
              <Selector />
            </Slide>
          </Segment>

          <Segment title="Love & Relationship">
            <Slide
              id="relationship-status"
              type="single"
              variant="list"
              logic={[
                {
                  optionIdx: 0,
                  slideID: "single-branch-start",
                },
                {
                  optionIdx: 1,
                  slideID: "relationship-satisfaction",
                },
                {
                  optionIdx: 2,
                  slideID: "relationship-satisfaction",
                },
                {
                  optionIdx: 3,
                  slideID: "relationship-satisfaction",
                },
                {
                  optionIdx: 4,
                  slideID: "",
                },
              ]}
              options={[
                {
                  text: "Single",
                  icon: "🚶‍♂️",
                },
                {
                  text: "In a relationship",
                  icon: "💑",
                },
                {
                  text: "Married",
                  icon: "💍",
                },
                {
                  text: "It's complicated",
                  icon: "❓",
                },
                {
                  text: "Prefer not to say",
                  icon: "🤐",
                },
              ]}
            >
              <Title>
                So we can get to know you better, tell us about your
                relationship status.
              </Title>
              <Selector />
            </Slide>

            <Slide
              id="relationship-satisfaction"
              type="single"
              variant="list"
              options={[
                {
                  text: "Very satisfied and happy",
                  icon: "😍",
                },
                {
                  text: "Generally satisfied",
                  icon: "☺️",
                },
                {
                  text: "It has its ups and downs",
                  icon: "🎢",
                },
                {
                  text: "Somewhat dissatisfied",
                  icon: "😕",
                },
                {
                  text: "Very dissatisfied and unhappy",
                  icon: "💔",
                },
                {
                  text: "I am not in a relationship",
                  icon: "👤",
                },
              ]}
            >
              <Title>How do you feel about your relationship?</Title>
              <Selector />
            </Slide>

            <Slide
              id="partner-detail-big-picture"
              type="single"
              variant="list"
              options={[
                {
                  text: "Definitely detail-oriented",
                  icon: "🔍",
                },
                {
                  text: "Leans towards detail-oriented",
                  icon: "📝",
                },
                {
                  text: "A balance of both",
                  icon: "⚖️",
                },
                {
                  text: "Leans towards big-picture",
                  icon: "🌅",
                },
                {
                  text: "Definitely big-picture",
                  icon: "🖼️",
                },
                {
                  text: "I’m not sure",
                  icon: "❓",
                },
              ]}
            >
              <Title>
                Would you describe your partner as a detail-oriented or
                big-picture person?
              </Title>
              <Selector />
            </Slide>

            <Slide
              id="partner-introvert"
              type="single"
              variant="list"
              options={[
                {
                  text: "Definitely an introvert",
                  icon: "📚",
                },
                {
                  text: "More introverted than extroverted",
                  icon: "🏠",
                },
                {
                  text: "A mix of both introvert and extrovert",
                  icon: "🔄",
                },
                {
                  text: "More extroverted than introverted",
                  icon: "🎉",
                },
                {
                  text: "Definitely an extrovert",
                  icon: "🤹",
                },
                {
                  text: "I’m not sure",
                  icon: "❓",
                },
              ]}
            >
              <Title>Is your partner an introvert or extrovert?</Title>
              <Selector />
            </Slide>

            <Slide
              id="partner-irritated-easily"
              type="single"
              variant="list"
              options={[
                {
                  text: "Yes",
                  icon: "😡",
                },
                {
                  text: "No",
                  icon: "😇",
                },
                {
                  text: "Sometimes",
                  icon: "😐",
                },
                {
                  text: "Rarely",
                  icon: "🙂",
                },
              ]}
            >
              <Title>Does your partner get angry or irritated easily?</Title>
              <Selector />
            </Slide>

            <Slide
              id="partner-gender"
              type="single"
              variant="picture"
              size="small"
              options={[
                {
                  text: "Male",
                  imgUrl: maleImg,
                },
                {
                  text: "Female",
                  imgUrl: femaleImg,
                },
                {
                  text: "Other",
                  imgUrl: neutralImg,
                },
              ]}
            >
              <Title>What is your partner's gender?</Title>
              <Selector />
            </Slide>

            <Slide id="partner-birth-date" type="date">
              <Title>What's your partner's date of birth?</Title>
              <Callout>
                This highlights the duality of your masculine and feminine
                energies
              </Callout>
              <Selector />
            </Slide>

            <Slide
              id="partner-birth-place"
              type="location"
              placeholder="Partner's birthplace"
              optional
            >
              <Title>Where was your partner born?</Title>
              <Selector />
            </Slide>

            {/* branch end */}
            <Slide id="single-branch-start" type="filler">
              <Title>Congratulations you are single!</Title>
            </Slide>
          </Segment>
        </Quiz>
      </Flex>
    </ChakraProvider>
  );
}
