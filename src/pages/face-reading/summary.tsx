import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Avatar,
  AvatarGroup,
  Heading,
  Flex,
  Icon,
  Container,
  Step,
  Stepper,
  StepIndicator,
  StepStatus,
  StepDescription,
  StepSeparator,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Span } from "@components/quizpage/components";
import { StaticImage } from "gatsby-plugin-image";
import { CgInfinity } from "react-icons/cg";
import { PiChatCircleDotsFill } from "react-icons/pi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FaCheck, FaCircle } from "react-icons/fa";

export default function SummaryPage() {
  return (
    <Container py={4}>
      <HeroSection />
      <HowItWorks />
    </Container>
  );
}

function HeroSection() {
  return (
    <Box>
      <HStack justifyContent="space-between" mb={4}>
        <HStack>
          <Image src="path_to_astrology_icon.png" boxSize="40px" />
          <Text fontSize="sm" fontWeight="bold" color="gray.600">
            The #1 Astrology app trusted <br /> by over <Span color="blue.500">25 million </Span>{" "}
            people.
          </Text>
        </HStack>
        <HStack bg="yellow.100" borderRadius="full" px={2} py={1}>
          <StarIcon color="yellow.500" />
          <Text fontWeight="bold">5.0</Text>
        </HStack>
      </HStack>

      <VStack align="start" spacing={2} mb={4}>
        <Heading fontSize="3xl" fontWeight="bold">
          Your Face Reading
          <br />
          <Span fontSize="3xl" fontWeight="bold" color="blue.500">
            Is Ready!
          </Span>
        </Heading>
      </VStack>

      <HStack mb={4}>
        <VStack align="start" flex={1}>
          <Text fontSize="xl" fontWeight="semibold">
            "I've just received your face scan results. Let's discuss!"
          </Text>
        </VStack>
        <Box position={"relative"}>
          <Box
            border="4px solid"
            borderColor={"blue.300"}
            borderRadius={"full"}
            overflow={"hidden"}
          >
            <StaticImage
              alt="face reader portrait"
              src="../../images/face_reader_female.png"
              style={{ width: 100, borderRadius: "100%" }}
            />
          </Box>
          <Icon
            as={PiChatCircleDotsFill}
            position={"absolute"}
            top={4}
            left={-3}
            color="red.400"
            fontSize={"4xl"}
            transform={"scaleX(-1)"}
          />
        </Box>
      </HStack>

      <Text mb={4} color="gray.500" fontSize={"sm"}>
        <Span color="blue.600" fontWeight={"bold"}>
          Akho
        </Span>{" "}
        6 years in palmistry readings and spiritual guidance.
      </Text>

      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        my={8}
        borderTop={"1px solid"}
        borderBottom={"1px solid"}
        borderColor={"gray.300"}
        py={2}
      >
        <Text fontWeight="bold" mb={2}>
          Choose from 80+ face readers and astrologers.
        </Text>

        <AvatarGroup size="md" max={4}>
          <Avatar overflow={"hidden"}>
            <StaticImage alt="reader's avatar" src="../../images/reader1.png" />
          </Avatar>

          <Avatar overflow={"hidden"}>
            <StaticImage alt="reader's avatar" src="../../images/reader5.png" />
          </Avatar>

          <Avatar overflow={"hidden"}>
            <StaticImage alt="reader's avatar" src="../../images/reader3.png" />
          </Avatar>

          <Avatar overflow={"hidden"}>
            <StaticImage alt="reader's avatar" src="../../images/reader4.png" />
          </Avatar>
        </AvatarGroup>
      </Flex>

      <HStack mb={4} justifyContent={"center"}>
        <Icon as={CgInfinity} color="orange.500" fontSize={"3xl"} />
        <Text fontWeight="semibold">
          Unlimited chats with a{" "}
          <Text as="span" color="blue.500">
            palm reader
          </Text>
        </Text>
      </HStack>

      <Button colorScheme="blue" width="100%" size="lg" mb={4}>
        Get My Prediction
      </Button>

      <HStack justifyContent="center">
        <Icon as={MdOutlineGroupAdd} color="gray.500" fontSize={"xl"} />
        <Text fontWeight={"semibold"} color="gray.500">
          776 people joined today
        </Text>
      </HStack>
    </Box>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Send us your palm scan",
      description: "We analyze your palm lines to get hints about your future",
    },
    {
      title: "Your palm reading is generated",
      description:
        "One of our professional palm readers puts together a report filled with hints about your future",
    },
    {
      title: "Start your trial to receive your prediction",
      description:
        "Once you're a Hint member, we'll be able to send over your prediction report so you can begin living a better life.",
    },
    {
      title: "Talk with a palm reading specialist anytime:",
      description:
        "Get the ongoing support you need by discussing your readings, personal horoscopes, and compatibilities with our expert palm reader and astrologist support team.",
    },
  ];

  return (
    <Box p={4} maxWidth="400px" margin="auto">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        How does Hint work?
      </Heading>
      <Stepper index={2} orientation="vertical" gap={0}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<Icon as={FaCheck} />}
                active={<Icon as={FaCircle} color="blue.300" />}
              />
            </StepIndicator>

            <Box mb={6}>
              <Text fontWeight={"bold"} fontSize={"lg"} color="blue.700">
                {step.title}
              </Text>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
