import { Box, Container, Text, Stack, Flex, useTheme } from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

import { QuizStateParsed } from "@utils/state";

import { CTALinkToPricing } from "./components";
import { StaticImage } from "gatsby-plugin-image";
import { SpecialOfferBanner } from "./SpecialOfferBanner";

export function HeroSection({ state }: { state: QuizStateParsed }) {
  const theme = useTheme();

  return (
    <Box id="hero-section" as="section" bgGradient={"linear(to-t, bg.50, #142326)"}>
      <Container>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Stack position={"relative"} spacing={6}>
            <Text
              fontWeight="semibold"
              textAlign={"center"}
              width={"full"}
              fontSize={"xl"}
              color="white"
            >
              Congratulations! <br /> Your Free Insight is Set to Come{" "}
              <Text as="span" color="brand.500">
                {" "}
                Tomorrow 07:00
              </Text>
            </Text>

            <StaticImage
              alt=""
              src="../../images/art-11.png"
              style={{ width: 150, marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}
            />

            <Text
              fontWeight="bold"
              textAlign={"center"}
              width={"full"}
              fontSize={"4xl"}
              color="white"
              lineHeight={1.4}
            >
              Get Your Full <br /> Personolized Insights
            </Text>

            <Stack
              spacing={7}
              maxW={400}
              width={"100%"}
              mx="auto"
              bgGradient={"linear(to-t, transparent 40%, brand.500 70%, yellow.400 90%)"}
              borderRadius={"xl"}
              p={3}
              pb={7}
            >
              <Flex flexDirection={"column"} alignItems={"center"}>
                <SpecialOfferBanner background={undefined} />

                <Flex flexDirection={"column"} alignItems={"center"} backgroundColor={"bg.50"}>
                  <Flex flexDirection={"column"} alignItems={"center"} p={3} pt={5} mb={6}>
                    <StaticImage
                      alt=""
                      src="../../images/significant_clarity.png"
                      style={{ width: "100%", opacity: 1 }}
                    />
                  </Flex>

                  <Features />
                </Flex>
              </Flex>

              <CTALinkToPricing
                backgroundColor="green.700"
                _hover={{
                  backgroundColor: "green.800",
                }}
                boxShadow={`inset 0 0 0 3px ${theme.colors.green["500"]}`}
                color="white"
              />
            </Stack>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}

function Features() {
  return (
    <Stack
      alignItems={"start"}
      color={"green.300"}
      mx="auto"
      fontSize={"md"}
      fontWeight={"semibold"}
    >
      <Text>
        <CheckIcon color={"green.300"} height={"25px"} width={"25px"} mr={3} />
        Get Personalized Insights Daily
      </Text>
      <Text>
        <CheckIcon color={"green.300"} height={"25px"} width={"25px"} mr={3} />
        Ask Any Questions 24/7
      </Text>
      <Text>
        <CheckIcon color={"green.300"} height={"25px"} width={"25px"} mr={3} />
        Get Asnwers Instanly
      </Text>
    </Stack>
  );
}
