import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Heading,
  Flex,
  Icon,
  Container,
  Step,
  Stepper,
  StepIndicator,
  StepStatus,
  StepSeparator,
  Card,
  Stack,
  Grid,
  AspectRatio,
  ButtonProps,
} from "@chakra-ui/react";
import { Span } from "@components/quizpage/components";
import { StaticImage } from "gatsby-plugin-image";
import { PiChatsCircleDuotone } from "react-icons/pi";
import { MdOutlineGroupAdd, MdVerified } from "react-icons/md";
import { FaCheck, FaCircle, FaRegLightbulb, FaLock } from "react-icons/fa";
import { TbFaceId } from "react-icons/tb";
import { GiOppositeHearts } from "react-icons/gi";
import { LuCalendarCheck } from "react-icons/lu";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link, navigate } from "gatsby";
import { Timer } from "@components/timer";
import { ComponentProps, useEffect, useState } from "react";
import React from "react";
import { trackPixelEvent, trackPosthogEvent } from "@utils/tracking";
import { TopNavigation } from "@components/topnavigation";
import { NewsBanner } from "@components/summary/NewsBanner";
import { MediaBanner } from "@components/summary/MediaBanner";
import { keyframes } from "@emotion/react";
import { FaInfinity } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { useRootState } from "@components/wrappers/RootWrapper";

export default function SummaryPage() {
  React.useEffect(() => {
    trackPixelEvent({ event: "AddToCart" });
  }, []);

  return (
    <Box>
      <TopNavigation />

      <NewsBanner
        items={[
          { name: "Tom", text: "just discovered", highlightedText: "his hidden talents" },
          { name: "Sophia", text: "just uncovered", highlightedText: "her health secrets" },
          { name: "Luis", text: "just found out when", highlightedText: "he'll meet his soulmate" },
          { name: "Anna", text: "just discovered", highlightedText: "how many kids she'll have" },
          { name: "Mark", text: "just learned", highlightedText: "how long he'll live" },
          { name: "Sarah", text: "just found out", highlightedText: "when she'll get married" },
          { name: "James", text: "just unlocked", highlightedText: "his financial future" },
          { name: "Emily", text: "just learned", highlightedText: "her career destiny" },
          { name: "Ella", text: "just learned", highlightedText: "when she'll buy a home" },
        ]}
      />

      <Box pb={10}>
        <HeroSection />
        <MediaBanner />
        <HowItWorks />
        <FaceFeatures />
        <WhatsIncluded />
        <MoneyGuarantee />
        <UserReviews />
        <Footer />
        <CTABanner />
      </Box>
    </Box>
  );
}

function HeroSection() {
  return (
    <Container maxW={"container.lg"} pt={[5, 10]} pb={[6, 14]}>
      <Grid display={["none", "none", "grid"]} gridTemplateColumns={["1fr", "1fr 1fr"]} gap={5}>
        <Stack spacing={12}>
          <HeroTitle />
          <HeroFeatures />
          <HeroCTA />
        </Stack>

        <HeroFaceReading />
      </Grid>

      <Stack display={["flex", "flex", "none"]} pb={6} spacing={8}>
        <HeroTitle />
        <HeroFaceReading />
        <HeroCTA width={"95%"} mx="auto" />
        <HeroFeatures />
      </Stack>
    </Container>
  );
}

function HeroTitle() {
  return (
    <Heading fontSize={["3xl", "5xl"]} fontWeight="bold" textAlign={["center", "center", "left"]}>
      Your Face Reading
      <br />
      <Text as="span" color="brand.500">
        Is Ready!
      </Text>
    </Heading>
  );
}

function HeroCTA(props: ButtonProps) {
  return (
    <CTAButton py={6} fontSize={"lg"} trackingProps={{ section: "face-features" }} {...props} />
  );
}

function HeroFeatures() {
  return (
    <Stack spacing={3}>
      <Flex alignItems={"center"} gap={2}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          height={"40px"}
          width={"40px"}
          borderRadius={"md"}
          backgroundColor={"brand.200"}
          flexShrink={0}
        >
          <Icon as={FaInfinity} color={"brand.700"} boxSize={6} />
        </Flex>

        <Text>
          <Text as="span" fontWeight={"bold"} color="brand.600">
            Unlimited
          </Text>{" "}
          insights for life transformation
        </Text>
      </Flex>

      <Flex alignItems={"center"} gap={2}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          height={"40px"}
          width={"40px"}
          borderRadius={"md"}
          backgroundColor={"brand.200"}
          flexShrink={0}
        >
          <Icon as={MdOutlineGroupAdd} color={"brand.700"} boxSize={6} />
        </Flex>

        <Text>
          <Text as="span" fontWeight={"bold"} color="brand.600">
            776
          </Text>{" "}
          people joined today
        </Text>
      </Flex>

      <Flex alignItems={"center"} gap={2}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          height={"40px"}
          width={"40px"}
          borderRadius={"md"}
          backgroundColor={"brand.200"}
          flexShrink={0}
        >
          <Icon as={IoChatbubbleEllipsesOutline} color={"brand.700"} boxSize={6} />
        </Flex>

        <Stack spacing={0}>
          <Text>
            Trusted by over{" "}
            <Text as="span" fontWeight={"bold"} color="brand.600">
              25 million
            </Text>{" "}
            people.
          </Text>

          <Flex alignItems={"center"} gap={1}>
            <Icon as={FaStar} color={"yellow.400"} boxSize={5} />
            <Icon as={FaStar} color={"yellow.400"} boxSize={5} />
            <Icon as={FaStar} color={"yellow.400"} boxSize={5} />
            <Icon as={FaStar} color={"yellow.400"} boxSize={5} />
            <Icon as={FaStar} color={"yellow.400"} boxSize={5} />
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
}

function HeroFaceReading() {
  const { faceImageDataUrl } = useRootState();

  return (
    <Stack alignItems={"center"}>
      <AspectRatio ratio={1} maxW={"200px"} width={"100%"}>
        <Stack
          justifyContent={"center"}
          borderRadius={"xl"}
          overflow={"hidden"}
          backgroundColor={"gray.100"}
          border="5px solid"
          borderColor="gray.100"
        >
          {faceImageDataUrl ? (
            <Image
              src={faceImageDataUrl}
              objectFit={"contain"}
              maxWidth="100%"
              maxHeight="100%"
              borderRadius={"lg"}
            />
          ) : (
            <StaticImage
              alt=""
              src={"../../images/default-user-face-image.jpg"}
              width={300}
              style={{
                borderRadius: "8px",
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </Stack>
      </AspectRatio>

      <Stack
        width={"300px"}
        backgroundColor={"white"}
        borderRadius={"xl"}
        p={3}
        boxShadow={"2xl"}
        mt={-10}
        zIndex={1}
      >
        <Stack spacing={0} position={"relative"}>
          <Text mb={5} whiteSpace={"pre-wrap"} fontSize={"xs"}>
            You possess a remarkable and harmonious blend of intellect and emotional intelligence
            that sets you apart from others. Your warm and approachable nature
            <Text as="span" filter="blur(2px)">
              PageMaker including versions of Lorem Ipsum PageMaker including versions of Lorem
              Ipsum PageMaker including versions of Lorem Ipsum PageMaker including versions of
              Lorem Ipsum PageMaker including versions of Lorem Ipsum PageMaker including versions
              of Lorem Ipsum PageMaker including versions of Lorem Ipsum PageMaker including
              versions of Lorem Ipsum PageMaker including versions of Lorem Ipsum PageMaker
              including versions of Lorem Ipsum PageMaker including versions of Lorem Ipsum
              PageMaker including versions of Lorem Ipsum PageMaker including versions of Lorem
              Ipsum PageMaker including versions of Lorem Ipsum PageMaker including versions of
              Lorem Ipsum PageMaker including versions of Lorem Ipsum
            </Text>
          </Text>

          <Stack
            spacing={0}
            position={"absolute"}
            left={0}
            bottom={0}
            width={"100%"}
            height={"90%"}
          >
            <Box
              height={"100%"}
              backgroundColor={"#ffffff85"}
              backdropFilter="blur(5px)"
              style={{
                mask: "linear-gradient(transparent , white 60px)",
              }}
            />

            <Stack
              width={"full"}
              px={3}
              alignItems={"center"}
              position={"absolute"}
              bottom={0}
              mb={8}
            >
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={3}
                width={"full"}
                mb={4}
              >
                <Text fontSize={"lg"} lineHeight={1.3} fontWeight={"bold"}>
                  Face Reading <br /> Accuracy:{" "}
                </Text>

                <Text fontSize={"3xl"} fontWeight={"black"} color={"green.500"}>
                  97%
                </Text>
              </Flex>

              <FaceReadingItem title="Personality" text="Prepared" />
              <FaceReadingItem title="Love" text="Prepared" />
              <FaceReadingItem title="Career" text="Prepared" />
              <FaceReadingItem title="Special traits" text="Identified" />
              <FaceReadingItem title="Negative traits" text="Identified" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function FaceReadingItem({ title, text }: { title: string; text: string }) {
  return (
    <Grid width={"full"} gridTemplateColumns={"auto 1fr auto"} alignItems={"flex-end"}>
      <Text fontWeight={"semibold"} fontSize={"sm"}>
        {title}:
      </Text>

      <Flex borderBottom="2px dotted" borderColor={"gray.300"} mb={1} mx={2} />

      <Text fontWeight={"semibold"} fontSize={"sm"} color={"green.500"}>
        {text} <Icon as={FaCheck} />
      </Text>
    </Grid>
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
    <Container p={4} my={8} maxW={"520px"}>
      <Heading as="h2" fontSize="2xl" mb={8} textAlign="center">
        How Does {meta.brandName} Work?
      </Heading>

      <Stepper index={2} orientation="vertical" gap={0} colorScheme="brand">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<Icon as={FaCheck} />}
                active={<Icon as={FaCircle} color="brand.300" />}
              />
            </StepIndicator>

            <Box mb={8} ml={2}>
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                {step.title}
              </Text>

              <Text color={"gray.600"} fontSize={"sm"}>
                {step.description}
              </Text>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Container>
  );
}

function FaceFeatures() {
  const imgStyle = {
    width: 170,
    height: 170,
  };

  const features = [
    {
      color: "purple",
      name: "Eyes",
      description: (
        <Text>
          Eyes mirror your{" "}
          <Span fontWeight={"semibold"} color="purple.600">
            emotional state and inner thoughts
          </Span>
        </Text>
      ),
      example: "Wide-set eyes indicate an open and trusting nature",
      image: (
        <StaticImage
          src="../../images/features/eyes.png"
          alt="face reading eyes"
          width={170}
          height={170}
          style={imgStyle}
        />
      ),
    },
    {
      color: "pink",
      name: "Nose",
      description: (
        <Text>
          Nose shape reflects your approach to{" "}
          <Span fontWeight={"semibold"} color="pink.600">
            work and ambition
          </Span>
        </Text>
      ),
      example: "A straight nose suggests a direct and focused personality",
      image: (
        <StaticImage
          src="../../images/features/nose.png"
          alt="face reading nose"
          width={170}
          height={170}
          style={imgStyle}
        />
      ),
    },
    {
      color: "teal",
      name: "Mouth",
      description: (
        <Text>
          Mouth and lips show your{" "}
          <Span fontWeight={"semibold"} color="teal.600">
            relationships
          </Span>
        </Text>
      ),
      example: "Full lips indicate a passionate and expressive character",
      image: (
        <StaticImage
          src="../../images/features/mouth.png"
          alt="face reading mouth"
          width={170}
          height={170}
          style={imgStyle}
        />
      ),
    },
    {
      color: "blue",
      name: "Forehead",
      description: (
        <Text>
          Forehead shape indicates{" "}
          <Span fontWeight={"semibold"} color="blue.600">
            intellectual capacity
          </Span>
        </Text>
      ),
      example: "A high forehead suggests a philosophical and analytical mind",
      image: (
        <StaticImage
          src="../../images/features/forehead.png"
          alt="face reading forehead"
          width={170}
          height={170}
          style={imgStyle}
        />
      ),
    },
    {
      color: "orange",
      name: "Eyebrows",
      description: (
        <Text>
          Eyebrows reveal your{" "}
          <Span fontWeight={"semibold"} color="orange.600">
            self-expression
          </Span>
        </Text>
      ),
      example: "Arched eyebrows show a quick-witted and observant nature",
      image: (
        <StaticImage
          src="../../images/features/eyebrows.png"
          alt="face reading eyebrows"
          width={170}
          height={170}
          style={imgStyle}
        />
      ),
    },
    {
      color: "green",
      name: "Cheekbones",
      description: (
        <Text>
          Cheekbones reflect your{" "}
          <Span fontWeight={"semibold"} color="green.600">
            social influence
          </Span>
        </Text>
      ),
      example: "Prominent cheekbones indicate charisma and natural authority",
      image: (
        <StaticImage
          src="../../images/features/cheekbones.png"
          alt="face reading cheekbones"
          width={170}
          height={170}
          style={imgStyle}
        />
      ),
    },
  ];

  return (
    <Box backgroundColor={"brand.50"} py={8}>
      <Container p={4} maxW={"container.lg"}>
        <Heading as="h2" fontSize="2xl" mb={6} textAlign="center">
          What Does Your <Span color="brand.600">Face</Span> Reveal About You?
        </Heading>

        <Flex flexWrap={"wrap"} justifyContent={"center"}>
          {features.map((feature, idx) => {
            return (
              <Flex
                key={idx}
                p={4}
                direction={"column"}
                width={300}
                textAlign={"center"}
                alignItems={"center"}
              >
                <Text color={`${feature.color}.600`} fontSize={"lg"} fontWeight={"bold"} mb={4}>
                  {feature.name}
                </Text>

                <Flex direction={"column"} alignItems={"center"}>
                  <Card py={1} px={2} fontSize={"sm"} minH={50}>
                    {feature.description}
                  </Card>

                  {feature.image}

                  <Box
                    p={1}
                    mx={4}
                    bg={`${feature.color}.50`}
                    color={`${feature.color}.600`}
                    fontWeight={"semibold"}
                    fontSize={"xs"}
                    border={"1px solid"}
                    borderColor={`${feature.color}.200`}
                    borderRadius={"md"}
                  >
                    <Text filter="blur(3px)">{feature.example}</Text>
                    <Button
                      width={"full"}
                      colorScheme="brand"
                      leftIcon={<Icon as={FaLock} />}
                      size="sm"
                      mt={1}
                      onClick={() => {
                        trackPosthogEvent({
                          name: "cta-click",
                          properties: {
                            section: "face-features",
                          },
                        });
                        navigate("/face-reading/checkout");
                      }}
                    >
                      Unlock
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            );
          })}
        </Flex>

        <Container
          mt={8}
          gap={4}
          textAlign={"center"}
          as={Flex}
          direction={"column"}
          alignItems={"center"}
        >
          <Text fontSize={"md"} fontWeight={"semibold"}>
            Find the real truth that is written on your face <br />{" "}
            <Span color="brand.600">100% personalized to you</Span>
          </Text>

          <CTAButton size="lg" width={"100%"} trackingProps={{ section: "face-features" }}>
            Unlock ALL your facial insights
          </CTAButton>
          <TodayUserCount />
        </Container>
      </Container>
    </Box>
  );
}

function TodayUserCount() {
  return (
    <HStack justifyContent="center">
      <Icon as={MdOutlineGroupAdd} color="gray.500" fontSize={"xl"} />
      <Text fontWeight={"semibold"} color="gray.500">
        776 people joined today
      </Text>
    </HStack>
  );
}

function WhatsIncluded() {
  return (
    <Container my={8} maxW={"container.md"}>
      <Heading fontSize={"2xl"} textAlign={"center"} mb={4}>
        What's Included?
      </Heading>

      <VStack
        spacing={4}
        alignItems={"start"}
        p={4}
        bg="brand.50"
        border="1px solid"
        borderColor={"brand.200"}
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
    </Container>
  );
}

function MoneyGuarantee() {
  return (
    <Container bg="green.50" p={3} textAlign={"center"} maxW={"container.md"}>
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
    </Container>
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
    <Container my={10} maxW={"container.md"}>
      <Heading fontSize={"2xl"} textAlign={"center"} mb={8}>
        Why Does Everyone Love <Span color="brand.600">{meta.brandName}</Span>?
      </Heading>

      <VStack spacing={8}>
        {reviews.map((review, idx) => {
          return (
            <Flex key={idx} bg="brand.50" p={4} borderRadius={"xl"} gap={0} ml={6}>
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
    </Container>
  );
}

function Footer() {
  const meta = useSiteMetadata();
  return (
    <Box borderTop={"1px solid"} borderColor={"blackAlpha.200"}>
      <Container textAlign={"center"} py={8} maxW={"container.md"}>
        <Stack alignItems={"center"}>
          <StaticImage
            src={`../../images/intuvist-logo-black-h.png`}
            alt="Intuvist logo"
            height={35}
          />

          <Flex gap={2} my={2} mx={"auto"}>
            <Button size={"sm"} as={Link} to="/contact-us" variant="text" color={"gray.500"}>
              Customer Support
            </Button>
            <Button size={"sm"} as={Link} to="/contact-us" variant="text" color={"gray.500"}>
              Help Center
            </Button>
          </Flex>

          <Text fontSize={"xs"} color={"gray.500"}>
            ©2024 {meta.brandName}. All rights reserved.
          </Text>
        </Stack>
      </Container>
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
      width={"full"}
      left={0}
      bottom={showBanner ? 0 : "-100px"}
      zIndex={10}
      transition={"all 500ms"}
      bg="brand.50"
      borderTop={"2px solid"}
      borderColor={"brand.300"}
      p={1}
      pt={2}
      pb={3}
    >
      <Container maxW="container.md">
        <Flex
          direction={["column", "column", "row"]}
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
        >
          <Flex alignItems={"center"} gap={4}>
            <Text as="span" fontWeight={"bold"} fontSize={["sm", "sm", "md"]}>
              Your Personalized Offer Reserved
            </Text>

            <Timer />
          </Flex>

          <CTAButton width={"full"} maxW={["100%", "250px"]}>
            Get my prediction
          </CTAButton>
        </Flex>
      </Container>
    </Flex>
  );
}

const CTAPulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.07);
  }
  100% {
    transform: scale(1);
  }
`;

function CTAButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      colorScheme="brand"
      flexShrink={0}
      animation={`${CTAPulse} 3s infinite`}
      {...props}
      onClick={() => {
        navigate("/face-reading/checkout");
      }}
    >
      Get My Reading
    </Button>
  );
}
