import { Flex, FlexProps, keyframes } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import orbGif from "@images/orb_animated_2.gif";

const boxShadow = (color: string = "#0ab2ff") =>
  `inset 0px 0px 10px 5px ${color}, 0px 0px 50px 0px ${color}, 0px 0px 10px 0px ${color}`;

const animationKeyframes = (color: string = "#0ab2ff") => keyframes`
  0% { box-shadow: ${boxShadow(color)}, 0px 0px 10px 0px #a2e0ffb3; }
  50% { box-shadow: ${boxShadow(color)}, 0px 0px 50px 0px #a2e0ffb3; }
  100% { box-shadow: ${boxShadow(color)}, 0px 0px 10px 0px #a2e0ffb3; }
`;

const animation = (color: string = "#0ab2ff") =>
  `${animationKeyframes(color)} 2s ease-in-out  infinite`;

export function Orb2({
  colorTheme = "#0ab2ff",
  size = 30,
  enableAnimation = false,
  ...rest
}: { colorTheme?: string; size?: number; enableAnimation?: boolean } & FlexProps) {
  const sizeString = `${size}px`;

  return (
    <Flex
      height={sizeString}
      width={sizeString}
      borderRadius={"50%"}
      border={"3px solid "}
      borderColor={colorTheme}
      boxShadow={boxShadow(colorTheme)}
      animation={enableAnimation ? animation(colorTheme) : undefined}
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
