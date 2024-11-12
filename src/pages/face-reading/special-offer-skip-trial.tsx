import {
  Box,
  Button,
  Container,
  Grid,
  Progress,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  Stepper,
  StepStatus,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

export default function SpecialOfferSkipTrial() {
  return (
    <Box>
      <TopNavigation />

      <Container pb={10} pt={3}>
        <Stack textAlign={"center"} spacing={6}>
          <SpecialOfferSteps activeStepIdx={1} />

          <Text fontSize={"xl"} fontWeight={"bold"}>
            Not planning on looking back?
          </Text>

          <Grid gridTemplateColumns={"1fr 1fr"} gap={2} alignItems={"flex-end"}>
            <Card />
            <CardSpecial />
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

function Card() {
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

      <Button size={"lg"} py={7}>
        <Text fontSize={["sm", "md"]}>Start trial</Text>
      </Button>
    </Stack>
  );
}

function CardSpecial() {
  return (
    <Stack
      border={"2px solid"}
      borderColor={"blue.500"}
      borderRadius={"xl"}
      spacing={0}
      fontSize={["sm", "md"]}
      overflow={"hidden"}
    >
      <Box backgroundColor={"blue.500"} py={3}>
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

        <Button size={"lg"} py={7} colorScheme="blue">
          <Text fontSize={["sm", "md"]}>
            Skip trial <br />
            and accept offer
          </Text>
        </Button>
      </Stack>
    </Stack>
  );
}

const steps = [{ title: "Skip Trial" }, { title: "Add Guides" }, { title: "Access Product" }];

function SpecialOfferSteps({ activeStepIdx = 1 }: { activeStepIdx?: number }) {
  const { activeStep } = useSteps({
    index: activeStepIdx,
    count: steps.length,
  });

  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;

  return (
    <Stack>
      <Grid
        gridTemplateColumns={"repeat(3, 1fr)"}
        alignItems={"center"}
        fontSize={"xs"}
        fontWeight={"semibold"}
      >
        <Text mr={"auto"}>{steps[0].title}</Text>
        <Text mx="auto">{steps[1].title}</Text>
        <Text ml={"auto"}>{steps[2].title}</Text>
      </Grid>

      <Box position="relative">
        <Stepper size="sm" index={activeStep} gap="0">
          {steps.map((_, index) => (
            <Step key={index} gap="0">
              <StepIndicator bg="white">
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
            </Step>
          ))}
        </Stepper>

        <Progress
          value={progressPercent}
          position="absolute"
          height="3px"
          width="full"
          top="10px"
          zIndex={-1}
        />
      </Box>
    </Stack>
  );
}
