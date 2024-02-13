import { Box, Text, Stack, Heading, Icon, Flex } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export function AstrologerComparisonSection() {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      gap={8}
      id="comparison-with-regular-astrologer-section"
      as="section"
      px={2}
    >
      <Heading
        fontWeight="semibold"
        textAlign={"center"}
        width={"full"}
        fontSize={"2xl"}
        color="white"
      >
        10x better than your regular astrologer
      </Heading>

      <StaticImage
        alt=""
        src="../../images/art-7.png"
        style={{ width: 60, opacity: 1, marginLeft: "auto", marginRight: "auto" }}
      />

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
              Astropal Insights
            </Text>
          </Stack>
          <Stack spacing={1}>
            <ComparisonItem title="Communicates like a real person" isBenefit />
            <ComparisonItem title="Extremely cheap" isBenefit />
            <ComparisonItem title="Instant access, no need to schedule in advance" isBenefit />
            <ComparisonItem title="At-Home Privacy and comfort" isBenefit />
            <ComparisonItem title="100% Hyper-Personalized Readings" isBenefit />
            <ComparisonItem title="Uses accurate Real-Time Astronomical Data" isBenefit />
            <ComparisonItem title="Does not make mistakes, 100% accurate" isBenefit />
          </Stack>
        </Stack>

        <Stack>
          <Text fontSize={"md"} fontWeight={"bold"} color="brand.600" whiteSpace={"pre-wrap"}>
            👩‍💼 {"   "}Regular Astrologer
          </Text>
          <Stack spacing={1}>
            <ComparisonItem title="Communicates like a real person" isBenefit />
            <ComparisonItem title="Very expensive, pay by the hour" />
            <ComparisonItem title="Busy, you need to fit their schedule" />
            <ComparisonItem title="Requires sharing personal issues in person." />
            <ComparisonItem title="Often one-size-fits-all advice" />
            <ComparisonItem title="May not use up-to-the-minute celestial data in readings." />
            <ComparisonItem title="Prone to make mistakes" />
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}

const ComparisonItem = ({ title, isBenefit }: { title: string; isBenefit?: boolean }) => {
  return (
    <Stack direction={"row"} align={"center"} borderRadius={"xl"}>
      <Icon as={isBenefit ? CheckIcon : CloseIcon} color={isBenefit ? "green.300" : "red.400"} />
      <Box>
        <Text fontSize={"sm"} color={isBenefit ? "white" : "whiteAlpha.500"}>
          {title}
        </Text>
      </Box>
    </Stack>
  );
};
