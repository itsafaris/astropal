import { Flex, Stack, Text } from "@chakra-ui/react";

import { Timer } from "@components/timer";

export function SpecialOfferBanner() {
  return (
    <Flex
      id="special-offer"
      px={{ base: 2 }}
      py={{ base: 4 }}
      background="linear-gradient(10deg, #ffbf00, #ffee54)"
      width="full"
      alignItems={"center"}
      justifyContent={"center"}
      shadow="lg"
    >
      <Stack direction="row" alignItems={"center"} spacing={4}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          fontSize={"lg"}
          as="span"
          textAlign={"center"}
          color="black"
          fontWeight={"semibold"}
        >
          <Text>Offer expires in:</Text>
        </Flex>
        <Timer />
      </Stack>
    </Flex>
  );
}
