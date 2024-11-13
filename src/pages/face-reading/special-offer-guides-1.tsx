import { Box, Button, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import React from "react";

import { SpecialOfferSteps } from "@components/SpecialOfferSteps";
import { FaCheck } from "react-icons/fa";
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

export default function SpecialOfferGuides1() {
  const [selectedGuideID, setSelectedGuideID] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSelectedGuideID(guides[0].id);
  }, []);

  function handleCTAClick() {
    if (selectedGuideID === "skip") {
      handleSkip();
    } else {
      handlePurchase();
    }
  }

  function handlePurchase() {
    //TODO: handle properly
    navigate("/face-reading/special-offer-product");
  }

  function handleSkip() {
    navigate("/face-reading/special-offer-guides-2");
  }

  function handleSelect(id: string) {
    setSelectedGuideID(id);
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
