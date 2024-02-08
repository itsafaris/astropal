import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { SEO } from "@components/seo";

import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";

import { TopNavigation } from "@components/topnavigation";
import { BookCover } from "@components/book/bookCover";

export function Head() {
  const { brandName } = useSiteMetadata();
  return (
    <SEO
      title={`Get a personalized self-discovery guide based on astrology - ${brandName}`}
      description="Begin your AstroPal journey and unlock cosmic secrets for love and connection. Take our quiz to reveal personalized astrological and numerological insights for your relationships."
    />
  );
}

export default function IndexPage() {
  return (
    <Box minHeight={"100vh"} color="bg.900" bgGradient={"linear(to-b, bg.50, bg.100)"}>
      <Container>
        <TopNavigation />
      </Container>

      <Container>
        <Heading as="h1" textAlign="center" mx="auto" fontSize={"2xl"} px={12} mb={4}>
          Understand your life with a personalised Birth Chart Book.
        </Heading>

        <Box as="ul" pl={4}>
          <Text>✅ Control your career choices</Text>
          <Text>✅ Improve your love life</Text>
          <Text>✅ Choose ideal partners</Text>
          <Text>✅ Tackle life decisions with peace of mind</Text>
          <Text>✅ Understand life hints</Text>
          <Text>✅ Do not miss life opportunities</Text>
        </Box>

        <Flex justifyContent={"center"} my={8}>
          <BookCover height={400} gender="female" author="[your name here]" />
        </Flex>

        <Heading
          as="h1"
          textAlign="center"
          color="orange.400"
          mx="auto"
          fontSize={"xl"}
          px={12}
          my={4}
        >
          30+ pages of unique content based on your Birth Chart
        </Heading>

        <Flex flexDirection={"column"} gap={6}>
          <Text fontSize="lg" textAlign="center" color="bg.700">
            Choose your gender
          </Text>

          <Flex flexDirection={"row"} justifyContent={"center"} mb={12} gap={3}>
            <Link to="/onboarding?gender=male">
              <Button colorScheme="teal">Male</Button>
            </Link>
            <Link to="/onboarding?gender=female">
              <Button colorScheme="orange">Female</Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
