import { Button, Stack, Text } from "@chakra-ui/react";

export function SuccessfulPurchaseView({
  title,
  onContinue,
}: {
  title: string;
  onContinue: () => void;
}) {
  return (
    <Stack spacing={5}>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        {title}
      </Text>

      <Button size={"lg"} py={7} colorScheme="brand" onClick={onContinue}>
        <Text fontSize={["sm", "md"]}>Continue</Text>
      </Button>
    </Stack>
  );
}
