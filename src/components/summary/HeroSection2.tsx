import { Box, Container, Text, Stack, Flex, useTheme } from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

import { QuizStateParsed } from "@utils/state";

import { CTALinkToPricing } from "./components";
import { StaticImage } from "gatsby-plugin-image";
import { AstrologicalProfileSmall } from "./AstrologicalProfileSmall";

export function HeroSection({ state }: { state: QuizStateParsed }) {
  const theme = useTheme();

  return (
    <Box id="hero-section" as="section" bgGradient={"linear(to-t, bg.50, #142326)"}>
      <Container>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Stack position={"relative"} spacing={6}>
            <Text fontWeight="semibold" textAlign={"center"} fontSize={"xl"} color="white">
              Congratulations! <br /> Your{" "}
              <Text as="span" color="#c398ff" fontWeight={"black"}>
                1-Time FREE{" "}
              </Text>{" "}
              Insight Arrives <br />
              🗓️ Tomorrow at 07:00
            </Text>

            <Text fontWeight="semibold" textAlign={"center"} fontSize={"xl"} color="white">
              SELF DISCOVERY MENTORSHIP
            </Text>
            <Text fontWeight="semibold" textAlign={"center"} fontSize={"xl"} color="white">
              UNIQUE METHOD
            </Text>
            <Text fontWeight="semibold" textAlign={"center"} fontSize={"xl"} color="white">
              +40 bobele
            </Text>
            <Text fontWeight="semibold" textAlign={"center"} fontSize={"xl"} color="white">
              BUS VISKO
            </Text>

            <Text fontWeight="semibold" textAlign={"center"} fontSize={"xl"} color="white">
              Stebedami real-time zvaigzdes galim pasakyt kada kokie opportuniciai tau bus
            </Text>

            <Box
              position={"relative"}
              maxWidth={290}
              marginLeft={"auto"}
              marginRight={"auto"}
              mb={"130px"}
            >
              <StaticImage alt="" src="../../images/product/hero.png" />

              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                gap={1}
                position={"absolute"}
                width={"100%"}
                top={"75px"}
                left={0}
              >
                <Text
                  textAlign={"center"}
                  width={"full"}
                  fontSize={"35px"}
                  color="white"
                  fontWeight={400}
                  lineHeight={1}
                >
                  07:00
                </Text>
                <Text
                  textAlign={"center"}
                  width={"full"}
                  fontSize={"8px"}
                  color="white"
                  lineHeight={1}
                >
                  July 6, Wednesday
                </Text>
              </Flex>

              <Flex
                flexDirection={"column"}
                alignItems={"flex-start"}
                py={3}
                px={4}
                backgroundColor="#b5adc0"
                position={"absolute"}
                gap={2}
                borderRadius={5}
                bottom={"-35%"}
                left={"60%"}
                transform={"translateX(-50%)"}
                boxShadow={"0px 0px 20px 0px #00000040"}
                width={200}
                zIndex={1}
                fontSize={"sm"}
                fontWeight={"bold"}
                color="black"
                lineHeight={1}
              >
                <Text>• 1 FREE Insight</Text>
                <Text>• Covers Relationships</Text>
                <Text>• Uses Your Natal Chart</Text>
              </Flex>

              <AstrologicalProfileSmall
                quizState={state}
                position={"absolute"}
                left={"-5%"}
                bottom={"-35%"}
                transform={"rotate(-25deg)"}
                boxShadow={"0px 0px 20px 0px #00000040"}
              />
            </Box>

            <Stack
              spacing={7}
              maxW={400}
              width={"100%"}
              mx="auto"
              bgGradient={"linear(to-t, transparent 40%, bg.200 70%, bg.200 90%)"}
              borderRadius={"xl"}
              p={6}
              pb={7}
            >
              <Text
                fontWeight="semibold"
                textAlign={"center"}
                width={"full"}
                fontSize={"xl"}
                color="white"
              >
                Start Your <br /> Self-Discovery Journey <br /> with everyday insights
              </Text>

              <Flex flexDirection={"column"} alignItems={"center"}>
                <Features />

                <Flex flexDirection={"column"} alignItems={"center"} p={3} pt={5}>
                  <StaticImage
                    alt=""
                    src="../../images/significant_clarity.png"
                    style={{ width: "100%", opacity: 1 }}
                  />
                </Flex>
              </Flex>

              <CTALinkToPricing
                backgroundColor="green.700"
                _hover={{
                  backgroundColor: "green.800",
                }}
                boxShadow={`inset 0 0 0 3px ${theme.colors.green["500"]}`}
                color="white"
              />
            </Stack>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}

function Features() {
  return (
    <Stack alignItems={"start"} color={"#80db4b"} mx="auto" fontSize={"lg"} fontWeight={"semibold"}>
      <Text>
        <CheckIcon color={"#80db4b"} height={"25px"} width={"25px"} mr={3} />
        Full Astrological Profile
      </Text>
      <Text>
        <CheckIcon color={"#80db4b"} height={"25px"} width={"25px"} mr={3} />
        Scheduled Insights
      </Text>
      <Text>
        <CheckIcon color={"#80db4b"} height={"25px"} width={"25px"} mr={3} />
        On-Demand Insights
      </Text>
      <Text>
        <CheckIcon color={"#80db4b"} height={"25px"} width={"25px"} mr={3} />
        Uses Your Natal Chart
      </Text>
    </Stack>
  );
}
