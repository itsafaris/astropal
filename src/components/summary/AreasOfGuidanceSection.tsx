import { Box, Text, Stack, Flex } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { Headline, HeadlineHighlight } from "./components";

export function AreasOfGuidanceSection() {
  return (
    <Flex flexDirection={"column"} alignItems={"center"} id="guidance-section" gap={8}>
      <Headline color="black">
        <HeadlineHighlight>This Program</HeadlineHighlight> Is For You, If You…
      </Headline>

      <StaticImage
        alt=""
        src="../../images/art-6.png"
        style={{ width: 110, opacity: 1, marginLeft: "auto", marginRight: "auto" }}
      />

      <Stack spacing={6}>
        <Feature
          title="Struggle With Relationships"
          text="Unveil your compatibility, deepen connections with understanding"
          emoji="💞"
        />
        <Separator />
        <Feature
          title="Have Career Uncertainty"
          text="Let the stars align your career decisions toward stability"
          emoji="💰"
        />
        <Separator />
        <Feature
          title="Doubt Your Decisions"
          text="Get insights for confidence in your next big life change"
          emoji="🤔"
        />
        <Separator />
        <Feature
          title="Experience an Identity Quest"
          text="Discover your unique strengths and path"
          emoji="🌟"
        />
        <Separator />
        <Feature
          title="Miss Opportunities"
          text="Personalized astrology ensures you seize every opportunity"
          emoji="⏳"
        />
      </Stack>
    </Flex>
  );
}

function Separator() {
  return (
    <Flex width={"full"} alignItems={"center"} flexDirection={"column"}>
      <Box height={"1px"} width="30%" backgroundColor={"blackAlpha.300"} />
    </Flex>
  );
}

const Feature = ({ title, text, emoji }: { title: string; text: string; emoji?: string }) => {
  return (
    <Stack direction={"column"} px={6} gap={2}>
      <Text fontWeight={"semibold"} color={"black"} fontSize={"xl"}>
        {emoji} {title}
      </Text>

      <Text color={"blackAlpha.800"} fontSize={"lg"}>
        {text}
      </Text>
    </Stack>
  );
};
