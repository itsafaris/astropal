import {
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

const steps = [
  { title: "Welcome" },
  { title: "Add Reports" },
  { title: "Skip Trial" },
  { title: "Access Product" },
];

export function OnboardingProgress({ activeStepIdx = 1 }: { activeStepIdx?: number }) {
  const { activeStep } = useSteps({
    index: activeStepIdx,
    count: steps.length,
  });

  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;

  return (
    <Stack>
      <Box position="relative" mt={"40px"}>
        <Stepper size="sm" index={activeStep} gap="0" colorScheme="brand">
          {steps.map((_, index) => (
            <Stack
              key={index}
              position={"relative"}
              alignItems={
                index === 0 ? "flex-start" : index === steps.length - 1 ? "flex-end" : "center"
              }
            >
              <Text
                position={"absolute"}
                fontSize={"xs"}
                fontWeight={"semibold"}
                textAlign={"center"}
                top={"-40px"}
              >
                {steps[index].title}
              </Text>

              <Step gap="0">
                <StepIndicator bg="white">
                  <StepStatus complete={<StepIcon />} />
                </StepIndicator>
              </Step>
            </Stack>
          ))}
        </Stepper>

        <Progress
          value={progressPercent}
          position="absolute"
          height="3px"
          width="full"
          bottom="10px"
          zIndex={-1}
          colorScheme="brand"
        />
      </Box>
    </Stack>
  );
}
