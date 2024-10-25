import React from "react";
import {
  Button,
  Image,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Flex,
  Box,
  Container,
  Stack,
  useBreakpoint,
} from "@chakra-ui/react";
import { Header } from "@components/businessPage/Header";
import { Footer } from "@components/businessPage/Footer";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { StaticImage } from "gatsby-plugin-image";
import { OrbRotating } from "@components/OrbRotating";
import { Link } from "gatsby";
import { AppShowcase } from "@components/businessPage/AppShowcase";

export default function HomePage() {
  return (
    <Container maxW={"container.xl"}>
      <VStack spacing={[8, 12, 16]}>
        <Header />
        <Hero />
        <Features />
        <TrustedCompanies />
        <Ratings />
        <AppShowcase />
        <Footer />
      </VStack>
    </Container>
  );
}

function Hero() {
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
        return 400;
      }
    }
  }

  return (
    <Container maxW={"container.xl"} mb={20} mt={10}>
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

        <Stack spacing={7} maxW={"700px"} position={"relative"} zIndex={1}>
          <Text
            fontSize={["3xl", "4xl", "5xl"]}
            textAlign={"center"}
            lineHeight={1.3}
            fontWeight={"bold"}
            color={"teal.900"}
          >
            Explore your path with personalized astrological insights
          </Text>

          <Text fontSize={["lg", "lg", "xl"]} textAlign={"center"} lineHeight={1.3}>
            The leading application simplifying celestial wisdom for enhanced self-understanding
          </Text>

          <Flex justifyContent="center">
            <Link to="/">
              <Button colorScheme="teal" size="lg">
                Access Your Account
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Box bg="gray.50" p={6} borderRadius="md">
      {icon}
      <Heading as="h3" size="md" my={2}>
        {title}
      </Heading>
      <Text>{description}</Text>
    </Box>
  );
}

function Features() {
  const meta = useSiteMetadata();

  return (
    <VStack spacing={8} width="100%">
      <Flex
        direction={["column", "row"]}
        bg="gray.50"
        p={6}
        borderRadius="md"
        width="100%"
        alignItems={"center"}
      >
        <Box flex={1} mr={[0, 6]} mb={[6, 0]} borderRadius={"lg"} overflow={"hidden"}>
          <StaticImage src="../images/lp-woman-sky.jpg" alt="Celestial Guidance" width={600} />
        </Box>

        <Box flex={1}>
          <Heading as="h2" size="xl" mb={4}>
            Tailored astrological experiences
          </Heading>

          <Text>
            {meta.brandName} merges NASA data with expert astrological knowledge to craft your
            unique celestial profile. Our approach combines one-on-one guidance from seasoned
            astrologers with a user-friendly interface, delivering personalized celestial insights
            in an engaging manner.
          </Text>
        </Box>
      </Flex>

      <SimpleGrid columns={[1, 2]} spacing={6} width="100%">
        <FeatureCard
          icon="🗨️"
          title="Personal Consultations"
          description="Connect with an expert astrologer for tailored advice and continuous support"
        />
        <FeatureCard
          icon="🔮"
          title="Celestial Forecasts"
          description="Receive precise predictions based on real-time planetary alignments and movements"
        />
        <FeatureCard
          icon="❤️"
          title="Relationship Insights"
          description="Generate in-depth compatibility analyses for various life aspects including romance, friendships, and career"
        />
        <FeatureCard
          icon="📊"
          title="Natal Chart Analysis"
          description="Uncover the secrets of your personality through comprehensive chart interpretations"
        />
      </SimpleGrid>
    </VStack>
  );
}

function TrustedCompanies() {
  const meta = useSiteMetadata();

  return (
    <VStack spacing={6} width="100%">
      <Heading as="h2" size="xl">
        Endorsed by global industry leaders
      </Heading>
      <Box bg="gray.50" p={6} borderRadius="md" width="100%">
        <Text fontSize="lg" fontStyle="italic" mb={4}>
          "The digital age has ushered in a renaissance for astrological services"
        </Text>
        <Text fontWeight="bold">Forbes</Text>
        <Text>{meta.brandName} swiftly established itself as an industry frontrunner by 2020.</Text>
      </Box>
      <SimpleGrid columns={[3, 4, 5]} spacing={4} width="100%">
        {/* Add company logos here */}
        <Image src="/path-to-forbes-logo.png" alt="Forbes" />
        <Image src="/path-to-bustle-logo.png" alt="Bustle" />
        <Image src="/path-to-mirror-logo.png" alt="Mirror" />
        {/* Add more company logos */}
      </SimpleGrid>
    </VStack>
  );
}

function Ratings() {
  const meta = useSiteMetadata();

  return (
    <VStack spacing={6} width="100%">
      <Heading as="h2" size="xl" textAlign="center">
        Be part of the community finding greater well-being through {meta.brandName}
      </Heading>
      <Flex direction={["column", "row"]} justifyContent="center" width="100%">
        <Box bg="blue.50" p={6} borderRadius="md" textAlign="center" m={2}>
          <Text fontSize="4xl" fontWeight="bold">
            4.4
          </Text>
          <Text>Average Rating</Text>
        </Box>
        <Box bg="blue.50" p={6} borderRadius="md" textAlign="center" m={2}>
          <Text fontSize="4xl" fontWeight="bold">
            200K+
          </Text>
          <Text>User Reviews</Text>
        </Box>
      </Flex>
    </VStack>
  );
}
