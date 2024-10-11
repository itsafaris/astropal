import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { keyframes } from "@emotion/react";

const DEFAULT_COLOR_1 = "#cdbeff";
const BOX_SHADOW_CSS = `0px 0px 50px 0px ${DEFAULT_COLOR_1}, 0px 0px 10px 0px ${DEFAULT_COLOR_1}`;

export function OrbRotating({
  duration = 0,
  size = 200,
  ...rest
}: { duration?: number; size?: number } & FlexProps) {
  const ellipseSize = size * 1.1;

  return (
    <Flex
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={"50%"}
      boxShadow={BOX_SHADOW_CSS}
      {...rest}
    >
      <Ellipse
        size={ellipseSize}
        svgID="ellipse-1"
        duration={duration}
        style={{
          position: "absolute",
        }}
      />

      <Ellipse
        size={ellipseSize}
        svgID="ellipse-2"
        duration={duration}
        style={{
          position: "absolute",
          transform: "rotate(90deg)",
        }}
      />

      <Circle
        size={size}
        duration={duration}
        style={{
          position: "absolute",
        }}
      />

      <Box
        width={size}
        height={size}
        borderRadius={"50%"}
        boxShadow={`${BOX_SHADOW_CSS}, inset 0px 0px 20px 10px ${DEFAULT_COLOR_1}`}
      />
    </Flex>
  );
}

function Ellipse({
  size = 200,
  duration = 0,
  svgID = "ellipse",
  color = "white",
  ...rest
}: {
  size?: number;
  duration?: number;
  svgID?: string;
  color?: string;
} & React.SVGProps<SVGSVGElement>) {
  const DEFAULT_DASHARRAY = 1571;
  const [dashoffset, setDashoffset] = React.useState<number>(0);
  const [dasharray, setDasharray] = React.useState<number>(DEFAULT_DASHARRAY / 2);

  React.useEffect(() => {
    let int: number | null = null;

    setDasharray(DEFAULT_DASHARRAY);

    if (duration !== 0) {
      const timeout = 10;
      const intervalCount = duration / timeout;
      const delta = DEFAULT_DASHARRAY / intervalCount;

      int = window.setInterval(() => {
        setDashoffset((val) => {
          return val - delta;
        });
      }, 10);
    } else {
      setDashoffset(0);
    }

    return () => {
      if (int) {
        clearInterval(int);
      }
    };
  }, [duration]);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      {...rest}
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={svgID}>
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="50%" stopColor={color} stopOpacity="0" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>

      <g strokeWidth={4} stroke={`url(#${svgID})`} fill="none" rotate={90}>
        <motion.ellipse
          rx={"49%"}
          ry={"45%"}
          cx={"50%"}
          cy={"50%"}
          strokeDasharray={dasharray}
          strokeDashoffset={dashoffset}
        />
      </g>
    </svg>
  );
}

const CIRCLE_ANIMATION_KEYFRAMES_CSS = keyframes`
to { transform: rotate(360deg) }
`;

function getCircleAnimationCss(duration: number) {
  return `${CIRCLE_ANIMATION_KEYFRAMES_CSS} ${duration / 1000}s linear infinite`;
}

function Circle({
  size = 200,
  color = "white",
  duration = 1000,
  ...rest
}: {
  size?: number;
  color?: string;
  duration?: number;
} & BoxProps) {
  return (
    <Box animation={duration !== 0 ? getCircleAnimationCss(duration) : undefined} {...rest}>
      <svg width={size} height={size} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <circle
          fill="transparent"
          strokeWidth={8}
          cx={"50%"}
          cy={"50%"}
          r={"49%"}
          stroke="url(#rot-load-1)"
        />

        <defs>
          <linearGradient id="rot-load-1">
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="65%" stopColor={color} stopOpacity=".5" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}
