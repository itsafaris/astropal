import { Flex, FlexProps, Stack, Text } from "@chakra-ui/react";

import { Timer } from "@components/timer";

export function SpecialOfferBanner(props: FlexProps) {
  return (
    <Flex
      id="special-offer"
      px={2}
      py={4}
      background="linear-gradient(10deg, #ffbf00, #ffee54)"
      width="full"
      alignItems={"center"}
      justifyContent={"center"}
      shadow="lg"
      {...props}
    >
      <Stack direction={{ base: "row", md: "row" }} alignItems={"center"} spacing={4}>
        <Flex
          direction={"column"}
          alignItems={"center"}
          fontSize={"sm"}
          as="span"
          textAlign={"center"}
          color="black"
          fontWeight={"semibold"}
        >
          <Text>
            🔥{" "}
            <Text
              as="span"
              color="white"
              backgroundColor={"#fd5555"}
              borderRadius={"4px"}
              px={2}
              py={"2px"}
            >
              Get 75% discount
            </Text>{" "}
            🔥
          </Text>
          <Text>Offer valid for:</Text>
        </Flex>

        <Timer />
      </Stack>
    </Flex>
  );
}
