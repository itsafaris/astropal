import { Progress, Stack, Text } from "@chakra-ui/react";

export function ErrorView({ text }: { text: string }) {
  return (
    <Text
      color={"red.600"}
      mb={3}
      fontSize={"sm"}
      fontWeight={"semibold"}
      py={1}
      px={3}
      borderRadius={"lg"}
      backgroundColor={"#ffdad3"}
    >
      {text}
    </Text>
  );
}

export function LoadingView({ text = "Loading..." }: { text?: string }) {
  return (
    <Stack mt={2}>
      <Text color="gray.700" fontSize={"sm"} textAlign={"center"}>
        {text}
      </Text>
      <Progress size="lg" isIndeterminate />
    </Stack>
  );
}
