import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaHandHoldingHeart,
  FaUsers,
  FaBalanceScale,
  FaChartLine,
  FaComments,
  FaLightbulb,
  FaCheckCircle,
  FaUserCircle,
  FaClipboardCheck,
  FaUserFriends,
  FaHandshake,
} from "react-icons/fa";
import { Header } from "@components/businessPage/Header";
import { Footer } from "@components/businessPage/Footer";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";
import { createProductURL } from "@utils/urls";

export default function CareersPage() {
  return (
    <Container maxW={"container.xl"}>
      <VStack spacing={[8, 12, 16]}>
        <Header />
        <HeroSection />
        <ValuesSection />
        <BenefitsSection />
        <MessageSection />
        <InterviewProcessSection />
        <Footer />
      </VStack>
    </Container>
  );
}

const HeroSection: React.FC = () => {
  const meta = useSiteMetadata();

  return (
    <Stack align="center" py={20}>
      <Heading as="h1" size="2xl" mb={4} textAlign={"center"}>
        Human-Centric Enterprise.
        <br />
        Top-rated astrology platform.
      </Heading>

      <Text mb={6} textAlign={"center"}>
        {meta.brandName} is a cutting-edge digital subscription service and industry pioneer that
        harnesses advanced personalized astrology to promote enhanced living by delivering insights
        and guidance rooted in contemporary astrological practices. With a strong presence in the
        market for over 4 years, we've been consistently at the forefront of innovation.
      </Text>

      <Link to={"/face-reading"}>
        <Button colorScheme="teal" size="lg">
          Take a Test
        </Button>
      </Link>
    </Stack>
  );
};

const ValuesSection: React.FC = () => {
  const meta = useSiteMetadata();

  return (
    <Box bg="gray.50" py={16}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading as="h2" size="xl" textAlign="center">
            {meta.brandName} Principles
          </Heading>
          <Text textAlign="center">
            Our mission and the ideals we uphold guide our daily operations and decision-making
            processes
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            <ValueCard
              icon={FaHandHoldingHeart}
              title="Empathy"
              description="We approach every interaction with understanding and care"
            />
            <ValueCard
              icon={FaUsers}
              title="Collaboration"
              description="We believe in the power of teamwork and shared success"
            />
            <ValueCard
              icon={FaBalanceScale}
              title="User-Centric"
              description="Our users' needs are at the heart of everything we do"
            />
            <ValueCard
              icon={FaChartLine}
              title="Continuous Improvement"
              description="We strive for personal and professional advancement"
            />
            <ValueCard
              icon={FaComments}
              title="Open Communication"
              description="We foster honest and transparent dialogue"
            />
            <ValueCard
              icon={FaLightbulb}
              title="Creativity"
              description="We push boundaries to develop groundbreaking solutions"
            />
          </Grid>

          <Link to={"/contact-us"}>
            <Button colorScheme="teal" size="lg">
              Join Our Team
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};

const ValueCard: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <Box bg="white" p={6} borderRadius="md" shadow="md">
    <Icon as={icon} w={10} h={10} color="blue.500" mb={4} />
    <Heading as="h3" size="md" mb={2}>
      {title}
    </Heading>
    <Text>{description}</Text>
  </Box>
);

const BenefitsSection: React.FC = () => {
  const meta = useSiteMetadata();

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={8}>
        <Heading as="h2" size="xl" textAlign="center">
          Perks
        </Heading>
        <Text textAlign="center">
          A brief overview of what you can anticipate when working at {meta.brandName}
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          <BenefitItem text="Comprehensive Personal Growth Plan" />
          <BenefitItem text="Adaptable Work Environment" />
          <BenefitItem text="100% Remote Options" />
          <BenefitItem text="Cutting-edge Equipment Provided" />
          <BenefitItem text="Ongoing Skill Enhancement Opportunities" />
          <BenefitItem text={`Complimentary ${meta.brandName} Elite Membership`} />
        </Grid>
      </VStack>
    </Container>
  );
};

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <Flex align="center">
    <Icon as={FaCheckCircle} color="green.500" mr={2} />
    <Text>{text}</Text>
  </Flex>
);

const MessageSection: React.FC = () => {
  const meta = useSiteMetadata();

  return (
    <Box bg="gray.50" py={16}>
      <Container maxW="container.md">
        <VStack spacing={6} bg="white" p={8} borderRadius="lg" shadow="md">
          <Heading as="h2" size="lg" textAlign="center">
            A Word from Our Team
          </Heading>
          <Text fontSize="lg" fontStyle="italic" textAlign="center">
            "Developing and launching innovative products is our passion. We foster an environment
            where high-achievers can thrive and excel at the highest level. Our flexible approach
            allows for a dynamic work experience at {meta.brandName}, and we embody our values daily
            to create a setting that empowers us to lead the industry."
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

const InterviewProcessSection: React.FC = () => (
  <Container maxW="container.xl" py={16}>
    <VStack spacing={8}>
      <Heading as="h2" size="xl" textAlign="center">
        Application Journey
      </Heading>
      <Text textAlign="center">
        We invite exceptional talent from across the globe and have established a streamlined and
        efficient recruitment process.
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
        <ProcessStep
          icon={FaUserCircle}
          title="Initial HR Chat"
          description="30-minute discussion with our HR team"
        />
        <ProcessStep
          icon={FaClipboardCheck}
          title="Aptitude Evaluation"
          description="Showcase your expertise through relevant assessments"
        />
        <ProcessStep
          icon={FaUserFriends}
          title="Team Interview"
          description="Meet key members of the department you'd be joining"
        />
        <ProcessStep
          icon={FaHandshake}
          title="Welcome Aboard"
          description="Receive and accept your offer - let's get started!"
        />
      </Grid>

      <Link to={"/contact-us"}>
        <Button colorScheme="teal" size="lg">
          Submit Application
        </Button>
      </Link>
    </VStack>
  </Container>
);

const ProcessStep: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <VStack>
    <Icon as={icon} w={10} h={10} color="blue.500" />
    <Text fontWeight="bold">{title}</Text>
    <Text textAlign="center">{description}</Text>
  </VStack>
);
