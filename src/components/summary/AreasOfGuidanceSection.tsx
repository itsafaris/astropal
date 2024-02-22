import { Box, Text, Stack, Flex } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { Headline } from "./components";

export function AreasOfGuidanceSection() {
  return (
    <Flex flexDirection={"column"} alignItems={"center"} id="guidance-section" gap={8}>
      <Headline>Use Astrology As a Key When The Doors Are Closed</Headline>

      <StaticImage
        alt=""
        src="../../images/art-6.png"
        style={{ width: 110, opacity: 1, marginLeft: "auto", marginRight: "auto" }}
      />

      <Stack spacing={4}>
        <Feature
          title="Uncertain Decisions"
          text="Get insights for confidence in your next big life change"
          emoji="🤔"
        />
        <Separator />
        <Feature title="Identity Quest" text="Discover your unique strengths and path" emoji="🌟" />
        <Separator />
        <Feature
          title="Missed Opportunities"
          text="Personalized astrology ensures you seize every opportunity"
          emoji="⏳"
        />
        <Separator />
        <Feature
          title="Relationship Struggles"
          text="Unveil your compatibility, deepen connections with understanding"
          emoji="💞"
        />
        <Separator />
        <Feature
          title="Career Uncertainty"
          text="Let the stars align your career decisions toward stability"
          emoji="💰"
        />
      </Stack>
    </Flex>
  );
}

function Separator() {
  return (
    <Flex width={"full"} alignItems={"center"} flexDirection={"column"}>
      <Box height={"1px"} width="80%" backgroundColor={"bg.200"} borderRadius={"full"} />
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
