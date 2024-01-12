import { Button, Flex, Stack, Text, useBreakpoint } from "@chakra-ui/react";

import { Timer } from "@components/timer";

export function SpecialOfferBanner({ showTimer = true }: { showTimer?: boolean }) {
  const breakpoint = useBreakpoint();

  return (
    <Flex
      px={{ base: 2 }}
      py={{ base: 2, md: 3 }}
      background="linear-gradient(10deg, #ffbf00, #ffee54)"
      width="full"
      alignItems={"center"}
      justifyContent={"center"}
      shadow="lg"
    >
      {breakpoint === "abc" ? (
        <></>
      ) : (
        <Stack
          direction={{ base: "row", md: "row" }}
          alignItems={"center"}
          spacing={{ base: 1, md: 5, lg: 8 }}
        >
          <Flex
            direction={"column"}
            alignItems={"center"}
            fontSize={{
              base: "sm",
              md: "md",
              lg: "lg",
            }}
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
                Get up to 75% discount
              </Text>{" "}
              🔥
            </Text>
            <Text>for your first-time purchase</Text>
          </Flex>

          <Timer />
        </Stack>
      )}
    </Flex>
  );
}
