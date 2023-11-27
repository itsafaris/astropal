import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "gatsby";

export default function IndexPage() {
  return (
    <Box py={16} px={8} maxW="xl" mx="auto">
      <Heading mb={12} as="h1" size="xl" textAlign="center">
        Personalized astrology report with powerful predictions
      </Heading>
      <Text my={8} fontSize="lg" textAlign="center">
        Complete a 1-minute quiz to get a personalized prediction. The result is
        not guaranteed and may vary from case to case.
      </Text>
      <Text textAlign={"center"}>Select your gender to start</Text>
      <Flex justifyContent="center" mt={8} gap={4}>
        <Button as={Link} to="/quiz" colorScheme="teal">
          Male
        </Button>
        <Button as={Link} to="/quiz" colorScheme="teal">
          Female
        </Button>
        <Button as={Link} to="/quiz" colorScheme="teal">
          Other
        </Button>
      </Flex>
    </Box>
  );
}
