import { Box, Container, Heading, Text, Stack } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

export default function CheckoutErrorPage() {
  return (
    <Box py={4} bg="bg.100" color="bg.900" minHeight={"100vh"}>
      <Container flexDirection={"column"} display={"flex"} gap={5}>
        <TopNavigation />

        <Heading textAlign={"center"} fontSize={"2xl"}>
          Unable to complete your operation
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
            We're currently working through some technical difficulties with our service. Rest
            assured, we're on it and will notify you as soon as everything is back to normal.
          </Text>
          <Text>We apologize for any inconvenience and appreciate your patience.</Text>
        </Stack>
      </Container>
    </Box>
  );
}
