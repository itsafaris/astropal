import { Flex, Stack, Text } from "@chakra-ui/react";

export function SpecialOfferBadge({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <Flex
      backgroundColor="blue.100"
      px={3}
      py={3}
      gap={2}
      borderRadius={"lg"}
      alignItems={"center"}
    >
      <Text fontSize={"3xl"}>{icon}</Text>

      <Stack fontSize={"sm"} textAlign={"left"} lineHeight={1.3} spacing={0}>
        <Text fontWeight={"bold"}>{title}</Text>
        <Text>{text}</Text>
      </Stack>
    </Flex>
  );
}
