import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";

const HEADING_TITLE = "Personalized astrology report with powerful predictions";

export function Head() {
  const { brandName } = useSiteMetadata();
  return (
    <SEO
      title={`${HEADING_TITLE} - ${brandName}`}
      description="Begin your AstroPal journey and unlock cosmic secrets for love and connection. Take our quiz to reveal personalized astrological and numerological insights for your relationships."
    />
  );
}

export default function IndexPage() {
  return (
    <Box py={16} px={8} maxW="xl" mx="auto">
      <Heading mb={12} as="h1" size="xl" textAlign="center">
        {HEADING_TITLE}
      </Heading>
      <Text my={8} fontSize="lg" textAlign="center">
        Complete a{" "}
        <Text as="span" color="bra" fontWeight={"bold"}>
          1-minute
        </Text>{" "}
        quiz to get a personalized prediction. The result is not guaranteed and may vary from case
        to case.
      </Text>
      <Text textAlign={"center"} fontWeight={"bold"}>
        What is your relationship status?
      </Text>
      <Flex justifyContent="center" mt={8} gap={4}>
        <Button as={Link} to="/quiz-single" colorScheme="brand">
          Single
        </Button>
        <Button as={Link} to="/quiz-inrelationship" colorScheme="teal">
          In relationship
        </Button>
      </Flex>
    </Box>
  );
}
