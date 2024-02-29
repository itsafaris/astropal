import { Box, Container, Flex, Text, Heading, Stack } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { useSiteMetadata } from "@hooks/useSiteMetadata";

import { StaticImage } from "gatsby-plugin-image";
import { TopNavigation } from "@components/topnavigation";
import { CheckIcon } from "@chakra-ui/icons";
import { InvertedHighlight } from "@components/summary/components";
import { AreasOfGuidanceSection } from "@components/summary/AreasOfGuidanceSection";

export function Head() {
  const { brandName } = useSiteMetadata();
  return (
    <SEO
      title={`Experience the Most Accurate Personalized Astrology - ${brandName}`}
      description="Begin your AstroPal journey and unlock cosmic secrets for love and connection. Take our quiz to reveal personalized astrological and numerological insights for your relationships."
    />
  );
}

export default function IndexPage() {
  return (
    <Box bg="bg.100" minH={"100vh"}>
      <TopNavigation color="white" />

      <Flex
        borderRadius={"full"}
        overflow={"hidden"}
        height={"150px"}
        width={"150px"}
        boxShadow={"inset 0 0 50px 0 #ffc9001f, 0 0 50px 0 #ffc9002b"}
        position={"relative"}
        mx={"auto"}
      >
        <StaticImage
          src={`../images/partner-3.png`}
          alt="Option - in relationship"
          placeholder="none"
          width={140}
          height={140}
          layout="fixed"
          style={{
            position: "absolute",
            zIndex: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: `1px solid #e4b382`,
            borderRadius: "50%",
          }}
        />
      </Flex>

      <Container py={8}>
        <Heading textAlign={"center"} as="h1" fontFamily={"serif"}>
          <InvertedHighlight>Experience the Most Accurate Personalized Astrology</InvertedHighlight>
        </Heading>
      </Container>

      <Container pl={8} py={8}>
        <Text color="white" fontSize={"xl"} fontWeight={"semibold"} mb={4}>
          Delivered to your 📥 inbox every morning:
        </Text>
        <Stack alignItems={"start"} spacing={2} color="white" fontSize={"md"} fontWeight={"bold"}>
          <Flex alignItems={"center"} gap={2}>
            <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
            Astrological Profile Analysis
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
            Everyday Personalised Horoscopes
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
            Everyday Positivity Mantras
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
            24/7 Access To a Personal Astrologer
          </Flex>
        </Stack>
      </Container>

      <Box py={10} color="white">
        <Container px={8}>
          <Heading textAlign={"center"} as="h2" mb={8} fontSize={"2xl"}>
            <InvertedHighlight>We help people with their</InvertedHighlight>
          </Heading>
          <Stack>
            <Flex bg="bg.200" p={3} borderRadius={"full"} alignItems={"center"} gap={2}>
              💼 Career Opportunities
            </Flex>
            <Flex bg="bg.200" p={3} borderRadius={"full"} alignItems={"center"} gap={2}>
              💞 Relationship Analysis and Advice
            </Flex>
            <Flex bg="bg.200" p={3} borderRadius={"full"} alignItems={"center"} gap={2}>
              ☘️ Personal Growth Plan
            </Flex>
          </Stack>

          <Flex
            flexDirection={"row"}
            width={"100%"}
            gap={5}
            alignItems={"center"}
            alignSelf={"center"}
            maxWidth={400}
            mx="auto"
            mt={10}
          >
            <StaticImage
              alt=""
              src="../images/user9.png"
              style={{ width: 100, height: 100, borderRadius: "50%", flexShrink: 0 }}
            />

            <Flex flexDirection={"column"} gap={1}>
              <Text fontSize={"md"} lineHeight={1.3}>
                "This unique guidance helped me to unveil my authentic essence"
              </Text>

              <Text textAlign={"right"} fontSize={"md"} width={"100%"}>
                - Linda Miller
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box py={10} color="white">
        <Container px={8}>
          <Heading textAlign={"center"} as="h2" mb={8} fontSize={"2xl"}>
            <InvertedHighlight>Our personalised astrology is for you if you:</InvertedHighlight>
          </Heading>
          <AreasOfGuidanceSection />
        </Container>
      </Box>
    </Box>
  );
}
