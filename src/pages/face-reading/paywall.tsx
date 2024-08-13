import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useGlobalState2, useGlobalUpdate2 } from "@components/root/RootWrapper";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { donationPricingPlans } from "@utils/pricingPlans";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

export interface IPaywallPageProps {}

export default function PaywallPage(props: IPaywallPageProps) {
  const meta = useSiteMetadata();
  const globalState = useGlobalState2();
  const updateState = useGlobalUpdate2();

  return (
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
        {donationPricingPlans.map((plan) => {
          return (
            <Button
              key={plan.price}
              size="lg"
              px={2}
              variant={"outline"}
              borderWidth={2}
              borderColor={globalState.selectedPricingPlan === plan.id ? "brand.600" : "gray.300"}
              onClick={() => {
                updateState((s) => ({ ...s, selectedPricingPlan: plan.id }));
              }}
            >
              ${plan.price.toFixed(2)}
            </Button>
          );
        })}
      </Flex>
      <Text fontSize={"sm"} fontWeight={"bold"} textAlign={"center"}>
        It costs us €13.21 to compensate our Hint employees for the trial, but please choose the
        amount you are comfortable with.
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
  );
}
