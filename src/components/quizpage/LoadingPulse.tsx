import React from "react";
import { Flex, Text, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

const DEFAULT_COLOR = "#dfbe9d96";
const BOX_SHADOW_CSS = `0px 0px 50px 0px ${DEFAULT_COLOR}, 0px 0px 10px 0px ${DEFAULT_COLOR}`;
const ANIMATION_KEYFRAMES_CSS = keyframes`
  0% { box-shadow: ${BOX_SHADOW_CSS}, 0px 0px 0px 0px ${DEFAULT_COLOR}; }
  50% { box-shadow: ${BOX_SHADOW_CSS}, 0px 0px 100px 0px ${DEFAULT_COLOR}; }
  100% { box-shadow: ${BOX_SHADOW_CSS}, 0px 0px 0px 0px ${DEFAULT_COLOR}; }
`;
const ANIMATION_CSS = `${ANIMATION_KEYFRAMES_CSS} 1.65s ease-in-out  infinite`;

export function LoadingPulse({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Flex width={"full"} direction={"column"} gap={4} alignItems={"center"}>
      <Flex
        position={"relative"}
        animation={isLoading ? ANIMATION_CSS : undefined}
        boxShadow={isLoading ? undefined : BOX_SHADOW_CSS}
        borderRadius={"50%"}
      >
        <SpinnerCircleSvg isLoading={isLoading} />

        <Flex
          display={"flex"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"absolute"}
          width={"70%"}
          height={"100%"}
          opacity={0.75}
          transform={"translateX(-50%)"}
          left="50%"
        >
          <Text textAlign={"center"} color="#dfbe9d" fontSize={"lg"} fontWeight={"semibold"}>
            {isLoading ? "Loading..." : "Done"}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

function SpinnerCircleSvg({
  size = 200,
  isLoading = true,
}: {
  size?: number;
  isLoading?: boolean;
}) {
  const DEFAULT_DASHARRAY = 1571;
  const [dashoffset, setDashoffset] = React.useState<number>(0);
  const [dasharray, setDasharray] = React.useState<number>(DEFAULT_DASHARRAY / 2);

  React.useEffect(() => {
    let int: NodeJS.Timeout | null = null;

    if (isLoading) {
      int = setInterval(() => {
        setDashoffset((val) => val + 10);
      }, 20);
    } else {
      setDashoffset(0);
      setDasharray(DEFAULT_DASHARRAY);
    }

    return () => {
      if (int) {
        clearInterval(int);
      }
    };
  }, [isLoading]);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      style={{
        transform: "rotate(90deg)",
        boxShadow: `inset 0px 0px 20px 10px ${DEFAULT_COLOR}`,
        borderRadius: "50%",
      }}
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="pulse">
          <stop stopColor="#dfbe9d" offset="0%" />
          <stop stopColor="white" offset="100%" />
        </linearGradient>
      </defs>

      <g strokeWidth={40} stroke="url(#pulse)" fill="none" rotate={90}>
        <motion.circle
          r={"50%"}
          cx={"50%"}
          cy={"50%"}
          strokeDasharray={dasharray}
          strokeDashoffset={dashoffset}
        />
      </g>
    </svg>
  );
}
