import { Box, Text, Stack, Heading, Flex } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";

export function AreasOfGuidanceSection() {
  return (
    <Box id="guidance-section" my={20}>
      <Heading
        textAlign={"center"}
        fontWeight={"bold"}
        mb={12}
        mx={8}
        fontSize={"2xl"}
        color="white"
      >
        Life's uncertainties shouldn't overshadow your journey
      </Heading>

      <Box borderRadius={"xl"} overflow={"hidden"} backgroundColor={"bg.150"} pt={6} pb={12}>
        <Box borderRadius={"50%"} height={150} width={150} overflow={"hidden"} mx="auto">
          <StaticImage
            alt="A person facing uncertainty in their life"
            src="../../images/person-in-doubt.png"
          />
        </Box>

        <Stack mt={8} spacing={4}>
          <Feature
            title="Uncertain Decisions"
            text="Stop second-guessing your next big life change. Our astrologer offers the assurance you need."
            emoji="🤔"
          />
          <Separator />
          <Feature
            title="Identity Quest"
            text="Feeling lost in the crowd? We will help you pinpoint your unique strengths and path."
            emoji="🌟"
          />
          <Separator />
          <Feature
            title="Missed Opportunities"
            text="Worried you're overlooking life's 'what ifs'? Our insights will help you catch the right waves."
            emoji="⏳"
          />
          <Separator />
          <Feature
            title="Relationship Struggles"
            text="Tired of the guessing game in relationships? Gain understanding to foster deeper connections."
            emoji="💞"
          />
          <Separator />
          <Feature
            title="Financial Uncertainty"
            text="Confused about money matters? Let the stars align your financial decisions toward stability."
            emoji="💰"
          />
        </Stack>
      </Box>
    </Box>
  );
}

function Separator() {
  return (
    <Flex width={"full"} alignItems={"center"} flexDirection={"column"}>
      <Box height={"2px"} width="80%" backgroundColor={"bg.200"} borderRadius={"full"} />
    </Flex>
  );
}

const Feature = ({ title, text, emoji }: { title: string; text: string; emoji?: string }) => {
  return (
    <Stack direction={"column"} px={6} gap={4}>
      <Text fontWeight={"bold"} color={"white"}>
        {emoji} {title}
      </Text>
      <Text color={"bg.800"}>{text}</Text>
    </Stack>
  );
};
