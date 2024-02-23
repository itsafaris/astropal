import { Box, Flex } from "@chakra-ui/react";
import { ComponentProps, createContext, useContext, useEffect } from "react";
import { NextButton, SkipButton } from "../internal/ui";
import { ExtractSlideProps, ISelectorType, SlideProps, SlidePropsLoading } from "./types";
import {
  GetSlideStateType,
  SelectorState,
  Snapshot,
  useQuizActions,
  useQuizSnapshot,
} from "../internal/state";

const SlideCtx = createContext<SlideProps>(null as any);

export function useSlide() {
  return useContext(SlideCtx);
}

export type QuizQuestionsState = Record<string, Snapshot<SelectorState>>;

export type SlideComponentProps<T extends ISelectorType> = ExtractSlideProps<T> & {
  children?:
    | React.ReactNode
    | ((param: {
        state: Snapshot<GetSlideStateType<T>>;
        quizState: QuizQuestionsState;
      }) => React.ReactNode);
  containerProps?: ComponentProps<typeof Flex>;
};

export function Slide<T extends ISelectorType>(props: SlideComponentProps<T>) {
  const { children, containerProps, ...slideProps } = props;

  const snap = useQuizSnapshot();
  const actions = useQuizActions();

  // this effect needs to run for all slides, in order to render the progress bar and etc.
  useEffect(() => {
    actions.registerSlide(slideProps);
  }, []);

  // here we cut short and only render the slide contents of the currently active slide
  if (slideProps.id !== snap.currentSlide?.id) {
    return null;
  }

  return (
    <SlideCtx.Provider value={slideProps}>
      <CurrentSlide {...props} />
    </SlideCtx.Provider>
  );
}

function CurrentSlide<T extends ISelectorType>(props: SlideComponentProps<T>) {
  const { children, containerProps, ...slideProps } = props;
  const snap = useQuizSnapshot();
  const state = snap.currentSlideState;

  let hideNextButton = () => {
    if (slideProps.type === "single") {
      return true;
    }

    if (state?.type === "loading") {
      const s = snap.currentSlide as SlidePropsLoading;
      if (s.autoProceed) {
        return true;
      }
      if (state.isComplete) {
        return false;
      }
      return true;
    }

    return false;
  };

  if (!state) {
    return;
  }

  const showSkipButton = slideProps.optional;

  const realChildren =
    typeof children === "function"
      ? children({
          // @ts-expect-error
          state: state,
          quizState: snap.slideStateByID,
        })
      : children;

  if (!state) {
    return null;
  }

  return (
    <Flex
      id="slide"
      direction={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      minHeight={"100%"}
      {...containerProps}
    >
      <Flex w="100vw" maxWidth={"390px"} flexDir={"column"} py={4} px={6}>
        {realChildren}

        {/* {!hideNextButton() && (
          <Box width={"full"} mt={4} mb={2} bottom={8}>
            <NextButton />
          </Box>
        )} */}
        {showSkipButton && <SkipButton mt={8} />}
      </Flex>
    </Flex>
  );
}
