import { useEffect, useState } from "react";
import { Flex, FlexProps, Progress, Text } from "@chakra-ui/react";

import { useQuizSnapshot } from "../internal/state";
import { getPosInBounds } from "../internal/utils";
import { ContainerPropsOverride } from "./types";

export function ProgressIndicator({
  showTitle = true,
  ...rest
}: FlexProps & { showTitle?: boolean }) {
  const snap = useQuizSnapshot();
  const [colorOverrides, setColorOverrides] = useState<
    ContainerPropsOverride["progressBar"] | undefined
  >({});

  // override colors when slide change
  useEffect(() => {
    if (!snap.currentSlide) {
      return;
    }
    setColorOverrides(snap.currentSlide.quizContainerProps?.progressBar as any);
  }, [snap.currentSlide]);

  const colorScheme = colorOverrides?.colorScheme ?? "brand";
  const activeSegmentBg = colorOverrides?.activeSegmentBg ?? "bg.200";
  const inactiveSegmentBg = colorOverrides?.inactiveSegmentBg ?? "bg.200";
  const textColor = colorOverrides?.textColor ?? "text.main";

  return (
    <Flex p={4} direction={"column"} gap={1} alignItems={"center"} {...rest}>
      {showTitle && (
        <Flex width={"full"} fontSize={"sm"} justifyContent={"space-between"}>
          <Text color={textColor} fontWeight={"bold"}>
            {snap.currentSegment?.title}
          </Text>
        </Flex>
      )}

      <Flex direction={"row"} gap={2} width={"100%"}>
        {snap.segmentsFull.map((s, idx) => {
          const posInBounds = getPosInBounds(snap.currentIdx, s.bounds);
          const segmentIsActive = posInBounds === "inside";
          const idxInBound = snap.currentIdx - s.bounds[0];
          const segmentProgress = ((idxInBound + 1) / s.slideCount) * 100;

          return (
            <Flex
              key={idx}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              flex={s.slideCount / snap.slideCount}
            >
              <Progress
                borderRadius={"full"}
                width={"full"}
                colorScheme={colorScheme}
                background={segmentIsActive ? activeSegmentBg : inactiveSegmentBg}
                value={posInBounds === "left" ? 0 : posInBounds === "right" ? 100 : segmentProgress}
                size={"sm"}
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
