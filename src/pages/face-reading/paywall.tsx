import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import { useGlobalState2, useGlobalUpdate2 } from "@components/wrappers/RootWrapper";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { sortBy } from "lodash";

export interface IPaywallPageProps {}

export default function PaywallPage(props: IPaywallPageProps) {
  const meta = useSiteMetadata();
  const globalState = useGlobalState2();
  const updateState = useGlobalUpdate2();

  const trialPricingPlan = globalState.trialPricingPlan?.oneTimeFee ?? [];
  const donationPrices = sortBy([...trialPricingPlan], (it) => it.unit_amount, "desc");
  const compensationPrice = donationPrices[donationPrices.length - 1];

  return (
    <Box>
      <TopNavigation />

      <Container as={Flex} direction={"column"} alignItems={"center"} justifyContent={"center"}>
        <Heading mt={8} mb={8} fontSize={"xl"} textAlign={"center"}>
          Try {meta.brandName} for 1 week
        </Heading>
        <Text fontSize={"lg"} textAlign={"center"}>
          Join millions who have unlocked the secrets of their future in love, life, and family with
          our personalized face readings.
        </Text>
        <Box my={4}>
          <StaticImage
            alt="shooting star icon"
            src="../../images/shooting-star.png"
            placeholder="none"
            style={{ width: 160, margin: "0 auto" }}
            width={160}
          />
        </Box>

        <Flex gap={2} my={8}>
          {donationPrices.map((price) => {
            return (
              <Button
                key={price.priceID}
                size="lg"
                px={2}
                variant={"outline"}
                borderWidth={2}
                borderColor={
                  globalState.selectedPricingPlan === price.priceID ? "brand.600" : "gray.300"
                }
                onClick={() => {
                  updateState((s) => ({ ...s, selectedPricingPlan: price.priceID }));
                }}
              >
                ${(price.unit_amount / 100).toFixed(2)}
              </Button>
            );
          })}
        </Flex>
        <Text fontSize={"sm"} fontWeight={"bold"} textAlign={"center"}>
          It costs us ${compensationPrice?.unit_amount / 100} to compensate our {meta.brandName}{" "}
          employees for the trial, but please choose the amount you are comfortable with.
        </Text>

        <Button
          width={"full"}
          colorScheme="brand"
          mt={4}
          onClick={() => navigate("/face-reading/summary")}
        >
          Continue
        </Button>
      </Container>
    </Box>
  );
}
