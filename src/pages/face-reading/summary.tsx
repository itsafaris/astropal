import {
  Box,
  VStack,
  HStack,
  Text,
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
import { PiChatCircleDotsFill, PiChatsCircleDuotone } from "react-icons/pi";
import { MdOutlineGroupAdd, MdVerified } from "react-icons/md";
import { FaCheck, FaCircle, FaRegLightbulb } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { TbFaceId } from "react-icons/tb";
import { GiOppositeHearts } from "react-icons/gi";
import { LuCalendarCheck } from "react-icons/lu";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link, navigate } from "gatsby";
import { Timer } from "@components/timer";
import { ComponentProps, useEffect, useState } from "react";
import React from "react";
import { trackPixelEvent } from "@utils/tracking";

export default function SummaryPage() {
  React.useEffect(() => {
    trackPixelEvent("AddToCart");
  }, []);

  return (
    <Container py={4} pb={20}>
      <HeroSection />
      <HowItWorks />
      <WhatsIncluded />
      <MoneyGuarantee />
      <UserReviews />
      <Footer />
      <CTABanner />
    </Container>
  );
}

function HeroSection() {
  return (
    <Box>
      <Flex width={"full"} justifyContent={"center"} pb={4}>
        <StaticImage
          src="../../images/intuvist-logo-black-h.png"
          alt="Intuvist logo"
          style={{ width: 100 }}
          width={100}
        />
      </Flex>
      <HStack justifyContent="space-between" mb={4}>
        <HStack>
          <Text fontSize="sm" fontWeight="bold" color="gray.600">
            The #1 Face-reading and astrology app trusted <br /> by over{" "}
            <Span color="blue.500">25 million </Span> people.
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
        6 years in face readings and spiritual guidance.
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
            face reader
          </Text>
        </Text>
      </HStack>

      <CTAButton width="100%" size="lg" mb={4}>
        Get My Prediction
      </CTAButton>

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
  const meta = useSiteMetadata();

  const steps = [
    {
      title: "Get your face scanned",
      description: "We analyze your face landmarks to get hints about your future",
    },
    {
      title: "Your face reading is generated",
      description:
        "One of our professional face readers puts together a report filled with hints about your future",
    },
    {
      title: "Start your trial to receive your prediction",
      description: `Once you're a ${meta.brandName} member, we'll be able to send over your prediction report so you can begin living a better life.`,
    },
    {
      title: "Talk with a face reading specialist anytime:",
      description:
        "Get the ongoing support you need by discussing your readings, personal horoscopes, and compatibilities with our face reader and astrologist support team.",
    },
  ];

  return (
    <Box p={4} my={8}>
      <Heading as="h2" fontSize="2xl" mb={6} textAlign="center">
        How does {meta.brandName} work?
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

function WhatsIncluded() {
  return (
    <Box my={8}>
      <Heading fontSize={"2xl"} textAlign={"center"} mb={4}>
        What's included?
      </Heading>
      <VStack
        spacing={4}
        alignItems={"start"}
        p={4}
        bg="blue.50"
        border="1px solid"
        borderColor={"blue.200"}
        borderRadius={"lg"}
      >
        <Flex alignItems={"center"} gap={2}>
          <Icon as={TbFaceId} fontSize={"2xl"} />
          <Text>
            <Span fontWeight={"bold"}>Unlimited</Span> face readings
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={2}>
          <Icon as={PiChatsCircleDuotone} fontSize={"2xl"} />
          <Text>
            <Span fontWeight={"bold"}>1:1 live chats</Span> with professional astrologers
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={2}>
          <Icon as={GiOppositeHearts} fontSize={"2xl"} />
          <Text>
            <Span fontWeight={"bold"}>Daily compatibility</Span> readings
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={2}>
          <Icon as={FaRegLightbulb} fontSize={"2xl"} />
          Cosmic <Span fontWeight={"bold"}>relationship tips</Span>
        </Flex>
        <Flex alignItems={"center"} gap={2}>
          <Icon as={LuCalendarCheck} fontSize={"2xl"} />
          <Span fontWeight={"bold"}>Daily horoscopes</Span>
        </Flex>
      </VStack>
    </Box>
  );
}

function MoneyGuarantee() {
  return (
    <Box bg="green.50" p={3} textAlign={"center"}>
      <Flex alignItems={"center"} color="green.600" mb={2} justifyContent={"center"} gap={2}>
        <Icon fontSize={"2xl"} as={MdVerified} />
        <Text fontSize={"lg"} fontWeight={"bold"}>
          100% Money-back Guarantee
        </Text>
      </Flex>
      <Text>
        If you don't notice any progress after using the app for at least a week, we are ready to
        make a complete refund within 14 days.
      </Text>
    </Box>
  );
}

function UserReviews() {
  const meta = useSiteMetadata();

  const reviews = [
    {
      title: "It's changed my life!",
      text: `I'm thankful for this app and Akho! She's an excellent face reader and astrologer—clear, thorough, and reassuring. I eagerly look forward to more sessions with her!`,
      name: "Rebecca Bauman",
      image: <StaticImage alt="user image" src="../../images/user11.png" width={100} />,
    },
    {
      title: "After years of seeking, I've finally found a true love.",
      text: `I was hesitant about whether it was really worth trying, but now I have no regrets and I'm enjoying my new relationships!`,
      name: "Mika Ryan",
      image: <StaticImage alt="user image" src="../../images/user12.png" width={100} />,
    },
    {
      title: "I've found a job I really enjoy.",
      text: `Thanks to Vladana, I've finally discovered a clue about what my life's purpose really is and what kind of job resonates with me better!`,
      name: "Amanda Holmes",
      image: <StaticImage alt="user image" src="../../images/user13.png" width={100} />,
    },
  ];
  return (
    <Box my={10}>
      <Heading fontSize={"2xl"} textAlign={"center"} mb={8}>
        Why does everyone love <Span color="blue.600">{meta.brandName}</Span>?
      </Heading>
      <VStack spacing={8}>
        {reviews.map((review, idx) => {
          return (
            <Flex key={idx} bg="blue.50" p={4} borderRadius={"xl"} gap={0} ml={6}>
              <Flex
                alignItems={"center"}
                width={"80px"}
                height={"80px"}
                flexShrink={0}
                borderRadius={"lg"}
                overflow={"hidden"}
                position={"relative"}
                left={-8}
                top={-6}
              >
                {review.image}
              </Flex>
              <Box flex={1} ml={-4}>
                <Text fontWeight={"bold"} mb={2}>
                  {review.title}
                </Text>
                <Text fontSize={"sm"}>{review.text}</Text>
                <Text fontSize={"xs"} mt={2}>
                  {review.name}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}

function Footer() {
  const meta = useSiteMetadata();
  return (
    <Box textAlign={"center"} py={8}>
      <Text>Questions? We're here to help.</Text>
      <Flex gap={2} my={2}>
        <Button as={Link} to="/customer-support" variant="text" leftIcon={<Icon as={BiSupport} />}>
          Customer Support
        </Button>
        <Button as={Link} to="/customer-support" variant="text" leftIcon={<Icon as={BiSupport} />}>
          Help Center
        </Button>
      </Flex>
      <Text fontSize={"xs"}>©2024 {meta.brandName}. All rights reserved.</Text>
    </Box>
  );
}

function CTABanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      if (window.scrollY > 500) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    });
  }, []);

  return (
    <Flex
      position={"fixed"}
      width={"100%"}
      left={0}
      bottom={showBanner ? 0 : "-100px"}
      zIndex={10}
      transition={"all 500ms"}
      bg="blue.50"
      borderTop={"2px solid"}
      borderColor={"blue.300"}
      p={1}
    >
      <Container as={Flex} alignItems={"center"} justifyContent={"center"}>
        <Box>
          <Text as="span" fontWeight={"bold"} fontSize={"sm"} mr={2}>
            Your personalized offer reserved
          </Text>
          <Timer />
        </Box>
        <CTAButton>Get my prediction</CTAButton>
      </Container>
    </Flex>
  );
}

function CTAButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      colorScheme="blue"
      flexShrink={0}
      {...props}
      onClick={() => {
        navigate("/face-reading/checkout");
      }}
    >
      Get my prediction
    </Button>
  );
}
