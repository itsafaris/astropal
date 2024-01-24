import { useEffect, useState } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { PageProps } from "gatsby";

import { TopNavigation } from "@components/topnavigation";
import { loadQuizState } from "@utils/localStorage";
import { QuizStateParsed } from "@utils/state";

import { AstrologerComparisonSection } from "@components/summary/AstrologerComparisonSection";
import { MediaCoverageSection } from "@components/summary/MediaCoverageSection";
import { TestimonialsSection } from "@components/summary/TestimonialsSection";
import { PricingSection } from "@components/summary/PricingSection";
import { SpecialOfferBanner } from "@components/summary/SpecialOfferBanner";

export default function SummaryPage({}: PageProps) {
  const [quizState, setQuizState] = useState<QuizStateParsed | undefined>();

  useEffect(() => {
    const q = loadQuizState();
    setQuizState(q);
  }, []);

  return (
    <Box pb={24} backgroundColor="bg.50" color="bg.900" scrollBehavior={"smooth"}>
      <Box backgroundColor="bg.50">
        <Container>
          <TopNavigation />
        </Container>
      </Box>

      {/* <HeroSection2 quizState={quizState} /> */}

      <Container
        border={"1px solid white"}
        height={500}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text textAlign={"center"} fontSize={"3xl"} color="white">
          Highly personalized title with a BIG promise
        </Text>
      </Container>

      <Container
        border={"1px solid white"}
        height={500}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text textAlign={"center"} fontSize={"3xl"} color="white">
          Chart showing self-discovery progress when you follow the guide
        </Text>
      </Container>

      <Container
        border={"1px solid white"}
        height={500}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text textAlign={"center"} fontSize={"3xl"} color="white">
          No more issues if you follow the guide
        </Text>
      </Container>

      <Container
        border={"1px solid white"}
        height={500}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text textAlign={"center"} fontSize={"3xl"} color="white">
          App features explained. Next to each feature show a perfect example of an insight, chat
          and etc
        </Text>
      </Container>

      <Container>
        {/* <AreasOfGuidanceSection /> */}
        {/* <ExampleQuestionsSection /> */}
        {/* <SimilarUsersLikeYouSection /> */}
        <TestimonialsSection />
        <MediaCoverageSection />
      </Container>

      <SpecialOfferBanner />

      <Container>
        <PricingSection />
        <AstrologerComparisonSection />
      </Container>

      <Container
        border={"1px solid white"}
        height={500}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text textAlign={"center"} fontSize={"3xl"} color="white">
          Final CTA
        </Text>
      </Container>
    </Box>
  );
}
