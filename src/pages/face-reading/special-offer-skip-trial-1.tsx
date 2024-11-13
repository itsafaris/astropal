import { Box, Button, Container, Grid, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";
import { SpecialOfferSteps } from "@components/SpecialOfferSteps";
import { navigate } from "gatsby";
import { SpecialOfferBadge } from "@components/SpecialOfferBadge";

export default function SpecialOfferSkipTrial1() {
  function handlePurchase() {
    //TODO: handle properly
    navigate("/face-reading/special-offer-guides-1");
  }

  function handleSkip() {
    navigate("/face-reading/special-offer-skip-trial-2");
  }

  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={1} />

          <Stack spacing={5}>
            <SpecialOfferBadge icon="🥰" title="Thank you!" text="Your order was successful!" />

            <Text fontSize={"xl"} fontWeight={"bold"}>
              Not planning on looking back?
            </Text>

            <Grid gridTemplateColumns={"1fr 1fr"} gap={2} alignItems={"flex-end"}>
              <Card onSelect={handleSkip} />
              <CardSpecial onSelect={handlePurchase} />
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function Card({ onSelect }: { onSelect: () => void }) {
  return (
    <Stack
      p={3}
      pt={5}
      border={"2px solid"}
      borderColor={"gray.300"}
      borderRadius={"xl"}
      spacing={3}
      fontSize={["sm", "md"]}
    >
      <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
        $19 per week
      </Text>

      <Stack spacing={0}>
        <Text>Billing period</Text>
        <Text color="gray.500">Every week</Text>
      </Stack>

      <Stack spacing={0}>
        <Text>Billed amount</Text>
        <Text color="gray.500">$19</Text>
      </Stack>

      <Stack spacing={0}>
        <Text>Billed in 4 weeks</Text>
        <Text color="gray.500">$76</Text>
      </Stack>

      <Button size={"lg"} py={7} onClick={onSelect}>
        <Text fontSize={["sm", "md"]}>Start trial</Text>
      </Button>
    </Stack>
  );
}

function CardSpecial({ onSelect }: { onSelect: () => void }) {
  return (
    <Stack
      border={"2px solid"}
      borderColor={"brand.500"}
      borderRadius={"xl"}
      spacing={0}
      fontSize={["sm", "md"]}
      overflow={"hidden"}
    >
      <Box backgroundColor={"brand.500"} py={3}>
        <Text textAlign={"center"} color={"white"} fontWeight={"semibold"}>
          BEST VALUE 🎉
        </Text>
      </Box>

      <Stack p={3} pt={5} spacing={3}>
        <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
          $2.46 per day
        </Text>

        <Stack spacing={0}>
          <Text>Billing period</Text>
          <Text color="gray.500">Every 4 weeks</Text>
        </Stack>

        <Stack spacing={0}>
          <Text>Billed amount</Text>
          <Text color="gray.500">$69</Text>
        </Stack>

        <Stack spacing={0}>
          <Text>Billed in 4 weeks</Text>
          <Text color="gray.500">$69</Text>
        </Stack>

        <Button size={"lg"} py={7} colorScheme="brand" onClick={onSelect}>
          <Text fontSize={["sm", "md"]}>
            Skip trial <br />
            and accept offer
          </Text>
        </Button>
      </Stack>
    </Stack>
  );
}
