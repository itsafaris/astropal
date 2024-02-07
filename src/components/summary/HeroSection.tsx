import { Box, Container, Text, Stack, Flex, Card } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { ArrowDownIcon } from "@chakra-ui/icons";

import { QuizStateParsed } from "@utils/state";
import { BoltIcon, InfinityIcon, MoonIcon } from "@components/svg/icons";

import { CTALinkToPricing } from "./components";

export function HeroSection({ quizState }: { quizState?: QuizStateParsed }) {
  return (
    <Box id="hero-section" as="section" position={"relative"}>
      <Container></Container>
    </Box>
  );
}
