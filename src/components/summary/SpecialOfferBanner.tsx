import { Container, Flex, FlexProps, Text } from "@chakra-ui/react";

import { Timer } from "@components/timer";

export function SpecialOfferBanner(props: FlexProps) {
  return (
    <Flex
      id="special-offer"
      px={2}
      py={4}
      background={`linear-gradient(-45deg, #ecbb2b, #e29c3e)`}
      width="full"
      alignItems={"center"}
      justifyContent={"center"}
      shadow="lg"
      color="black"
      {...props}
    >
      <Container>
        <Flex
          width={"full"}
          flexDirection="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Timer />
          <Text textAlign={"right"} fontSize={"sm"} fontWeight={"semibold"}>
            Special Offer For a Limited Time
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
}
