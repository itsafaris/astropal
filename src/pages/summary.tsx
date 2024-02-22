import { useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { PageProps } from "gatsby";

import { loadQuizState } from "@utils/localStorage";
import { QuizStateParsed } from "@utils/state";

import { AreasOfGuidanceSection } from "@components/summary/AreasOfGuidanceSection";
import { AstrologerComparisonSection } from "@components/summary/AstrologerComparisonSection";
import { MediaCoverageSection } from "@components/summary/MediaCoverageSection";
import { HeroSection } from "@components/summary/HeroSection2";
import { PricingSection } from "@components/summary/PricingSection";
import { ProductSection } from "@components/summary/ProductSection";
import { UserTestimonialSection } from "@components/summary/UserTestimonialSection";
import { CTALinkToPricing, Headline, HeadlineHighlight } from "@components/summary/components";
import { SpecialOfferBanner } from "@components/summary/SpecialOfferBanner";
import { MethodSection } from "@components/summary/MethodSection";
import { toTitleCase } from "@utils/string";

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
          <PricingSection my={8} sectionID="hero-pricing-cta" />
          {/* <ScrollDownSection /> */}
        </Container>
      </Box>

      <Box backgroundColor="white" py={10}>
        <Container>
          <MethodSection />

          <CTALinkToPricing mt={5} id="method-section-cta">
            Start Your Program Now
          </CTALinkToPricing>
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
        </Container>
      </Box>

      {/* <Box py={10}>
        <Container px={0}>
          <ExampleQuestionsSection />

          <Flex justifyContent={"center"} mt={12}>
            <CTALinkToPricing id="example-questions-section-cta">
              Start Your Program Now
            </CTALinkToPricing>
          </Flex>
        </Container>
      </Box> */}

      <Box py={10}>
        <Container>
          <MediaCoverageSection />
        </Container>
      </Box>

      <Box py={10}>
        <Container id="pricing-plans" as="section">
          <Headline mb={8}>
            Unlock the Power of{" "}
            <HeadlineHighlight> {toTitleCase(quizState.yourZodiac.name)}</HeadlineHighlight> Within
            Yourself. Start <HeadlineHighlight>Your Program</HeadlineHighlight> Now
          </Headline>

          <PricingSection sectionID="bottom-pricing-cta" />
        </Container>
      </Box>

      <Box py={10} backgroundColor={"white"}>
        <Container>
          <AreasOfGuidanceSection />
        </Container>
      </Box>

      <Box py={10}>
        <Container>
          <AstrologerComparisonSection />

          <CTALinkToPricing mt={10} id="astro-comparison-section-cta">
            Start Your Program Now
          </CTALinkToPricing>
        </Container>
      </Box>
    </Box>
  );
}
