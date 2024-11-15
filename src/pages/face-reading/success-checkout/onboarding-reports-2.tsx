import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

import { SpecialOfferSteps } from "@components/onboarding/SpecialOfferSteps";
import { SpecialOfferBadge } from "@components/onboarding/SpecialOfferBadge";
import { navigate } from "gatsby";
import { createInternalURL, parseURLParams } from "@components/onboarding/utils";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import React from "react";
import { trackPosthogPurchaseEvent } from "@utils/tracking";
import { eden, Reports } from "@utils/coreApi";
import { useStripe } from "@stripe/react-stripe-js";
import { sessionCache } from "src/sessionCache";

export default function OnboardingGuides2() {
  const { reports } = useGlobalState2();
  const [request, submit] = usePayment();
  const premiumPack = reports.find((it) => it.title === "Premium pack");

  React.useEffect(() => {
    if (!premiumPack) {
      navigateToNextStep();
    }
  }, [premiumPack]);

  async function handlePurchase() {
    //TODO: handle properly
    if (!premiumPack) {
      return;
    }

    await submit(premiumPack);

    sessionCache.setPurchasedReport();

    navigateToNextStep();
  }

  function handleSkip() {
    navigateToNextStep();
  }

  function navigateToNextStep() {
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

  if (!premiumPack) {
    return null;
  }

  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={2} />

          {sessionCache.hasPurchasedReport() ? (
            <Stack spacing={5}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                🥰 You have successfully purchased the report
              </Text>

              <Button size={"lg"} py={7} colorScheme="brand" onClick={navigateToNextStep}>
                <Text fontSize={["sm", "md"]}>Continue</Text>
              </Button>
            </Stack>
          ) : (
            <Stack spacing={6}>
              <SpecialOfferBadge
                icon="📣"
                title="Caution!"
                text="To prevent double charges please don't close the page and don't go back."
              />

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
                  {premiumPack.features.map((it, idx) => {
                    return (
                      <Text
                        mx="auto"
                        key={idx}
                        fontWeight={"semibold"}
                        color={"brand.600"}
                        backgroundColor={"brand.100"}
                        py={2}
                        px={4}
                        borderRadius={"md"}
                      >
                        {it}
                      </Text>
                    );
                  })}
                </Stack>
              </Stack>

              <Stack spacing={3}>
                <Box height={"2px"} width={"full"} backgroundColor={"gray.200"} />
                <Text fontSize={"sm"} color={"gray.900"}>
                  One-time price of{" "}
                  <Text as="span" textDecoration={"line-through"}>
                    ${(premiumPack.unit_amount_before / 100).toFixed(2)}
                  </Text>{" "}
                  ${(premiumPack.unit_amount / 100).toFixed(2)}! {premiumPack.discount_label}!
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
                    isLoading={request.state === "loading"}
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
          )}
        </Stack>
      </Container>
    </Box>
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
