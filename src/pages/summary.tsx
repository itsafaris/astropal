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
    <Box pb={24} color="bg.900" backgroundColor={"bg.50"}>
      <SpecialOfferBanner />
      <Box backgroundColor={"#142326"}>
        <Container>
          <TopNavigation />
        </Container>

        <HeroSection state={quizState} />
        <ScrollDownSection />
      </Box>

      <Box>
        <Container>
          <PersonalizationSection state={quizState} />
        </Container>
      </Box>

      <Box backgroundColor={"whiteAlpha.200"} py={10}>
        <Container>
          <ProductSection state={quizState} />

          <Flex justifyContent={"center"} mt={12}>
            <CTALinkToPricing id="product-section-cta" />
          </Flex>
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

      <Box backgroundColor="whiteAlpha.200" py={10} id="pricing-plans">
        <Container>
          <SpecialOfferBanner />
          <PricingSection />
        </Container>
      </Box>
    </Box>
  );
}
