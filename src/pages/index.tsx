import { Box, Button, Container, Flex, Grid, Stack, Text, useBreakpoint } from "@chakra-ui/react";
import { Footer } from "@components/Footer";
import { OrbRotating } from "@components/OrbRotating";
import { SEO } from "@components/seo";
import { TopNavigation } from "@components/topnavigation";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";

export function Head() {
  const { brandName } = useSiteMetadata();
  return (
    <SEO
      title={`Experience the Most Accurate Personalized Astrology - ${brandName}`}
      description="Begin your Intuvist journey and unlock cosmic secrets for love and connection. Take our quiz to reveal personalized astrological and numerological insights for your relationships."
    />
  );
}

export default function IndexPage() {
  const breakpoint = useBreakpoint();

  function getOrbSize(breakpoint: string): number {
    switch (breakpoint) {
      case "base": {
        return 230;
      }
      case "sm": {
        return 330;
      }
      case "md": {
        return 400;
      }
      case "lg":
      case "xl":
      default: {
        return 500;
      }
    }
  }

  return (
    <Grid
      gridTemplateRows={"auto 1fr auto"}
      bgGradient={"linear(to-t, #191135, black)"}
      minHeight={"100vh"}
    >
      <Box borderBottom={"1px solid"} borderColor={"whiteAlpha.300"}>
        <Container maxW={"container.xl"}>
          <TopNavigation theme="light" />
        </Container>
      </Box>

      <Container maxW={"container.xl"}>
        <Stack height={"100%"} alignItems={"center"} justifyContent="center" position={"relative"}>
          <OrbRotating
            mx={"auto"}
            size={getOrbSize(breakpoint)}
            duration={2000}
            opacity={0.7}
            zIndex={0}
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            transform="translate(-50%, -50%)"
          />

          <Stack spacing={7} maxW={"700px"}>
            <Text
              color="white"
              fontSize={["3xl", "4xl", "5xl"]}
              textAlign={"center"}
              lineHeight={1.3}
              fontWeight={"bold"}
            >
              Experience the World's Most Accurate Personalized Astrology
            </Text>

            <Text color="white" fontSize={["md", "lg", "xl"]} textAlign={"center"} lineHeight={1.3}>
              Begin your Intuvist journey and unlock cosmic insights into your personality,
              relationships, career, and future.
            </Text>

            <Flex justifyContent="center">
              <Link to="/face-reading">
                <Button colorScheme="purple" size={"lg"}>
                  Try now
                </Button>
              </Link>
            </Flex>
          </Stack>
        </Stack>
      </Container>

      <Box borderTop={"1px solid"} borderColor={"whiteAlpha.300"}>
        <Container maxW={"container.xl"}>
          <Footer />
        </Container>
      </Box>
    </Grid>
  );
}
