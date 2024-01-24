import { Box, BoxProps, Flex, keyframes } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import orbGif from "@images/orb_animated_2.gif";

const boxShadow =
  "inset 0px 0px 10px 5px #00abff, 0px 0px 50px 0px #00abff, 0px 0px 10px 0px #0ab2ff";

const animationKeyframes = keyframes`
  0% { box-shadow: ${boxShadow}, 0px 0px 10px 0px #a2e0ffb3; }
  50% { box-shadow: ${boxShadow}, 0px 0px 50px 0px #a2e0ffb3; }
  100% { box-shadow: ${boxShadow}, 0px 0px 10px 0px #a2e0ffb3; }
`;

const animation = `${animationKeyframes} 2s ease-in-out  infinite`;

export function Orb2({
  size = 30,
  enableAnimation = false,
  ...rest
}: { size?: number; enableAnimation?: boolean } & BoxProps) {
  const sizeString = `${size}px`;

  return (
    <Box
      height={sizeString}
      width={sizeString}
      borderRadius={"50%"}
      border={"3px solid #cdfdff"}
      boxShadow={boxShadow}
      animation={enableAnimation ? animation : undefined}
      {...rest}
    />
  );
}

export function Orb() {
  return (
    <Flex flexDirection={"column"} alignItems={"center"} gap={3}>
      <Flex
        borderRadius={"full"}
        overflow={"hidden"}
        height={"45px"}
        width={"45px"}
        boxShadow={"inset 0 0 50px 0 #ffc90014, 0 0 50px 0 #ffc90014"}
        position={"relative"}
      >
        <Flex
          borderRadius={"full"}
          overflow={"hidden"}
          height={"45px"}
          width={"45px"}
          position={"absolute"}
          zIndex={-1}
          boxShadow={"0 0 20px 0 black"}
          opacity={0.4}
        >
          <img src={orbGif} />
        </Flex>

        <StaticImage style={{ opacity: 0.6 }} alt="" src="../images/astro-avatar.png" />
      </Flex>
    </Flex>
  );
}
