import { Box, Container, Heading, Text, Stack } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

export default function CheckoutErrorPage() {
  return (
    <Box py={4} bg="bg.100" color="bg.900" minHeight={"100vh"}>
      <Container flexDirection={"column"} display={"flex"} gap={5}>
        <TopNavigation />

        <Heading textAlign={"center"} fontSize={"2xl"}>
          Unable to complete your order
        </Heading>

        <Stack
          backgroundColor={"orange.100"}
          p={4}
          color="orange.800"
          fontWeight={"semibold"}
          borderRadius={8}
          spacing={5}
        >
          <Text>
            Oops! Something went wrong, but don't worry, we're working hard to fix the issue.
          </Text>
          <Text>Please come back in a few hours. We appreciate your understanding!</Text>
        </Stack>
      </Container>
    </Box>
  );
}
