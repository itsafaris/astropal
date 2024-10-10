import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const boxShadow = (color: string = "#dfbe9d") =>
  `inset 0px 0px 20px 5px ${color}, 0px 0px 50px 0px ${color}, 0px 0px 10px 0px ${color}`;

const animationKeyframes = (color: string = "#dfbe9d") => keyframes`
  0% { box-shadow: ${boxShadow(color)}, 0px 0px 0px 0px #dfbe9d; }
  50% { box-shadow: ${boxShadow(color)}, 0px 0px 100px 0px #dfbe9d; }
  100% { box-shadow: ${boxShadow(color)}, 0px 0px 0px 0px #dfbe9d; }
`;

const animation = (color: string = "#dfbe9d") =>
  `${animationKeyframes(color)} 1.65s ease-in-out  infinite`;

export function Orb({
  colorTheme = "#dfbe9d",
  size = 30,
  enableAnimation = false,
  text,
  ...rest
}: { colorTheme?: string; size?: number; enableAnimation?: boolean; text?: string } & FlexProps) {
  const sizeString = `${size}px`;

  return (
    <Flex
      height={sizeString}
      width={sizeString}
      borderRadius={"50%"}
      borderColor={colorTheme}
      border={"3px solid white"}
      boxShadow={boxShadow(colorTheme)}
      animation={enableAnimation ? animation(colorTheme) : undefined}
      justifyContent={"center"}
      alignItems={"center"}
      {...rest}
    >
      {text && (
        <Text color="#dfbe9d" fontSize={"md"}>
          {text}
        </Text>
      )}
    </Flex>
  );
}
