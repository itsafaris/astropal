import { Box } from "@chakra-ui/react";
import { motion, useAnimationControls } from "framer-motion";
import { ComponentProps, useEffect } from "react";
import DatePicker from "../internal/datepicker";
import { LoadingSlide } from "../internal/loading";
import { Location } from "../internal/location";
import { MultiSelect } from "../internal/multi";
import { ShortText } from "../internal/shortText";
import { SingleSelect } from "../internal/single";
import { useQuizSnapshot } from "../internal/state";
import { useSlide } from "./slide";
import { Email } from "../internal/email";
import { TimePicker } from "../internal/timepicker";

type SelectorProps = {};

export function Selector(props: ComponentProps<typeof Box> & SelectorProps) {
  const slide = useSlide();
  const slideState = useQuizSnapshot().currentSlideState;
  const currentSlide = useQuizSnapshot().currentSlideID;

  const controls = useAnimationControls();

  const isActive = slide.id === currentSlide;

  useEffect(() => {
    if (!isActive || !slideState) {
      return;
    }
    if (!slideState.isValid && slideState.attempts > 0) {
      handleFlash();
    }
  }, [isActive, slideState, slideState?.attempts]);

  const handleFlash = async () => {
    await controls.start({
      scale: 0.9,
      rotate: 5,
      transition: { duration: 0.1 },
    });
    await controls.start({
      scale: 1,
      rotate: 0,
      transition: {
        scale: { type: "spring", stiffness: 300 },
        rotate: { type: "spring", stiffness: 300 },
      },
    });
  };

  function getSpecificSelector() {
    switch (slide.type) {
      case "short-text": {
        return <ShortText {...slide} />;
      }
      case "single": {
        return <SingleSelect {...slide} />;
      }
      case "multi": {
        return <MultiSelect {...slide} />;
      }
      case "date": {
        return <DatePicker {...slide} />;
      }
      case "time": {
        return <TimePicker {...slide} />;
      }
      case "location": {
        return <Location {...slide} />;
      }
      case "loading": {
        return <LoadingSlide {...slide} />;
      }
      case "email": {
        return <Email {...slide} />;
      }
    }
  }

  if (!slideState) {
    return null;
  }

  return (
    <Box as={motion.div} width={"full"} mb={8} animate={controls} {...props}>
      {getSpecificSelector()}
    </Box>
  );
}
