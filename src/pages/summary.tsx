import { ComponentProps, useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PageProps } from "gatsby";

import { TopNavigation } from "@components/topnavigation";
import { loadQuizState } from "@utils/localStorage";
import { QuizStateParsed } from "@utils/state";

import { AreasOfGuidanceSection } from "@components/summary/AreasOfGuidanceSection";
import { AstrologerComparisonSection } from "@components/summary/AstrologerComparisonSection";
import { ExampleQuestionsSection } from "@components/summary/ExampleQuestionsSection";
import { MediaCoverageSection } from "@components/summary/MediaCoverageSection";
import { SimilarUsersLikeYouSection } from "@components/summary/SimilarUsersLikeYouSection";
import { TestimonialsSection } from "@components/summary/TestimonialsSection";
import { HeroSection } from "@components/summary/HeroSection";
import { PricingSection } from "@components/summary/PricingSection";
import { SpecialOfferBanner } from "@components/summary/SpecialOfferBanner";
import { StaticImage } from "gatsby-plugin-image";
import { Span } from "@components/quizpage/components";

export default function SummaryPage({}: PageProps) {
  const [quizState, setQuizState] = useState<QuizStateParsed | undefined>();

  useEffect(() => {
    const q = loadQuizState();
    setQuizState(q);
  }, []);

  return (
    <Box
      py={4}
      pb={24}
      bgGradient="linear(to-b, bg.50, bg.100)"
      color="bg.900"
      scrollBehavior={"smooth"}
    >
      {/* <Container>
        <TopNavigation />
      </Container> */}

      <Container>
        <Card p={4}>
          <Box mb={6}>
            <Text>
              <Span fontWeight={"regular"} color="blackAlpha.600">
                Zodiac:
              </Span>{" "}
              <Span textTransform={"capitalize"}>{quizState?.yourZodiac.name}</Span>
            </Text>
            <Text>
              <Span fontWeight={"regular"} color="blackAlpha.600">
                Gender:
              </Span>{" "}
              <Span textTransform={"capitalize"}>{quizState?.yourGender}</Span>
            </Text>
            <Text>
              <Span fontWeight={"regular"} color="blackAlpha.600">
                Focus Area:
              </Span>{" "}
              <Span textTransform={"capitalize"}>{quizState?.goal}</Span>
            </Text>
          </Box>

          <Flex flexDirection={"row"} gap={"1px"} bg="gray.200">
            {/* left */}
            <Stack flex={1} bg="white" pr={4}>
              <Box
                px={3}
                py={2}
                background={"white"}
                color="purple.600"
                borderRadius={"lg"}
                mx="auto"
              >
                Now
              </Box>
              <StaticImage src="../images/female_upset.png" />
              <Box my={2}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Self-Understanding
                </Text>
                <Text fontSize={"sm"}>Minimal</Text>
              </Box>
              <Box my={2}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Decision Making
                </Text>
                <Text fontSize={"sm"}>Weak</Text>
                <Rating value={1} total={3} />
              </Box>

              <Box my={2}>
                <Text fontWeight={"bold"} fontSize={"sm"}>
                  Realised opportunities
                </Text>
                <Text fontSize={"sm"}>Low</Text>
                <RatingSlider value={2} total={10} colorScheme="red" />
              </Box>
            </Stack>
            {/* right */}
            <Stack flex={1} bg="white" pl={4}>
              <Box px={3} py={2} color="white" bg="purple.600" borderRadius={"lg"} mx="auto">
                Your Goal
              </Box>
              <StaticImage src="../images/female_happy.png" />
              <Box my={2}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Self-Understanding
                </Text>
                <Text fontSize={"sm"}>Full</Text>
              </Box>
              <Box my={2}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Decision Making
                </Text>
                <Text fontSize={"sm"}>Confident</Text>
                <Rating value={3} total={3} />
              </Box>
              <Box my={2}>
                <Text fontWeight={"bold"} fontSize={"sm"}>
                  Realised opportunities
                </Text>
                <Text fontSize={"sm"}>High</Text>
                <RatingSlider value={8} total={10} colorScheme="green" />
              </Box>
            </Stack>
          </Flex>
        </Card>

        <Text my={4} textAlign={"center"} width={"full"} fontSize={"xl"} mb={4}>
          Your personal Self-Discovery guide is based on the{" "}
          <Span>most detailed astrological reading of your birth chart</Span>
        </Text>

        <Flex gap={2} my={4}>
          <Card flex={1} py={3}>
            <Text fontWeight={"bold"} fontSize={"xl"} textAlign={"center"}>
              🌔 Moon
            </Text>
            <Text fontSize={"xs"} textAlign={"center"}>
              Leading Object
            </Text>
          </Card>
          <Card flex={1} py={3} justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={"xl"} textAlign={"center"}>
              11th (health)
            </Text>
            <Text fontSize={"xs"} textAlign={"center"}>
              House
            </Text>
          </Card>
        </Flex>

        <Button colorScheme="orange" width={"full"}>
          Get My Guide
        </Button>

        <Box id="section-other-users" my={8}>
          <Text textAlign={"center"} mb={4} fontSize={"xl"} fontWeight={"semibold"}>
            Data from our similar users
          </Text>
          <Card p={4} my={4}>
            <Flex gap={2} alignItems={"center"}>
              <Badge colorScheme="orange">{quizState?.yourGender}</Badge>
              <Badge colorScheme="blue">{quizState?.yourZodiac.name}</Badge>
              <Badge colorScheme="gray">User Count: 14,322</Badge>
            </Flex>
            <Divider color="blackAlpha.500" my={2} />

            <Stack alignItems={"start"} gap={2}>
              <Flex direction={"row"} alignItems={"center"} justifyContent={"start"} gap={4}>
                <Text color="green.500" fontSize={"xl"} fontWeight={"bold"}>
                  +34%
                </Text>
                <Text fontWeight={"semibold"}>💞 Love and Relationships</Text>
              </Flex>
              <Flex direction={"row"} alignItems={"center"} justifyContent={"start"} gap={4}>
                <Text color="green.500" fontSize={"xl"} fontWeight={"bold"}>
                  +64%
                </Text>
                <Text fontWeight={"semibold"}>💼 Career and Professional Life</Text>
              </Flex>
              <Flex direction={"row"} alignItems={"center"} justifyContent={"start"} gap={4}>
                <Text color="green.500" fontSize={"xl"} fontWeight={"bold"}>
                  +48%
                </Text>
                <Text fontWeight={"semibold"}>🌿 Self Growth</Text>
              </Flex>
            </Stack>
          </Card>
        </Box>

        <Box as="ul" pl={4} my={12}>
          <Heading textAlign={"center"} mb={4}>
            What you get
          </Heading>
          <Stack spacing={2}>
            <Text>✅ Control your career choices</Text>
            <Text>✅ Improve your love life</Text>
            <Text>✅ Choose ideal partners</Text>
            <Text>✅ Tackle life decisions with peace of mind</Text>
            <Text>✅ Understand life hints</Text>
            <Text>✅ Do not miss life opportunities</Text>
          </Stack>
        </Box>
      </Container>

      {/* <Container>
        <AreasOfGuidanceSection />
        <ExampleQuestionsSection />
        <SimilarUsersLikeYouSection />
        <TestimonialsSection />
        <MediaCoverageSection />
      </Container> */}

      {/* <SpecialOfferBanner /> */}

      <Container>
        {/* <PricingSection /> */}
        {/* <AstrologerComparisonSection /> */}
      </Container>
    </Box>
  );
}

function Rating({
  value,
  total,

  colorScheme = "purple",
  ...rest
}: { value: number; total: number; colorScheme?: string } & ComponentProps<typeof Flex>) {
  return (
    <Flex {...rest} gap={1}>
      {Array(total)
        .fill("")
        .map((_, idx) => {
          return (
            <Box
              height={"8px"}
              borderRadius={"sm"}
              flex={1}
              bg={value < idx + 1 ? `${colorScheme}.100` : `${colorScheme}.500`}
            ></Box>
          );
        })}
    </Flex>
  );
}

function RatingSlider({
  value,
  total,
  colorScheme = "purple",
  ...rest
}: { value: number; total: number; colorScheme?: string } & ComponentProps<typeof Flex>) {
  return (
    <Flex {...rest} position={"relative"} bg={`${colorScheme}.100`}>
      <Box
        height={"8px"}
        borderRadius={"sm"}
        width={`${(value / total) * 100}%`}
        bg={`${colorScheme}.500`}
      ></Box>
    </Flex>
  );
}
