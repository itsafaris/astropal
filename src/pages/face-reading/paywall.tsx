import { Box, Button, Container, Flex, Grid, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import { useGlobalState2, useGlobalUpdate2 } from "@components/wrappers/RootWrapper";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { sortBy } from "lodash";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { HiOutlineShieldCheck } from "react-icons/hi";

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

      <Container
        maxW="440px"
        as={Flex}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading mt={10} fontSize={"xl"} textAlign={"center"} mb={4}>
          <Text as="span" color={"brand.500"}>
            Try {meta.brandName}
          </Text>{" "}
          for 1 week
        </Heading>

        <Text fontSize={"sm"} mb={4}>
          YOUR SATISFACTION MATTERS TO US
        </Text>

        <Text fontSize={"sm"} textAlign={"center"} mb={7}>
          We've helped millions of people to{" "}
          <Text as="span" fontWeight={"bold"}>
            understand their career, love and destiny
          </Text>
          , and we want to help you too.
        </Text>

        <Grid
          gap={2}
          gridTemplateColumns={"repeat(4, 1fr)"}
          width={"full"}
          alignItems={"flex-end"}
          mb={2}
        >
          {donationPrices.map((price, idx, arr) => {
            const hasBadge = arr.length - 1 === idx;

            return (
              <Stack spacing={0}>
                {hasBadge && (
                  <Text
                    fontSize={"xs"}
                    textAlign={"center"}
                    color={"brand.500"}
                    fontWeight={"semibold"}
                  >
                    Most Popular
                  </Text>
                )}

                <Button
                  key={price.priceID}
                  py={6}
                  px={0}
                  variant={"solid"}
                  backgroundColor={"gray.100"}
                  _active={{ backgroundColor: "gray.100" }}
                  _hover={{ backgroundColor: "gray.100" }}
                  fontWeight={"semibold"}
                  borderWidth={2}
                  borderColor={
                    globalState.selectedPricingPlan === price.priceID ? "brand.600" : "gray.100"
                  }
                  onClick={() => {
                    updateState((s) => ({ ...s, selectedPricingPlan: price.priceID }));
                  }}
                >
                  ${(price.unit_amount / 100).toFixed(2)}
                </Button>
              </Stack>
            );
          })}
        </Grid>

        <Flex alignItems={"flex-start"} gap={3} mb={4}>
          <Text fontSize={"xs"} textAlign={"left"} color={"gray.500"}>
            It costs us ${compensationPrice?.unit_amount / 100} to compensate our {meta.brandName}{" "}
            employees for the trial, but please choose the amount you are comfortable with.
          </Text>

          <StaticImage
            alt=""
            src="../../images/arrow-paywall.jpg"
            // placeholder="none"
            style={{ width: 30, marginRight: "10%", flexShrink: 0 }}
            width={30}
          />
        </Flex>

        <Button
          width={"full"}
          colorScheme="brand"
          onClick={() => navigate("/face-reading/summary")}
          py={7}
          size={"lg"}
          mb={4}
        >
          See My Face Reading <Icon as={FaArrowRight} ml={2} />
        </Button>

        <Grid gridTemplateColumns={"1fr 1fr"} gap={2} width={"full"}>
          <Flex
            alignItems={"center"}
            gap={2}
            backgroundColor={"brand.50"}
            py={2}
            borderRadius={"md"}
            justifyContent={"center"}
          >
            <Icon as={MdOutlinePeopleAlt} boxSize={5} />
            <Text fontSize={"10px"}>776 people joined today</Text>
          </Flex>

          <Flex
            alignItems={"center"}
            gap={2}
            backgroundColor={"brand.50"}
            py={2}
            px={2}
            borderRadius={"md"}
            justifyContent={"center"}
          >
            <Icon as={HiOutlineShieldCheck} boxSize={5} />
            <Text fontSize={"10px"}>You won't be charged right now. Proceed to find out more.</Text>
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
}
