import { useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { PageProps } from "gatsby";

import { TopNavigation } from "@components/topnavigation";
import { loadQuizState } from "@utils/localStorage";
import { QuizStateParsed } from "@utils/state";

import { AreasOfGuidanceSection } from "@components/summary/AreasOfGuidanceSection";
import { AstrologerComparisonSection } from "@components/summary/AstrologerComparisonSection";
import { ExampleQuestionsSection } from "@components/summary/ExampleQuestionsSection";
import { MediaCoverageSection } from "@components/summary/MediaCoverageSection";
import { SimilarUsersLikeYouSection } from "@components/summary/SimilarUsersLikeYouSection";
import { TestimonialsSection } from "@components/summary/TestimonialsSection";
import { HeroSection } from "@components/summary/HeroSection";
import { PricingSection } from "@components/summary/PricingSection";
import { SpecialOfferBanner } from "@components/summary/SpecialOfferBanner";

export default function SummaryPage({}: PageProps) {
  const [quizState, setQuizState] = useState<QuizStateParsed | undefined>();

  useEffect(() => {
    const q = loadQuizState();
    setQuizState(q);
  }, []);

  return (
    <Box
      py={4}
      pb={24}
      bgGradient="linear(to-b, bg.50, bg.100)"
      color="bg.900"
      scrollBehavior={"smooth"}
    >
      <Container>
        <TopNavigation />
      </Container>

      <HeroSection quizState={quizState} />

      <Container>
        <AreasOfGuidanceSection />
        <ExampleQuestionsSection />
        <SimilarUsersLikeYouSection />
        <TestimonialsSection />
        <MediaCoverageSection />
      </Container>

      <SpecialOfferBanner />

      <Container>
        <PricingSection />
        <AstrologerComparisonSection />
      </Container>
    </Box>
  );
}
