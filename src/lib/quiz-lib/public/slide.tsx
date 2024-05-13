import { Flex } from "@chakra-ui/react";
import { ComponentProps, createContext, useContext, useEffect } from "react";
import { SkipButton } from "../internal/ui";
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
  children?: React.ReactNode;
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

  // const snap = useQuizSnapshot();
  // const state = snap.currentSlideState;

  // let hideNextButton = () => {
  //   if (slideProps.type === "single") {
  //     return true;
  //   }

  //   if (state?.type === "loading") {
  //     const s = snap.currentSlide as SlidePropsLoading;
  //     if (s.autoProceed) {
  //       return true;
  //     }
  //     if (state.isComplete) {
  //       return false;
  //     }
  //     return true;
  //   }

  //   return false;
  // };

  const showSkipButton = slideProps.optional;

  return (
    <Flex
      id="slide"
      direction={"column"}
      justifyContent={"start"}
      alignItems={"stretch"}
      minHeight={"100%"}
      width="100vw"
      maxWidth={"390px"}
      py={4}
      px={6}
      {...containerProps}
    >
      {children}

      {/* {!hideNextButton() && (
          <Box width={"full"} mt={4} mb={2} bottom={8}>
            <NextButton />
          </Box>
        )} */}
      {showSkipButton && <SkipButton mt={8} />}
    </Flex>
  );
}
