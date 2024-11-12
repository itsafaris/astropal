import { Box, Button, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import React from "react";

import { SpecialOfferSteps } from "@components/SpecialOfferSteps";
import { FaCheck } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";

import { LuCalendarCheck } from "react-icons/lu";
import { SpecialOfferBadge } from "@components/SpecialOfferBadge";
import { navigate } from "gatsby";

type Guide = {
  id: string;
  title: string;
  description?: string;
  price: string;
  priceBefore?: string;
  discount: string;
  icon: string;
};

const guides: Array<Guide> = [
  {
    id: "ultra-pack",
    title: "Ultra pack",
    description:
      "4 in 1. Tarot and Numerology readings, Guide to Modern Astrology and your Astrological Forecast for the year.",
    price: "$49.99",
    priceBefore: "$151.50",
    discount: "67% OFF",
    icon: "🔮",
  },

  {
    id: "tarot-reading",
    title: "Tarot reading",
    price: "$29.99",
    priceBefore: "$54.50",
    discount: "45% OFF",
    icon: "🎴",
  },

  {
    id: "numerology-analysis",
    title: "Numerology analysis",
    price: "$24.99",
    priceBefore: "$49.99",
    discount: "50% OFF",
    icon: "🔢",
  },

  {
    id: "skip",
    title: "Skip offer",
    price: "You are missing out on both readings",
    discount: "100% LOST",
    icon: "➡️",
  },
];

export default function SpecialOfferGuides() {
  const [hasSkipped, setHasSkipped] = React.useState(false);
  const [selectedGuideID, setSelectedGuideID] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSelectedGuideID(guides[0].id);
  }, []);

  function handleCTAClick() {
    if (selectedGuideID === "skip") {
      handleFirstSkip();
    } else {
      handlePurchase();
    }
  }

  function handlePurchase() {
    //TODO: handle properly
    navigate("/face-reading/special-offer-guides");
    navigateFurther();
  }

  function handlePurchaseExtra() {
    //TODO: handle properly
    navigate("/face-reading/special-offer-guides");
    navigateFurther();
  }

  function handleFirstSkip() {
    setHasSkipped(true);
  }

  function handleSecondSkip() {
    navigateFurther();
  }

  function handleSelect(id: string) {
    setSelectedGuideID(id);
  }

  function navigateFurther() {
    navigate("/face-reading/special-offer-product");
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

          {hasSkipped ? (
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
                    onClick={handlePurchaseExtra}
                  >
                    <Text fontSize={["sm", "md"]}>Get extra insights</Text>
                  </Button>

                  <Button
                    variant={"ghost"}
                    size={"lg"}
                    py={7}
                    onClick={handleSecondSkip}
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
          ) : (
            <Stack>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Choose your sign-up offer 🔥
              </Text>

              <Text fontSize={"sm"} fontWeight={"bold"} color={"brand.500"}>
                Available only now
              </Text>

              <Stack>
                {guides.map((it) => {
                  const isSelected = it.id === selectedGuideID;

                  return (
                    <GuideCard
                      key={it.id}
                      guide={it}
                      isSelected={isSelected}
                      onSelect={handleSelect}
                    />
                  );
                })}
              </Stack>

              <Text my={3} color="gray.500" fontSize={"sm"}>
                *You will be charged for the add-on services or products selected at the time of
                purchase. This is non-recurring payment.
              </Text>

              <Button size={"lg"} py={7} colorScheme="brand" flexGrow={1} onClick={handleCTAClick}>
                <Text fontSize={["sm", "md"]}>
                  {selectedGuideID === "skip" ? "Continue" : "Get my copy"}{" "}
                </Text>
              </Button>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

function GuideCard({
  isSelected,
  guide,
  onSelect,
}: {
  isSelected: boolean;
  guide: Guide;
  onSelect: (id: string) => void;
}) {
  return (
    <Flex
      alignItems={"center"}
      gap={2}
      p={3}
      borderRadius={"lg"}
      border={"2px"}
      borderColor={isSelected ? "brand.600" : "brand.400"}
      backgroundColor={isSelected ? "brand.400" : "white"}
      onClick={() => onSelect(guide.id)}
      cursor={"pointer"}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        width={"26px"}
        height={"26px"}
        borderRadius={"full"}
        backgroundColor={"white"}
        border="2px solid"
        borderColor={isSelected ? "white" : "brand.400"}
        flexShrink={0}
      >
        <Icon as={FaCheck} boxSize={4} color={isSelected ? "brand.400" : "white"} />
      </Stack>

      <Stack spacing={0} alignItems={"flex-start"} flexGrow={1}>
        <Text
          textTransform={"uppercase"}
          fontSize={["xs", "sm"]}
          fontWeight={"bold"}
          color={isSelected ? "white" : "black"}
        >
          {guide.title}
        </Text>

        {guide.description && (
          <Text fontSize={"xs"} color={isSelected ? "white" : "gray.600"} textAlign={"left"}>
            {guide.description}
          </Text>
        )}

        <Flex alignItems={"center"} gap={2} fontWeight={"semibold"} mt={1}>
          <Flex alignItems={"center"} gap={1} fontWeight={"semibold"} width={"135px"}>
            <Text
              fontSize={["xs", "sm"]}
              color={isSelected ? "white" : "gray.600"}
              textAlign={"left"}
            >
              {guide.price}
            </Text>

            {guide.priceBefore && (
              <Text fontSize={"xs"} color={isSelected ? "whiteAlpha.700" : "gray.500"}>
                (was{" "}
                <Text as="span" textDecoration={"line-through"}>
                  {guide.priceBefore}
                </Text>
                )
              </Text>
            )}
          </Flex>

          <Text
            fontSize={"sm"}
            fontWeight={"semibold"}
            color={isSelected ? "brand.600" : "brand.800"}
            backgroundColor={isSelected ? "white" : "brand.300"}
            px={2}
            py={1}
            borderRadius={"lg"}
          >
            {guide.discount}
          </Text>
        </Flex>
      </Stack>

      <Text fontSize={"2xl"}>{guide.icon}</Text>
    </Flex>
  );
}
