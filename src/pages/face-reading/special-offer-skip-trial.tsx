import { Box, Button, Container, Flex, Grid, Icon, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import React from "react";

import { PiHandPalmLight } from "react-icons/pi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { GiSelfLove } from "react-icons/gi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { SpecialOfferSteps } from "@components/SpecialOfferSteps";
import { navigate } from "gatsby";
import { SpecialOfferCaution } from "@components/SpecialOfferCaution";

export default function SpecialOfferSkipTrial() {
  const [hasSkipped, setHasSkipped] = React.useState(false);

  function handlePurchase() {}

  function handleFirstSkip() {
    setHasSkipped(true);
  }

  function handleSecondSkip() {
    navigate("/face-reading/special-offer-guides");
  }

  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={1} />
          <SpecialOfferCaution />

          {hasSkipped ? (
            <Stack spacing={6}>
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
                  <Button size={"lg"} py={7} onClick={handleSecondSkip}>
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
          ) : (
            <Stack>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Not planning on looking back?
              </Text>

              <Grid gridTemplateColumns={"1fr 1fr"} gap={2} alignItems={"flex-end"}>
                <Card onSelect={handleFirstSkip} />
                <CardSpecial onSelect={handlePurchase} />
              </Grid>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

function Card({ onSelect }: { onSelect: () => void }) {
  return (
    <Stack
      p={3}
      pt={5}
      border={"2px solid"}
      borderColor={"gray.300"}
      borderRadius={"xl"}
      spacing={3}
      fontSize={["sm", "md"]}
    >
      <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
        $19 per week
      </Text>

      <Stack spacing={0}>
        <Text>Billing period</Text>
        <Text color="gray.500">Every week</Text>
      </Stack>

      <Stack spacing={0}>
        <Text>Billed amount</Text>
        <Text color="gray.500">$19</Text>
      </Stack>

      <Stack spacing={0}>
        <Text>Billed in 4 weeks</Text>
        <Text color="gray.500">$76</Text>
      </Stack>

      <Button size={"lg"} py={7} onClick={onSelect}>
        <Text fontSize={["sm", "md"]}>Start trial</Text>
      </Button>
    </Stack>
  );
}

function CardSpecial({ onSelect }: { onSelect: () => void }) {
  return (
    <Stack
      border={"2px solid"}
      borderColor={"brand.500"}
      borderRadius={"xl"}
      spacing={0}
      fontSize={["sm", "md"]}
      overflow={"hidden"}
    >
      <Box backgroundColor={"brand.500"} py={3}>
        <Text textAlign={"center"} color={"white"} fontWeight={"semibold"}>
          BEST VALUE 🎉
        </Text>
      </Box>

      <Stack p={3} pt={5} spacing={3}>
        <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
          $2.46 per day
        </Text>

        <Stack spacing={0}>
          <Text>Billing period</Text>
          <Text color="gray.500">Every 4 weeks</Text>
        </Stack>

        <Stack spacing={0}>
          <Text>Billed amount</Text>
          <Text color="gray.500">$69</Text>
        </Stack>

        <Stack spacing={0}>
          <Text>Billed in 4 weeks</Text>
          <Text color="gray.500">$69</Text>
        </Stack>

        <Button size={"lg"} py={7} colorScheme="brand" onClick={onSelect}>
          <Text fontSize={["sm", "md"]}>
            Skip trial <br />
            and accept offer
          </Text>
        </Button>
      </Stack>
    </Stack>
  );
}
