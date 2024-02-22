import {
  Box,
  Flex,
  Stack,
  Text,
  TextProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { pricingPlans, PricingPlanType } from "@utils/pricingPlans";
import { trackEvent } from "@utils/tracking";
import { ComponentProps, useState } from "react";
import { CTAButton, CTALinkToPricing } from "./components";
import { CheckoutWidget } from "src/pages/checkout";
import { SpecialOfferBanner } from "./SpecialOfferBanner";

export interface IPricingPageProps {}

export function PricingSection({
  sectionID,
  ...rest
}: ComponentProps<typeof Box> & { sectionID: string }) {
  const [selectedPlanID, setSelectedPlanID] = useState(pricingPlans["6month"].id);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // @ts-ignore
  const selectedPlan = pricingPlans[selectedPlanID];

  return (
    <Box px={3} py={5} borderRadius={"xl"} backgroundColor={"whiteAlpha.200"} {...rest}>
      <Stack spacing={4}>
        <SpecialOfferBanner
          background={"transparent"}
          px={0}
          py={0}
          color="brand.600"
          shadow={"none"}
        />

        <PricingPlans
          selectedPlanID={selectedPlanID}
          onPlanChanged={(planID) => {
            trackEvent({ name: "change-pricing", properties: { planID: planID } });
            setSelectedPlanID(planID);
          }}
        />

        <CTAButton
          id={sectionID}
          mt={4}
          onClick={() => {
            trackEvent({
              name: "checkout_btn_click",
              properties: { sectionID: sectionID, planID: selectedPlanID },
            });
            onOpen();
          }}
        >
          Start Your Program Now
        </CTAButton>

        {/* <TermsAgreement /> */}
        <RiskFreeGuaranteed />
        <SafeCheckout />
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx="2vw">
          <ModalCloseButton />
          <CheckoutWidget pricingPlan={selectedPlan} />
        </ModalContent>
      </Modal>
    </Box>
  );
}

function TermsAgreement() {
  return (
    <Flex flexDirection={"column"} alignItems={"flex-start"}>
      <Text color="bg.500" fontSize={"xs"}>
        By choosing a payment method, you agree to the Terms & Conditions and Privacy Policy
      </Text>
    </Flex>
  );
}

function RiskFreeGuaranteed() {
  return (
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      gap={3}
      mx="auto"
      px={3}
      py={2}
      borderRadius={8}
      border={"1px solid"}
      borderColor="bg.200"
      width={"full"}
      justifyContent={"center"}
    >
      <Flex height={"80px"} width={"80px"} flexShrink={0}>
        <StaticImage alt="Risk free guarantee" src="../../images/money_back.png" />
      </Flex>

      <Flex flexDirection={"column"} alignItems={"flex-start"} maxWidth={300}>
        <Text fontSize={"xs"} color="green.400" fontWeight={"semibold"} lineHeight={"normal"}>
          Money-Back Guarantee
        </Text>
        <Text color="bg.500" fontSize={"xs"}>
          We're super confident you're going to love our product. If you don't start seeing the
          awesome benefits of personalised astrology, we've got your back with a full refund.
        </Text>
      </Flex>
    </Flex>
  );
}

function SafeCheckout() {
  return (
    <Flex
      px={2}
      py={2}
      borderRadius={8}
      border={"1px solid"}
      borderColor="bg.200"
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap={1}
    >
      <Text fontSize={"xs"} color="bg.500" fontWeight={"semibold"} lineHeight={"normal"}>
        Safe Checkout Guarantee
      </Text>
      <Box mx="auto">
        <StaticImage
          alt="Safe checkout"
          src="../../images/safe-checkout.png"
          layout="constrained"
        />
      </Box>
    </Flex>
  );
}

export function PricingPlans({
  selectedPlanID,
  onPlanChanged,
}: {
  selectedPlanID: string;
  onPlanChanged: (planID: string) => void;
}) {
  return (
    <Flex flexDirection={"column"}>
      <PricingPlanItem
        billingText={"Billed every 6 months"}
        tagText={"Best"}
        tagColor={"green.400"}
        pricingPlan={pricingPlans["6month"]}
        isSelected={selectedPlanID === pricingPlans["6month"].id}
        onClick={() => {
          trackEvent({ name: "change-pricing", properties: { planID: pricingPlans["6month"].id } });
          onPlanChanged(pricingPlans["6month"].id);
        }}
      />

      <PricingPlanItem
        billingText={"Billed every 3 months"}
        tagColor={"brand.700"}
        pricingPlan={pricingPlans["3month"]}
        isSelected={selectedPlanID === pricingPlans["3month"].id}
        onClick={() => {
          trackEvent({ name: "change-pricing", properties: { planID: pricingPlans["3month"].id } });
          onPlanChanged(pricingPlans["3month"].id);
        }}
      />

      <PricingPlanItem
        billingText={"Billed every month"}
        pricingPlan={pricingPlans["1month"]}
        isSelected={selectedPlanID === pricingPlans["1month"].id}
        onClick={() => {
          trackEvent({ name: "change-pricing", properties: { planID: pricingPlans["1month"].id } });
          onPlanChanged(pricingPlans["1month"].id);
        }}
      />
    </Flex>
  );
}

function PricingPlanItem({
  billingText,
  tagText,
  pricingPlan,
  isSelected,
  ...props
}: {
  billingText: string;
  tagText?: string;
  tagColor?: string;
  pricingPlan: PricingPlanType;
  isSelected?: boolean;
} & ComponentProps<typeof Flex>) {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      p={3}
      cursor={"pointer"}
      borderRadius={10}
      backgroundColor="bg.200"
      width={"100%"}
      position="relative"
      border={`3px solid`}
      borderColor={isSelected ? "brand.500" : "bg.400"}
      mt={3}
      {...props}
    >
      {tagText && (
        <Badge position={"absolute"} top={0} left={3} transform={"translateY(-50%)"}>
          {tagText}
        </Badge>
      )}

      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        gap={3}
      >
        <Flex flexDirection={"column"} alignItems={"flex-start"} gap={1}>
          <Text fontSize={"xl"} fontWeight={"bold"} color="bg.900" lineHeight={"normal"}>
            {pricingPlan.title}
          </Text>

          <Text fontSize={"small"} color="bg.600" lineHeight={"normal"}>
            {billingText}
          </Text>
        </Flex>

        <Flex flexDirection={"column"} alignItems={"flex-end"}>
          <Text
            color="bg.900"
            textDecoration={"line-through"}
            lineHeight={"normal"}
            fontSize={"md"}
          >
            ${pricingPlan.dailyBefore}
          </Text>

          <Text fontSize={"3xl"} fontWeight={"bold"} lineHeight={"normal"} color="bg.900">
            ${pricingPlan.daily}
          </Text>

          <Text fontSize={"sm"} fontWeight={"bold"} lineHeight={"normal"} color="bg.900">
            per day
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Badge({ ...rest }: TextProps) {
  return (
    <Text
      py={"3px"}
      px={"15px"}
      backgroundColor="brand.600"
      color="black"
      fontWeight={"bold"}
      fontSize={"14px"}
      borderRadius={"5px"}
      {...rest}
    >
      Best value
    </Text>
  );
}
