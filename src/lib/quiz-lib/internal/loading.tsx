import { Box, Flex, Text } from "@chakra-ui/react";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SlidePropsLoading } from "../public/types";
import { useQuizActions } from "./state";

type LoadingSlideComponentProps = {} & SlidePropsLoading;

export function LoadingSlide({ phases }: LoadingSlideComponentProps) {
  const actions = useQuizActions();
  // Define a state to track the current loading phase
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);

  const animationControlsRef = useRef(phases.map(() => useAnimationControls()));

  // Start animations in a sequence
  async function startLoading() {
    let idx = 0;
    for (const control of animationControlsRef.current) {
      // capture local idx
      let _idx = idx;
      const thing = phases[idx];
      setCurrentPhaseIdx(idx);
      await control.start({ width: "100%", transition: { duration: thing.duration } });
      setCompletedPhases((s) => {
        return [...s, _idx];
      });
      idx++;
    }
  }

  useEffect(() => {
    let t2: number;
    const t1 = window.setTimeout(async () => {
      await startLoading();
      t2 = window.setTimeout(() => {
        actions.goToNext();
      }, 300);
    }, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <Flex width={"full"} direction={"column"} gap={4}>
      {phases.map((phase, idx) => {
        const isCurrent = idx === currentPhaseIdx;
        const isComplete = completedPhases.includes(idx);
        return (
          <Box key={phase.title}>
            <Text>
              {phase.title} {isComplete && "✅"}
            </Text>
            <Flex
              p={1}
              borderRadius={"md"}
              width={"full"}
              height={"24px"}
              backgroundColor={"purple.200"}
              alignItems={"center"}
              opacity={isCurrent || isComplete ? 1 : 0.4}
            >
              <Box
                as={motion.div}
                borderRadius={"md"}
                style={{
                  width: isComplete ? "100%" : 0,
                  height: "100%",
                  backgroundColor: "purple",
                }}
                animate={animationControlsRef.current[idx]}
              ></Box>
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
}
