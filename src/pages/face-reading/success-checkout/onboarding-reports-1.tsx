import { Button, Flex, Grid, Icon, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  SuccessfulPurchaseView,
  OnboardingLayout,
  useOnboardingRouter,
} from "@components/onboarding";
import { FaCheck } from "react-icons/fa";
import { useRootState } from "@components/wrappers/RootWrapper";
import { Reports } from "@utils/coreApi";
import { storage } from "@components/wrappers/successCheckoutStorage";

const SKIP_OFFER_ID = "skip";

export default function Page() {
  const { reports } = useRootState();
  const { navigateToNextPage } = useOnboardingRouter();
  const [hasPurchased, setHasPurchased] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasPurchased(storage.getReport().status === "purchase-finalized");
  }, []);

  return (
    <OnboardingLayout activeStepIdx={2}>
      {hasPurchased ? (
        <SuccessfulPurchaseView
          title="🥰 You have successfully purchased the report"
          onContinue={navigateToNextPage}
        />
      ) : (
        <Content
          reports={reports}
          onSkip={() => {
            storage.setReport({ status: "initial" });
            navigateToNextPage();
          }}
          onPurchase={(it) => {
            storage.setReport({ status: "purchase-started", productID: it.productID });
            navigateToNextPage();
          }}
        />
      )}
    </OnboardingLayout>
  );
}

function Content({
  reports,
  onSkip,
  onPurchase,
}: {
  reports: Reports;
  onSkip: () => void;
  onPurchase: (report: Reports[0]) => void;
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
      <Text mt={6} fontSize={"xl"} fontWeight={"bold"}>
        Choose Your Sign-up Offer 🔥
      </Text>

      <Text fontSize={"sm"} fontWeight={"semibold"} color={"brand.600"}>
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

      <Button size={"lg"} py={7} colorScheme="brand" flexGrow={1} onClick={handleCTAClick} mt={3}>
        <Text fontSize={["md", "md"]}>
          {selectedReportID === "skip" ? "Continue" : "Get My Copy"}
        </Text>
      </Button>

      <Text my={3} color="gray.500" fontSize={"sm"}>
        *You will be charged for the add-on services or products selected at the time of purchase.
        This is non-recurring payment.
      </Text>
    </Stack>
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
    <Grid
      alignItems={"center"}
      gridTemplateColumns={"auto 3fr 1fr"}
      gap={2}
      p={3}
      borderRadius={"lg"}
      border={"2px"}
      borderColor={isSelected ? "brand.600" : "brand.300"}
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
              color={"gray.500"}
              textAlign={"left"}
              fontWeight={"semibold"}
            >
              ${(report.unit_amount / 100).toFixed(2)}
            </Text>

            {report.unit_amount_before && (
              <Text fontSize={["xs", "sm"]} color={"gray.500"}>
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
            backgroundColor={"brand.400"}
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
    <Grid
      alignItems={"center"}
      gridTemplateColumns={"auto 3fr 1fr"}
      gap={2}
      p={3}
      borderRadius={"lg"}
      border={"2px"}
      borderColor={isSelected ? "brand.600" : "brand.300"}
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

        <Grid alignItems={"center"} gridTemplateColumns={"1fr 1fr"} gap={2} mt={1}>
          <Flex alignItems={"center"} gap={1} width={["105px", "120px"]}>
            <Text
              fontSize={["xs", "sm"]}
              color={"gray.500"}
              textAlign={"left"}
              fontWeight={"semibold"}
            >
              You are missing out on all reports
            </Text>
          </Flex>

          <Text
            fontSize={"sm"}
            fontWeight={"semibold"}
            color={"white"}
            backgroundColor={"brand.400"}
            px={1}
            py={1}
            borderRadius={"lg"}
          >
            100% LOST
          </Text>
        </Grid>
      </Stack>
    </Grid>
  );
}
