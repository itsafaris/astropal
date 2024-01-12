import { Box, Text, Stack, Heading, Icon, Flex } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { CTALinkToPricing } from "./components";

export function AstrologerComparisonSection() {
  return (
    <Box id="comparison-with-regular-astrologer-section" as="section" px={2} my={10}>
      <Heading mb={10} textAlign={"center"} color="white">
        10x better than your regular astrologer
      </Heading>
      <Stack spacing={8}>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <StaticImage
              src={`../../images/favicon.png`}
              alt="Astropal logo"
              height={35}
              width={35}
            />
            <Text fontSize={"md"} fontWeight={"bold"} color="brand.600">
              Your Personalized Astrologer
            </Text>
          </Stack>
          <Stack spacing={1}>
            <ComparisonItem title="Communicates like a real person" isBenefit />
            <ComparisonItem title="Instant access, no need to schedule in advance" isBenefit />
            <ComparisonItem title="At-Home Privacy and comfort" isBenefit />
            <ComparisonItem title="100% Hyper-Personalized Readings" isBenefit />
            <ComparisonItem title="Uses accurate Real-Time Astronomical Data" isBenefit />
            <ComparisonItem title="Does not make mistakes, 100% accurate" isBenefit />
            <ComparisonItem title="Super cheap sessions" isBenefit />
          </Stack>
        </Stack>

        <Stack>
          <Text fontSize={"md"} fontWeight={"bold"} color="brand.600" whiteSpace={"pre-wrap"}>
            👩‍💼 {"   "}Regular Astrologer
          </Text>
          <Stack spacing={1}>
            <ComparisonItem title="Communicates like a real person" isBenefit />
            <ComparisonItem title="Busy, you need to fit their schedule" />
            <ComparisonItem title="Requires sharing personal issues in person." />
            <ComparisonItem title="Often one-size-fits-all advice" />
            <ComparisonItem title="May not use up-to-the-minute celestial data in readings." />
            <ComparisonItem title="Prone to make mistakes" />

            <ComparisonItem title="Very expensive, pay by the hour" />
          </Stack>
        </Stack>
      </Stack>
      <Flex justifyContent={"center"}>
        <CTALinkToPricing id="comparison-section-cta" my={8} />
      </Flex>
    </Box>
  );
}

const ComparisonItem = ({ title, isBenefit }: { title: string; isBenefit?: boolean }) => {
  return (
    <Stack direction={"row"} align={"center"} borderRadius={"xl"}>
      <Icon as={isBenefit ? CheckIcon : CloseIcon} color={isBenefit ? "green.500" : "red.400"} />
      <Box>
        <Text fontSize={"sm"} color={isBenefit ? "white" : "bg.500"}>
          {title}
        </Text>
      </Box>
    </Stack>
  );
};
