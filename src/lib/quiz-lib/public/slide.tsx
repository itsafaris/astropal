import { Box, Flex } from "@chakra-ui/react";
import { ComponentProps, createContext, useContext } from "react";
import { NextButton, SkipButton } from "../internal/ui";
import { ExtractSlideProps, ISelectorType, SlideProps } from "./types";
import { GetSlideStateType, SelectorState, Snapshot, useQuizSnapshot } from "../internal/state";

const SlideCtx = createContext<SlideProps>(null as any);

export function useSlide() {
  return useContext(SlideCtx);
}

export type SlideComponentProps<T extends ISelectorType> = ExtractSlideProps<T> & {
  children?:
    | React.ReactNode
    | ((param: {
        state: Snapshot<GetSlideStateType<T>>;
        quizState: Record<string, Snapshot<SelectorState>>;
      }) => React.ReactNode);
  containerProps?: ComponentProps<typeof Flex>;
};

export function Slide<T extends ISelectorType>({
  children,
  containerProps,
  ...slideProps
}: SlideComponentProps<T>) {
  const snap = useQuizSnapshot();
  const slideState = snap.slideStateByID[slideProps.id];

  let hideNextButton = () => {
    if (slideProps.type === "single") {
      return true;
    }
    if (slideState.type === "loading" && !slideState.isComplete) {
      return true;
    }
    return false;
  };

  const showSkipButton = slideProps.optional;

  const realChildren =
    typeof children === "function"
      ? children({
          state: snap.currentSlideState as Snapshot<GetSlideStateType<T>>,
          quizState: snap.slideStateByID,
        })
      : children;

  return (
    <SlideCtx.Provider value={slideProps}>
      <Flex
        id="slide"
        direction={"column"}
        justifyContent={"start"}
        alignItems={"center"}
        minHeight={"100%"}
        {...containerProps}
      >
        <Flex w="full" maxW={"440px"} flexDir={"column"} gap={8} py={4} px={6}>
          {realChildren}

          {!hideNextButton() && (
            <Box
              width={"full"}
              mt={4}
              mb={2}
              position={snap.currentSlideState.isValid ? "sticky" : "unset"}
              bottom={8}
            >
              <NextButton />
            </Box>
          )}
          {showSkipButton && <SkipButton mt={2} />}
        </Flex>
      </Flex>
    </SlideCtx.Provider>
  );
}
