import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Span } from "@components/quizpage/components";
import { CTAButton } from "@components/summary/components";
import * as React from "react";

interface IPersonalPageProps {}

function PersonalPage(props: IPersonalPageProps) {
  return (
    <Box minH={"100vh"} bg="bg.100" color="white" py={8}>
      <Container>
        <Flex direction="column" textAlign={"center"} gap={4}>
          <Heading>Your 7-day trial has ended</Heading>
          <Text>
            You will no longer be receiving daily personalized horoscopes and will lose access to
            personalized email consultations.
          </Text>
        </Flex>

        <Stack mt={16} spacing={4} color="brand.700">
          <Box bg="bg.200" p={4} borderRadius={"lg"}>
            <Text fontWeight={"bold"} mb={4} fontSize={"xl"}>
              Basic Plan
            </Text>
            <Stack alignItems={"start"} spacing={2} color="white" fontSize={"md"}>
              <Flex alignItems={"start"} gap={2}>
                <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
                <Box>
                  <Text fontWeight={"bold"}>Astrological Profile Analysis</Text>
                  <Text>
                    Understand why you are the way you are. Why you do things in a certain way. Why
                    do you always fall for the same traps.
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
                Everyday Personalised Horoscopes
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
                Everyday Positivity Mantras
              </Flex>
            </Stack>
            <Text
              mt={8}
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color="orange.200"
            >
              $3.90 <Span fontWeight={"normal"}>/ month</Span>
            </Text>
            <CTAButton mt={8}>Choose Basic</CTAButton>
            <Text mt={4} color="bg.700" fontSize={"sm"}>
              There is no commitment. You can cancel your subscription any time and will no longer
              be charged a monthly fee.
            </Text>
          </Box>

          <Box bg="bg.200" p={4} borderRadius={"lg"}>
            <Text fontWeight={"bold"} mb={4} fontSize={"xl"}>
              Premium Plan
            </Text>
            <Stack alignItems={"start"} spacing={2} color="white" fontSize={"md"}>
              <Flex alignItems={"start"} gap={2}>
                <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
                <Box>
                  <Text>Includes Everything from Basic Plan</Text>
                </Box>
              </Flex>
              <Flex alignItems={"start"} gap={2}>
                <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
                <Box>
                  <Text fontWeight={"bold"}>24/7 Access To a Personal Astrologer</Text>
                  <Text>
                    Ask your astrologer about relationships, your ex's, your crushes, career goals,
                    toxic coleagues and much more.
                  </Text>
                </Box>
              </Flex>
            </Stack>
            <Text
              mt={8}
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color="orange.200"
            >
              $8.90 <Span fontWeight={"normal"}>/ month</Span>
            </Text>
            <CTAButton mt={8}>Choose Premium</CTAButton>
            <Text mt={4} color="bg.700" fontSize={"sm"}>
              There is no commitment. You can cancel your subscription any time and will no longer
              be charged a monthly fee.
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default PersonalPage;
