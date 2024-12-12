import { Box, Button, Stack, Text, Image, Grid } from "@chakra-ui/react";
import {
  useOnboardingRouter,
  CTAPulse,
  SuccessfulPurchaseView,
  OnboardingLayout,
} from "@components/onboarding";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import React from "react";
import { Reports } from "@utils/coreApi";
import { sessionCache } from "src/sessionCache";

export default function Page() {
  const { reports } = useGlobalState2();
  const { navigateToNextPage } = useOnboardingRouter();
  const [hasPurchasedReport, setHasPurchasedReport] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasPurchasedReport(sessionCache.getReport().status === "purchase-finalized");
  }, []);

  const report = reports.find((it) => it.title === "Premium pack");
  if (!report) {
    return null;
  }

  return (
    <OnboardingLayout activeStepIdx={2}>
      {hasPurchasedReport ? (
        <SuccessfulPurchaseView
          title="🥰 You have successfully purchased the report"
          onContinue={navigateToNextPage}
        />
      ) : (
        <Content
          report={report}
          onSkip={() => {
            sessionCache.setReport({ status: "initial" });
            navigateToNextPage();
          }}
          onPurchase={(it) => {
            sessionCache.setReport({ status: "purchase-started", productID: it.productID });
            navigateToNextPage();
          }}
        />
      )}
    </OnboardingLayout>
  );
}

function Content({
  report,
  onSkip,
  onPurchase,
}: {
  report: Reports[0];
  onSkip: () => void;
  onPurchase: (report: Reports[0]) => void;
}) {
  return (
    <Stack spacing={6}>
      <Stack>
        <Text fontSize={"2xl"} fontWeight={"bold"} color="brand.800">
          Final Sign-up Offer
        </Text>

        <Text fontSize={"sm"} mb={4}>
          Unlock your future potential with our Premium Bundle. Make informed decisions and seize
          opportunities!
        </Text>

        <Text fontSize={"lg"} fontWeight={"semibold"}>
          What you get:
        </Text>
      </Stack>

      <Grid
        gridTemplateColumns={"1fr 130px"}
        gap={4}
        alignItems={"center"}
        backgroundColor={"brand.50"}
        borderRadius={"md"}
        px={3}
        py={2}
      >
        <Stack alignItems={"flex-start"} backgroundColor={"brand.200"} spacing={"2px"}>
          {report.features.map((it, idx) => {
            return (
              <Text
                py={2}
                backgroundColor={"brand.50"}
                mx="auto"
                key={idx}
                fontWeight={"semibold"}
                fontSize={["sm", "md"]}
                color={"brand.600"}
                textAlign={"left"}
                width={"100%"}
              >
                {it}
              </Text>
            );
          })}
        </Stack>

        {report.imageUrl && (
          <Image flexGrow={0} flexShrink={0} src={report.imageUrl} maxH={"100px"} mx="auto" />
        )}
      </Grid>

      <Stack spacing={3}>
        <Box height={"2px"} width={"full"} backgroundColor={"gray.200"} />
        <Text fontSize={"sm"} color={"gray.900"}>
          One-time price of{" "}
          <Text as="span" textDecoration={"line-through"}>
            ${(report.unit_amount_before / 100).toFixed(2)}
          </Text>{" "}
          ${(report.unit_amount / 100).toFixed(2)}! {report.discount_label}!
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
            onClick={() => onPurchase(report)}
            animation={`${CTAPulse} 1.2s infinite`}
          >
            <Text fontSize={["md"]}>Get Extra Reports</Text>
          </Button>

          <Button
            variant={"ghost"}
            size={"lg"}
            py={7}
            onClick={onSkip}
            width={"full"}
            fontWeight={"normal"}
          >
            <Text fontSize={["sm", "md"]} color={"gray.600"}>
              Skip this offer and proceed further
            </Text>
          </Button>

          <Text my={3} color="gray.500" fontSize={"sm"}>
            *You will be charged for the add-on services or products selected at the time of
            purchase. This is non-recurring payment.
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
