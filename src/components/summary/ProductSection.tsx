import { Box, Button, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { Link } from "gatsby";
import { Span } from "@components/quizpage/components";
import { StarIcon } from "@chakra-ui/icons";
import { NumberOfDownloads } from "@components/svg/appStore";

export interface IProductSectionProps {}

export function ProductSection(props: IProductSectionProps) {
  return (
    <Box id="product-section" as="section" py={12}>
      <Container maxWidth={"94%"}>
        <Heading textAlign={"center"}>The Product that is loved by our customers</Heading>
        <Flex gap={4} justifyContent={"center"} my={8} alignItems={"center"}>
          <NumberOfDownloads boxSize={24} />
          <Flex alignItems={"center"} borderRadius={"full"} px={4} py={2} direction={"column"}>
            <Flex alignItems={"center"} gap={2}>
              <Flex gap={1}>
                {Array(5)
                  .fill("")
                  .map((it) => (
                    <StarIcon color="orange.300" boxSize={"14px"} />
                  ))}
              </Flex>{" "}
              <Text fontWeight={"bold"} fontSize={"lg"}>
                4.7
              </Text>
            </Flex>
            <Text fontSize={"sm"}>Based on 42.300 Reviews</Text>
          </Flex>
        </Flex>

        <Stack spacing={24}>
          <Box>
            <Heading textAlign={"center"} color="white" fontSize={"2xl"}>
              <Span color="purple.300" fontSize={"6xl"}>
                Discover
              </Span>
              <br /> Your Astrological Blueprint
            </Heading>
            <Text my={12} textAlign={"center"} fontWeight={"semibold"} color="white">
              Uncover your strengths and weaknesses. Learn how to empower yourself with the help of
              cosmos.
            </Text>
            <Box>
              <StaticImage alt="astrology product image" src="../../images/product4.png" />
            </Box>
          </Box>

          <Box>
            <Heading mb={12} textAlign={"center"} color="white" fontSize={"2xl"}>
              <Span color="purple.300" fontSize={"6xl"}>
                Receive
              </Span>
              <br />
              Personalised Horoscopes and Mantras Daily
            </Heading>
            <Text my={12} textAlign={"center"} fontWeight={"semibold"} color="white">
              It's way more than a generic horoscope. These are 100% made for your. Based on your
              Birth Chart and Personality.
            </Text>

            <Box mt={8}>
              <StaticImage alt="astrology product image" src="../../images/product1.png" />
            </Box>
          </Box>

          <Box>
            <Box mb={12}>
              <Heading textAlign={"center"} color="white" fontSize={"2xl"}>
                <Span color="purple.300" fontSize={"6xl"}>
                  Ask
                </Span>
                <br /> Your most important questions and receive detailed answers instantly
              </Heading>

              <Text textAlign={"center"} mt={8} mb={4} fontWeight={"bold"}>
                How it works
              </Text>

              <Box>
                <Text textAlign={"center"} fontSize={"xl"}>
                  1. You ask any question
                </Text>
                <Box pl={2} my={8} mx="auto">
                  <StaticImage alt="astrology product image" src="../../images/product2.png" />
                </Box>
              </Box>
            </Box>

            <Box>
              <Text my={10} maxWidth={"80%"} mx="auto" textAlign={"center"} fontSize={"xl"}>
                2. Receive a personalised answer based on your astrological profile and current
                celestial events
              </Text>
              <Box maxWidth={"80%"} my={8} mx="auto">
                <StaticImage alt="astrology product image" src="../../images/product3.png" />
              </Box>
            </Box>
          </Box>
        </Stack>

        <Link to="/summary#pricing-plans" title="Pricing plans">
          <Button width={"full"} colorScheme="red" size="lg" my={8}>
            Start Now
          </Button>
        </Link>
      </Container>
    </Box>
  );
}
