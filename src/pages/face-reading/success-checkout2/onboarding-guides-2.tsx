import { Box, Button, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";
import { IoMdStarOutline } from "react-icons/io";
import { LuCalendarCheck } from "react-icons/lu";
import { SpecialOfferBadge } from "@components/onboarding/SpecialOfferBadge";
import { navigate } from "gatsby";
import { createInternalURL, useURLParams } from "@components/onboarding/utils";

export default function OnboardingGuides2() {
  const urlParams = useURLParams<{
    currency: string;
    paymentType: string;
  }>();

  function handlePurchase() {
    //TODO: handle properly
    navigateToNextStep();
  }

  function handleSkip() {
    navigateToNextStep();
  }

  function navigateToNextStep() {
    const url = createInternalURL("/face-reading/success-checkout/onboarding-product", {
      paymentType: urlParams.paymentType,
      currency: urlParams.currency,
    });

    navigate(url);
  }

  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={2} />
          <SpecialOfferBadge
            icon="📣"
            title="Caution!"
            text="To prevent double charges please don't close the page and don't go back."
          />

          <Stack spacing={6}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Final sign-up offer
            </Text>

            <Text lineHeight={1.3} fontSize={"sm"}>
              Unlock your future potential with our Premium Bundle. Make informed decisions and
              seize opportunities!
            </Text>

            <Stack spacing={4}>
              <Text fontSize={"md"} fontWeight={"bold"} color={"brand.700"}>
                What you get:
              </Text>

              <Stack mx="auto">
                <Flex alignItems={"center"} gap={2}>
                  <Icon
                    as={IoMdStarOutline}
                    color={"brand.500"}
                    backgroundColor={"brand.100"}
                    boxSize={9}
                    p={2}
                    borderRadius={"md"}
                  />
                  <Text fontWeight={"semibold"} color={"brand.600"}>
                    Guide to Modern Astrology
                  </Text>
                </Flex>

                <Flex alignItems={"center"} gap={2}>
                  <Icon
                    as={LuCalendarCheck}
                    color={"brand.500"}
                    backgroundColor={"brand.100"}
                    boxSize={9}
                    p={2}
                    borderRadius={"md"}
                  />
                  <Text fontWeight={"semibold"} color={"brand.600"}>
                    Astrological Forecast for the year
                  </Text>
                </Flex>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Box height={"2px"} width={"full"} backgroundColor={"gray.200"} />
              <Text fontSize={"sm"} color={"gray.900"}>
                One-time price of{" "}
                <Text as="span" textDecoration={"line-through"}>
                  $35
                </Text>{" "}
                $10.99! Save 68%!
              </Text>
              <Box height={"2px"} width={"full"} backgroundColor={"gray.200"} />

              <Text fontSize={"sm"} color={"gray.900"}>
                These guide are{" "}
                <Text as="span" fontWeight={"bold"}>
                  yours to keep
                </Text>{" "}
                even if You decide to Intuvist isn't right for you.
              </Text>

              <Stack mt={2} mx={"auto"} spacing={1} alignItems={"center"} width={"full"}>
                <Button
                  size={"lg"}
                  py={7}
                  colorScheme="brand"
                  width={"full"}
                  onClick={handlePurchase}
                >
                  <Text fontSize={["sm", "md"]}>Get extra insights</Text>
                </Button>

                <Button
                  variant={"ghost"}
                  size={"lg"}
                  py={7}
                  onClick={handleSkip}
                  width={"full"}
                  fontWeight={"normal"}
                >
                  <Text fontSize={["sm", "md"]} color={"gray.600"}>
                    Skip this offer and proceed further
                  </Text>
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
