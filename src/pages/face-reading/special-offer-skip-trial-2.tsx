import { Box, Button, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

import { PiHandPalmLight } from "react-icons/pi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { GiSelfLove } from "react-icons/gi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { SpecialOfferSteps } from "@components/SpecialOfferSteps";
import { navigate } from "gatsby";
import { SpecialOfferBadge } from "@components/SpecialOfferBadge";

export default function SpecialOfferSkipTrial2() {
  function handlePurchase() {
    //TODO: handle properly
    navigateToNextStep();
  }

  function handleSkip() {
    navigateToNextStep();
  }

  function navigateToNextStep() {
    navigate("/face-reading/special-offer-guides-1");
  }

  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={1} />

          <Stack spacing={6}>
            <SpecialOfferBadge
              icon="📣"
              title="Caution!"
              text="To prevent double charges please don't close the page and don't go back."
            />

            <Text fontSize={"xl"} fontWeight={"bold"}>
              Are you sure?
            </Text>

            <Text lineHeight={1.3} fontSize={"sm"}>
              Let our expert astrologer and face reader guide you 24/7 on your journey to life's
              answers.
            </Text>

            <Stack spacing={4}>
              <Text fontSize={"md"} fontWeight={"bold"} color={"brand.700"}>
                What you get:
              </Text>

              <Stack mx="auto">
                <Flex alignItems={"center"} gap={2}>
                  <Icon
                    as={PiHandPalmLight}
                    color={"brand.500"}
                    backgroundColor={"brand.100"}
                    boxSize={9}
                    p={2}
                    borderRadius={"md"}
                  />
                  <Text fontWeight={"semibold"} color={"brand.600"}>
                    Unlimited palm readings
                  </Text>
                </Flex>

                <Flex alignItems={"center"} gap={2}>
                  <Icon
                    as={GiSelfLove}
                    color={"brand.500"}
                    backgroundColor={"brand.100"}
                    boxSize={9}
                    p={2}
                    borderRadius={"md"}
                  />
                  <Text fontWeight={"semibold"} color={"brand.600"}>
                    Daily compatibility readings
                  </Text>
                </Flex>

                <Flex alignItems={"center"} gap={2}>
                  <Icon
                    as={MdOutlineTipsAndUpdates}
                    color={"brand.500"}
                    backgroundColor={"brand.100"}
                    boxSize={9}
                    p={2}
                    borderRadius={"md"}
                  />
                  <Text fontWeight={"semibold"} color={"brand.560"}>
                    Cosmic relationships tips
                  </Text>
                </Flex>

                <Flex alignItems={"center"} gap={2}>
                  <Icon
                    as={LuCalendarCheck2}
                    color={"brand.500"}
                    backgroundColor={"brand.100"}
                    boxSize={9}
                    p={2}
                    borderRadius={"md"}
                  />
                  <Text fontWeight={"semibold"} color={"brand.600"}>
                    Daily horoscopes
                  </Text>
                </Flex>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Box height={"2px"} width={"full"} backgroundColor={"gray.200"} />

              <Text fontSize={"sm"} color={"orange.500"}>
                Are you sure you don't want to save $84 per year?
              </Text>

              <Flex mx={"auto"} gap={2} alignItems={"center"} width={"full"}>
                <Button size={"lg"} py={7} onClick={handleSkip}>
                  <Text fontSize={["sm", "md"]}>Skip</Text>
                </Button>

                <Button
                  size={"lg"}
                  py={7}
                  colorScheme="brand"
                  flexGrow={1}
                  onClick={handlePurchase}
                >
                  <Text fontSize={["sm", "md"]}>Accept this offer</Text>
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
