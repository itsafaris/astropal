import { Box, Button, Container, Flex, Grid, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import React from "react";

import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";
import { FaCheck } from "react-icons/fa";
import { SpecialOfferBadge } from "@components/onboarding/SpecialOfferBadge";
import { navigate } from "gatsby";
import { createInternalURL, parseURLParams } from "@components/onboarding/utils";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { eden, Reports } from "@utils/coreApi";
import {
  gaTrackPaidTrialPurchaseConversion,
  trackPixelEvent,
  trackPosthogPurchaseEvent,
} from "@utils/tracking";
import { useStripe } from "@stripe/react-stripe-js";
import { sessionCache } from "src/sessionCache";
import { keyframes } from "@emotion/react";

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

const SKIP_OFFER_ID = "skip";

export default function Page() {
  const { reports } = useGlobalState2();
  const [request, submit] = usePayment();
  const [hasPurchasedReport, setHasPurchasedReport] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasPurchasedReport(sessionCache.hasPurchasedReport());
  }, []);

  React.useEffect(() => {
    const hasPurchasedTrial = sessionCache.hasPurchasedTrial();
    const urlParams = parseURLParams<{
      pricePaid: number;
      currency: string;
      paymentType: string;
      planID: string;
    }>(window.location.href);

    if (!hasPurchasedTrial) {
      const pricePaid = (urlParams.pricePaid ?? 0) / 100;

      trackPixelEvent("Purchase", {
        currency: urlParams.currency,
        value: pricePaid,
        paymentType: urlParams.paymentType,
        planID: urlParams.planID,
      });

      gaTrackPaidTrialPurchaseConversion({
        value: pricePaid,
        currency: urlParams.currency ?? "",
      });

      trackPosthogPurchaseEvent({
        name: "purchase",
        properties: {
          currency: urlParams.currency ?? undefined,
          value: pricePaid,
          paymentType: urlParams.paymentType ?? undefined,
          contentType: "trial",
          contentIDs: [urlParams.planID ?? ""],
        },
      });

      // There's a piece of code in the gatsby-browser file that tracks routes of the `face-reading` funnel
      // and automatically redirects users if it detects that they have purchased the product.
      // In this case, the purchase status is set to true before that route check occurs.
      // We want the opposite behavior to avoid automatic redirection when a user visits this page for the first time after a successful purchase.
      setTimeout(sessionCache.setPurchasedTrial, 0);
    }
  }, []);

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

  async function handlePurchase(report: Reports[0]) {
    await submit(report);

    sessionCache.setPurchasedReport();

    navigateToNextStep();
  }

  function navigateToNextStep() {
    const urlParams = parseURLParams<{
      currency: string;
      paymentType: string;
    }>(window.location.href);

    const url = createInternalURL("/face-reading/success-checkout/onboarding-reports-time", {
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
          <SpecialOfferSteps activeStepIdx={1} />

          {hasPurchasedReport ? (
            <StepCompletedView onContinue={navigateToNextStep} />
          ) : (
            <StepIncompletedView
              reports={reports}
              onSkip={handleSkip}
              onPurchase={handlePurchase}
              isPaymentLoading={request.state === "loading"}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

function StepCompletedView({ onContinue }: { onContinue: () => void }) {
  return (
    <Stack spacing={5}>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        🥰 You have successfully purchased the report
      </Text>

      <Button size={"lg"} py={7} colorScheme="brand" onClick={onContinue}>
        <Text fontSize={["sm", "md"]}>Continue</Text>
      </Button>
    </Stack>
  );
}

function StepIncompletedView({
  reports,
  onSkip,
  onPurchase,
  isPaymentLoading,
}: {
  reports: Reports;
  onSkip: () => void;
  onPurchase: (report: Reports[0]) => void;
  isPaymentLoading: boolean;
}) {
  const [selectedReportID, setSelectedReportID] = React.useState<string | undefined>();

  React.useEffect(() => {
    const id = reports[0]?.productID ?? undefined;
    setSelectedReportID(id);
  }, []);

  function handleSelect(id: string) {
    setSelectedReportID(id);
  }

  function handleCTAClick() {
    if (selectedReportID === SKIP_OFFER_ID) {
      onSkip();
      return;
    }

    const selectedReport = reports.find((it) => it.productID === selectedReportID);
    if (!selectedReport) {
      return;
    }

    onPurchase(selectedReport);
  }

  return (
    <Stack>
      <SpecialOfferBadge icon="🥰" title="Thank you!" text="Your order was successful!" />

      <Text mt={6} fontSize={"xl"} fontWeight={"bold"}>
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

        <SkipCard isSelected={selectedReportID === SKIP_OFFER_ID} onSelect={handleSelect} />
      </Stack>

      <Button
        isLoading={isPaymentLoading}
        size={"lg"}
        py={7}
        colorScheme="yellow"
        flexGrow={1}
        onClick={handleCTAClick}
        animation={selectedReportID === "skip" ? undefined : `${CTAPulse} 1.2s infinite`}
        mt={3}
      >
        <Text fontSize={["md", "md"]}>
          {selectedReportID === "skip" ? "Continue" : "Get My Report"}
        </Text>
      </Button>

      <Text my={3} color="gray.500" fontSize={"sm"}>
        *You will be charged for the add-on services or products selected at the time of purchase.
        This is non-recurring payment.
      </Text>
    </Stack>
  );
}

const CTAPulse = keyframes`
  0% {
    box-shadow: 0px 0px 0px 0px var(--chakra-colors-yellow-200);
  }
  50% {
    box-shadow: 0px 0px 0px 12px var(--chakra-colors-yellow-200);
  }
  100% {
    box-shadow: 0px 0px 0px 12px transparent;
  }
`;

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
    <Grid
      alignItems={"center"}
      gridTemplateColumns={"auto 3fr 1fr"}
      gap={2}
      p={3}
      borderRadius={"lg"}
      border={"2px"}
      borderColor={isSelected ? "brand.600" : "brand.200"}
      backgroundColor={isSelected ? "brand.200" : "white"}
      onClick={() => onSelect(report.productID)}
      cursor={"pointer"}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        width={"22px"}
        height={"22px"}
        borderRadius={"full"}
        backgroundColor={isSelected ? "brand.400" : "white"}
        border="2px solid"
        borderColor={isSelected ? "brand.400" : "brand.300"}
        flexShrink={0}
      >
        <Icon as={FaCheck} boxSize={3} color={"white"} />
      </Stack>

      <Stack spacing={0} alignItems={"flex-start"} flexGrow={1}>
        <Text
          textTransform={"uppercase"}
          fontSize={"sm"}
          fontWeight={"bold"}
          color={"black"}
          textAlign={"left"}
        >
          {report.title}
        </Text>

        {report.features.length > 0 && (
          <Stack spacing={0} mt={1}>
            {report.features.map((feature, idx) => (
              <Text key={idx} fontSize={"xs"} color={"gray.800"} textAlign={"left"}>
                • {feature}
              </Text>
            ))}
          </Stack>
        )}

        <Grid alignItems={"center"} gridTemplateColumns={"1fr 1fr"} gap={2} mt={1}>
          <Flex alignItems={"center"} gap={1} width={["105px", "120px"]}>
            <Text
              fontSize={["xs", "sm"]}
              color={"gray.600"}
              textAlign={"left"}
              fontWeight={"semibold"}
            >
              ${(report.unit_amount / 100).toFixed(2)}
            </Text>

            {report.unit_amount_before && (
              <Text fontSize={["xs", "sm"]} color={"gray.600"}>
                (
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
            color={"white"}
            backgroundColor={"red.300"}
            px={1}
            py={1}
            borderRadius={"lg"}
          >
            -{report.discount_label}
          </Text>
        </Grid>
      </Stack>

      {report.imageUrl && (
        <Image flexGrow={0} flexShrink={0} src={report.imageUrl} maxH={"70px"} mx="auto" />
      )}
    </Grid>
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
      borderColor={isSelected ? "brand.600" : "brand.200"}
      backgroundColor={isSelected ? "brand.200" : "white"}
      onClick={() => onSelect(SKIP_OFFER_ID)}
      cursor={"pointer"}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        width={"22px"}
        height={"22px"}
        borderRadius={"full"}
        backgroundColor={isSelected ? "brand.400" : "white"}
        border="2px solid"
        borderColor={isSelected ? "brand.400" : "brand.300"}
        flexShrink={0}
      >
        <Icon as={FaCheck} boxSize={3} color={"white"} />
      </Stack>

      <Stack spacing={0} alignItems={"flex-start"} flexGrow={1}>
        <Text
          textTransform={"uppercase"}
          fontSize={"sm"}
          fontWeight={"bold"}
          color={"black"}
          textAlign={"left"}
        >
          Skip offer
        </Text>

        <Flex alignItems={"center"} gap={2} fontWeight={"semibold"} mt={1}>
          <Flex alignItems={"center"} gap={1} fontWeight={"semibold"} width={["105px", "120px"]}>
            <Text fontSize={["xs", "sm"]} color={"gray.600"} textAlign={"left"}>
              You are missing out on all reports
            </Text>
          </Flex>

          <Text
            fontSize={"sm"}
            fontWeight={"semibold"}
            color={"gray.700"}
            backgroundColor={"gray.200"}
            px={2}
            py={1}
            borderRadius={"lg"}
          >
            100% LOST
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
}

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
