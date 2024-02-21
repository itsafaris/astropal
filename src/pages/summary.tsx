import { useEffect, useState } from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { PageProps } from "gatsby";

import { TopNavigation } from "@components/topnavigation";
import { loadQuizState } from "@utils/localStorage";
import { QuizStateParsed } from "@utils/state";

import { AreasOfGuidanceSection } from "@components/summary/AreasOfGuidanceSection";
import { AstrologerComparisonSection } from "@components/summary/AstrologerComparisonSection";
import { ExampleQuestionsSection } from "@components/summary/ExampleQuestionsSection";
import { MediaCoverageSection } from "@components/summary/MediaCoverageSection";
import { HeroSection } from "@components/summary/HeroSection2";
import { PricingSection } from "@components/summary/PricingSection";
import { ProductSection } from "@components/summary/ProductSection";
import { ScrollDownSection } from "@components/summary/ScrollDownSection";
import { UserTestimonialSection } from "@components/summary/UserTestimonialSection";
import { PersonalizationSection } from "@components/summary/PersonalizationSection";
import { CTALinkToPricing } from "@components/summary/components";
import { SpecialOfferBanner } from "@components/summary/SpecialOfferBanner";
import { MethodSection } from "@components/summary/MethodSection";

export default function SummaryPage({}: PageProps) {
  const [quizState, setQuizState] = useState<QuizStateParsed | undefined>();

  useEffect(() => {
    const q = loadQuizState();
    setQuizState(q);
  }, []);

  if (!quizState) {
    return null;
  }

  return (
    <Box pb={24} color="bg.900" bg="bg.100">
      {/* <SpecialOfferBanner /> */}
      <Box>
        <Container>
          <HeroSection state={quizState} />
          <ScrollDownSection />
        </Container>
      </Box>

      <Box backgroundColor="white" py={10}>
        <Container>
          <MethodSection />
        </Container>
      </Box>

      <Box>
        <Container>
          <ProductSection />
        </Container>
      </Box>

      <Box backgroundColor="white" py={10}>
        <Container>
          <UserTestimonialSection />

          <Flex justifyContent={"center"} mt={12}>
            <CTALinkToPricing id="testimonial-section-cta" />
          </Flex>
        </Container>
      </Box>

      <Box backgroundColor={"whiteAlpha.200"} py={10}>
        <Container>
          <AreasOfGuidanceSection />
        </Container>
      </Box>

      <Box py={10}>
        <Container px={0}>
          <ExampleQuestionsSection />

          <Flex justifyContent={"center"} mt={12}>
            <CTALinkToPricing id="example-questions-section-cta" />
          </Flex>
        </Container>
      </Box>

      <Box backgroundColor="whiteAlpha.200" py={10}>
        <Container>
          <AstrologerComparisonSection />
        </Container>
      </Box>

      <Box py={10}>
        <Container>
          <MediaCoverageSection />
        </Container>
      </Box>
    </Box>
  );
}
