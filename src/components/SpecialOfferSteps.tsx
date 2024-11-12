import {
  Grid,
  Stack,
  useSteps,
  Text,
  Box,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  Progress,
} from "@chakra-ui/react";

const steps = [{ title: "Skip Trial" }, { title: "Add Guides" }, { title: "Access Product" }];

export function SpecialOfferSteps({ activeStepIdx = 1 }: { activeStepIdx?: number }) {
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
        <Stepper size="sm" index={activeStep} gap="0" colorScheme="brand">
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
          colorScheme="brand"
        />
      </Box>
    </Stack>
  );
}
