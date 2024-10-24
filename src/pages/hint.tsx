import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  SimpleGrid,
  HStack,
  VStack,
  Link,
  Icon,
} from "@chakra-ui/react";

// Navbar Component
const Navbar = () => (
  <Box as="nav" py={4} borderBottom="1px solid" borderColor="gray.100">
    <Container maxW="container.xl">
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          hint
        </Text>
        <HStack spacing={6}>
          <Link>Home</Link>
          <Link>Pricing</Link>
          <Link>Careers</Link>
          <Link>About Hint</Link>
          <Link>Help and Support</Link>
        </HStack>
      </Flex>
    </Container>
  </Box>
);

// Hero Section
const Hero = () => (
  <Container maxW="container.xl" textAlign="center" py={16}>
    <Heading as="h1" size="2xl" mb={4}>
      Navigate through life with the help
      <br />
      of modern astrology
    </Heading>
    <Text color="gray.600" mb={8}>
      The #1 app educating people by simplifying astrology for a<br />
      greater awareness
    </Text>
    <Button colorScheme="blue" size="lg" px={8} rounded="full">
      Log In
    </Button>
  </Container>
);

// Feature Section with Illustration
const FeatureWithImage = () => (
  <Container maxW="container.xl" py={16}>
    <Flex gap={12} align="center">
      <Box flex={1}>
        <Image src="/path-to-your-illustration.png" alt="Astrology illustration" />
      </Box>
      <Box flex={1} bg="gray.50" p={8} rounded="xl">
        <Heading size="lg" mb={4}>
          Hyper-personalized astrology
        </Heading>
        <Text color="gray.600">
          Hint combines NASA data to produce the blueprint of your astrological identity, with
          1-on-1 guidance and knowledge from professional astrologers, to provide personalized
          insights, with a fun and friendly approach.
        </Text>
      </Box>
    </Flex>
  </Container>
);

// Features Grid
const FeaturesGrid = () => (
  <Container maxW="container.xl" py={16}>
    <SimpleGrid columns={2} spacing={8}>
      {[
        {
          icon: "🎯",
          title: "1 - 1 Guidance",
          description:
            "Match with your professional astrologer for personalized recommendations and unlimited 1-on-1 guidance",
        },
        {
          icon: "🔮",
          title: "Horoscope",
          description:
            "Access your unique insights to better prepare for the future based on the real-time data of each planetary position and movement",
        },
        {
          icon: "❤️",
          title: "Compatibility",
          description:
            "Create your own compatibility reports on intimacy, friendship, relationship, family and work",
        },
        {
          icon: "👤",
          title: "Your chart",
          description: "Everything you need to know to decode your chart and your personality",
        },
      ].map((feature, index) => (
        <Box key={index} p={6}>
          <Text fontSize="2xl" mb={4}>
            {feature.icon}
          </Text>
          <Heading size="md" mb={3}>
            {feature.title}
          </Heading>
          <Text color="gray.600">{feature.description}</Text>
        </Box>
      ))}
    </SimpleGrid>
  </Container>
);

// Social Proof Section
const SocialProof = () => (
  <Container maxW="container.xl" py={16}>
    <Heading textAlign="center" mb={12}>
      Trusted by World's leading companies
    </Heading>
    <SimpleGrid columns={[2, 3, 5]} spacing={8} alignItems="center">
      {/* Add your company logos here */}
      <Image src="/path-to-forbes-logo.png" alt="Forbes" />
      {/* Add other company logos */}
    </SimpleGrid>
  </Container>
);

// Ratings Section
const Ratings = () => (
  <Box bg="gray.50" py={16}>
    <Container maxW="container.xl">
      <Heading textAlign="center" mb={12}>
        Join the thousands using Hint to lead a happier
        <br />
        and healthier lifestyle
      </Heading>
      <Flex justify="center" gap={8}>
        <Box bg="white" p={8} rounded="xl" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold">
            4.4
          </Text>
          <Text>Stars</Text>
        </Box>
        <Box bg="white" p={8} rounded="xl" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold">
            &gt;200K
          </Text>
          <Text>Ratings</Text>
        </Box>
      </Flex>
    </Container>
  </Box>
);

// App Preview Section
const AppPreview = () => (
  <Container maxW="container.xl" py={16} textAlign="center">
    <Heading mb={8}>Get Hint now!</Heading>
    <Image src="/path-to-app-preview.png" alt="Hint App Preview" mx="auto" mb={8} />
    <Text mb={8}>Take a Hint and access the app today!</Text>
    <Button colorScheme="blue" size="lg" px={8} rounded="full">
      Log In
    </Button>
  </Container>
);

// Footer
const Footer = () => (
  <Box bg="gray.50" py={12}>
    <Container maxW="container.xl">
      <VStack spacing={8} align="start">
        <Image src="/path-to-hint-logo.png" alt="Hint Logo" h="24px" />
        <Text color="gray.600" fontSize="sm">
          © 2024. All rights reserved.
          <br />
          Level G, Office 1/503B, Quantum House, 75,
          <br />
          Abate Rigord Street, Ta' Xbiex XBX 1120, Malta
        </Text>
        <HStack spacing={6}>
          <Link>Help and Support</Link>
          <Link>E.U.L.A</Link>
          <Link>Privacy Policy</Link>
        </HStack>
      </VStack>
    </Container>
  </Box>
);

// Main App Component
const App = () => (
  <Box>
    <Navbar />
    <Hero />
    <FeatureWithImage />
    <FeaturesGrid />
    <SocialProof />
    <Ratings />
    <AppPreview />
    <Footer />
  </Box>
);

export default App;
