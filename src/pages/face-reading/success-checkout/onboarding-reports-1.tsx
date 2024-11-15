import { Box, Button, Container, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import React from "react";

import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";
import { FaCheck } from "react-icons/fa";
import { SpecialOfferBadge } from "@components/onboarding/SpecialOfferBadge";
import { navigate } from "gatsby";
import { createInternalURL, parseURLParams } from "@components/onboarding/utils";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { eden, Reports } from "@utils/coreApi";
import { trackPosthogPurchaseEvent } from "@utils/tracking";
import { useStripe } from "@stripe/react-stripe-js";

const SKIP_CARD_ID = "skip";

export default function OnboardingReports1() {
  const { reports } = useGlobalState2();
  const [selectedReportID, setSelectedReportID] = React.useState<string | undefined>();
  const [request, submit] = usePayment();

  React.useEffect(() => {
    const id = reports[0].productID ?? undefined;
    setSelectedReportID(id);
  }, []);

  function handleCTAClick() {
    if (selectedReportID === SKIP_CARD_ID) {
      handleSkip();
    } else {
      handlePurchase();
    }
  }

  async function handlePurchase() {
    const report = reports.find((it) => it.productID === selectedReportID);
    if (!report) {
      return;
    }

    await submit(report);

    const urlParams = parseURLParams<{
      currency: string;
      paymentType: string;
    }>(window.location.href);

    const url = createInternalURL("/face-reading/success-checkout/onboarding-product", {
      paymentType: urlParams.paymentType,
      currency: urlParams.currency,
    });

    navigate(url);
  }

  function handleSkip() {
    const urlParams = parseURLParams<{
      currency: string;
      paymentType: string;
    }>(window.location.href);

    const url = createInternalURL("/face-reading/success-checkout/onboarding-reports-2", {
      paymentType: urlParams.paymentType,
      currency: urlParams.currency,
    });

    navigate(url);
  }

  function handleSelect(id: string) {
    setSelectedReportID(id);
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
              {reports
                .filter((it) => it.title !== "Premium pack")
                .map((it) => {
                  const isSelected = it.productID === selectedReportID;

                  return (
                    <ReportCard
                      key={it.productID}
                      report={it}
                      isSelected={isSelected}
                      onSelect={handleSelect}
                    />
                  );
                })}

              <SkipCard isSelected={selectedReportID === SKIP_CARD_ID} onSelect={handleSelect} />
            </Stack>

            <Text my={3} color="gray.500" fontSize={"sm"}>
              *You will be charged for the add-on services or products selected at the time of
              purchase. This is non-recurring payment.
            </Text>

            <Button
              isLoading={request.state === "loading"}
              size={"lg"}
              py={7}
              colorScheme="brand"
              flexGrow={1}
              onClick={handleCTAClick}
            >
              <Text fontSize={["sm", "md"]}>
                {selectedReportID === "skip" ? "Continue" : "Get my copy"}{" "}
              </Text>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function ReportCard({
  isSelected,
  report,
  onSelect,
}: {
  isSelected: boolean;
  report: Reports[0];
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
      onClick={() => onSelect(report.productID)}
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
          {report.title}
        </Text>

        {report.description && (
          <Text fontSize={"xs"} color={isSelected ? "white" : "gray.600"} textAlign={"left"}>
            {report.description}
          </Text>
        )}

        <Flex alignItems={"center"} gap={2} fontWeight={"semibold"} mt={1}>
          <Flex alignItems={"center"} gap={1} fontWeight={"semibold"} width={"135px"}>
            <Text
              fontSize={["xs", "sm"]}
              color={isSelected ? "white" : "gray.600"}
              textAlign={"left"}
            >
              ${(report.unit_amount / 100).toFixed(2)}
            </Text>

            {report.unit_amount_before && (
              <Text fontSize={"xs"} color={isSelected ? "whiteAlpha.700" : "gray.500"}>
                (was{" "}
                <Text as="span" textDecoration={"line-through"}>
                  ${(report.unit_amount_before / 100).toFixed(2)}
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
            {report.discount_label}
          </Text>
        </Flex>
      </Stack>

      <Text fontSize={"2xl"}>{report.emoji}</Text>
    </Flex>
  );
}

function SkipCard({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
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
      onClick={() => onSelect(SKIP_CARD_ID)}
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
          Skip offer
        </Text>

        <Flex alignItems={"center"} gap={2} fontWeight={"semibold"} mt={1}>
          <Flex alignItems={"center"} gap={1} fontWeight={"semibold"} width={"135px"}>
            <Text
              fontSize={["xs", "sm"]}
              color={isSelected ? "white" : "gray.600"}
              textAlign={"left"}
            >
              You are missing out on both readings
            </Text>
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
            100% LOST
          </Text>
        </Flex>
      </Stack>

      <Text fontSize={"2xl"}>➡️</Text>
    </Flex>
  );
}

export type RequestType =
  | {
      state: "initial";
    }
  | {
      state: "loading";
    }
  | {
      state: "ok";
    }
  | {
      state: "error";
      error: string;
    };

function usePayment(): [RequestType, (report: Reports[0]) => Promise<void>] {
  const { userProfile } = useGlobalState2();
  const stripe = useStripe();

  const [request, setRequest] = React.useState<RequestType>({
    state: "initial",
  });

  async function submit(report: Reports[0]) {
    if (!userProfile || !stripe) {
      console.warn("data missing for report purchase setup");
      return;
    }

    if (request.state !== "initial") {
      return;
    }

    setRequest({ state: "loading" });

    try {
      const payment = await eden("/payments/createOneTimePayment", {
        method: "POST",
        body: {
          userID: userProfile.id,
          productID: report.productID,
        },
      });

      if (payment.error) {
        setRequest({
          state: "error",
          error: payment.error.message,
        });

        return;
      }

      const urlParams = parseURLParams<{
        pricePaid: number;
        currency: string;
        paymentType: string;
        planID: string;
      }>(window.location.href);

      trackPosthogPurchaseEvent({
        name: "purchase",
        properties: {
          currency: urlParams.currency ?? undefined,
          value: report.unit_amount / 100,
          paymentType: urlParams.paymentType ?? undefined,
          contentType: "one-time",
          contentIDs: [report.productID],
        },
      });

      setRequest({ state: "ok" });
    } catch (err) {
      console.error(err);
      setRequest({ state: "error", error: String(err) });
    }
  }

  return [request, submit];
}
