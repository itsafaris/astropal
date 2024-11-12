import { Flex, Stack, Text } from "@chakra-ui/react";

export function SpecialOfferCaution() {
  return (
    <Flex
      backgroundColor="blue.100"
      px={3}
      py={3}
      gap={2}
      borderRadius={"lg"}
      alignItems={"center"}
    >
      <Text fontSize={"3xl"}>📣</Text>

      <Stack fontSize={"sm"} textAlign={"left"} lineHeight={1.3} spacing={0}>
        <Text fontWeight={"bold"}>Caution!</Text>
        <Text>To prevent double charges please don't close the page and don't go back.</Text>
      </Stack>
    </Flex>
  );
}
