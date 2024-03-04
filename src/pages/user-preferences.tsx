import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { TopNavigation } from "@components/topnavigation";

export default function UserPreferencesPage() {
  return (
    <Box py={4} bg="bg.100" color="bg.900" minHeight={"100vh"}>
      <Container flexDirection={"column"} display={"flex"} gap={5}>
        <TopNavigation />

        <Heading textAlign={"center"} fontSize={"2xl"} color="brand.600">
          Your Preferences Have Been Saved!
        </Heading>

        <Stack p={4} color="white" fontWeight={"semibold"} borderRadius={8} spacing={5}>
          <Text>Your following Daily Astrological Forecasts will reflect your choices</Text>
        </Stack>
      </Container>
    </Box>
  );
}
