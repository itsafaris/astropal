import { Box, BoxProps, keyframes } from "@chakra-ui/react";

const animationKeyframes = keyframes`
0% {
  box-shadow: 0px 0px 50px 0px #00abff, 0px 0px 10px 0px #0ab2ff, 0px 0px 10px 0px #a2e0ffb3;
}
50% {
  box-shadow: 0px 0px 50px 0px #00abff, 0px 0px 10px 0px #0ab2ff, 0px 0px 50px 0px #a2e0ffb3;
}
100% {
  box-shadow: 0px 0px 50px 0px #00abff, 0px 0px 10px 0px #0ab2ff, 0px 0px 10px 0px #a2e0ffb3;
}
`;

const animation = `${animationKeyframes} 2s ease-in-out  infinite`;

export function Orb({
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
      backgroundColor={"#cdfdff"}
      boxShadow={"0px 0px 50px 0px #00abff, 0px 0px 10px 0px #0ab2ff"}
      animation={enableAnimation ? animation : undefined}
      {...rest}
    />
  );
}
