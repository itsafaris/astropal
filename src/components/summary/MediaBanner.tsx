import { Box, Container, Flex } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";

const marquee = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const logos = [
  <StaticImage alt="The guardian" src="../../images/media-guardian.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-cosmopolitan.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-nyt.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-vogue.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-forbes.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-mashable.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-guardian.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-cosmopolitan.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-nyt.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-vogue.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-forbes.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-mashable.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-guardian.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-cosmopolitan.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-nyt.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-vogue.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-forbes.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-mashable.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-guardian.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-cosmopolitan.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-nyt.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-vogue.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-forbes.svg" height={25} />,
  <StaticImage alt="The guardian" src="../../images/media-mashable.svg" height={25} />,
];

export function MediaBanner() {
  return (
    <Box width="100%" bg="brand.50" py={6}>
      <Container maxW={"container.lg"} position="relative" overflow="hidden" whiteSpace="nowrap">
        <Box
          position="absolute"
          top="0"
          left="0"
          h="100%"
          w="80px"
          bgGradient="linear(to-r, brand.50, transparent)"
          zIndex="1"
          pointerEvents="none"
        />

        <Box
          position="absolute"
          top="0"
          right="0"
          h="100%"
          w="80px"
          bgGradient="linear(to-l, brand.50, transparent)"
          zIndex="1"
          pointerEvents="none"
        />

        <Flex
          alignItems={"center"}
          animation={[`${marquee} 15s linear infinite`, `${marquee} 30s linear infinite`]}
          gap={14}
        >
          {logos.map((logo, index) => (
            <Box flexShrink={0} key={index}>
              {logo}
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
