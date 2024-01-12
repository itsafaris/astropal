import { Box, Text, Heading } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";

export function SimilarUsersLikeYouSection() {
  return (
    <Box p={2} bg="teal.800" borderRadius={"xl"}>
      <Heading px={4} py={4} fontWeight={"semibold"} fontSize={{ base: "2xl" }} color="brand.700">
        On average,{" "}
        <Text as="span" color="green.400">
          93%
        </Text>{" "}
        of our users report feeling less self-doubt and greater clarity in their lives within just{" "}
        <Text as="span" color="green.400">
          14 days
        </Text>{" "}
        of consulting personalized astrologer.
      </Heading>

      <Box mt={4} overflow={"hidden"}>
        <StaticImage
          alt="Clarity increase when using astrologer guidance chart"
          src="../../images/clarity_chart.png"
        />
      </Box>
    </Box>
  );
}
