import { Button } from "@chakra-ui/react";
import { BackgroundProps, ColorProps, ThemeTypings } from "@chakra-ui/styled-system";
import { ComponentProps } from "react";

export type IOptionInputType = "checkbox" | "radio" | "none";

export type TrackingEvent = {
  name: string;
  properties: {
    [name: string]: any;
  };
};

export type TrackingEventCallback = (event: TrackingEvent) => void;

export type QuizErrorEvent = {
  name: "error";
  data: {
    message: string;
    [prop: string]: string | number;
  };
};

export type SegmentProps = {
  title: string;
};

export type SlideProps =
  | SlidePropsMulti
  | SlidePropsSingle
  | SlidePropsShortText
  | SlidePropsDate
  | SlidePropsTime
  | SlidePropsLocation
  | SlidePropsLoading
  | SlidePropsFiller
  | SlidePropsEmail;

export type ISelectorType = SlideProps["type"];

export type ContainerPropsOverride = {
  bg?: string;
  bgGradient?: string;
  progressBar?: {
    textColor?: ColorProps["color"];
    colorScheme?: ThemeTypings["colorSchemes"];
    activeSegmentBg?: BackgroundProps["bgColor"];
    inactiveSegmentBg?: BackgroundProps["bgColor"];
  };
};

export type NextButtonProps = {
  title?: string;
};

export type SlidePropsBase = {
  id: string;
  optional?: boolean;
  /** When slide becomes active, these props will be applied */
  quizContainerProps?: ContainerPropsOverride;
  nextButtonProps?: NextButtonProps;
};

export type OptionPropsCommon = {
  text: string;
  // if value is not provided, text will be used as value
  value?: string;
  styleProps?: Omit<ComponentProps<typeof Button>, "size">;
};

export type OptionPropsSimple = {
  icon?: React.ReactNode;
} & OptionPropsCommon;

export type OptionPictureProps = {
  imgComponent: React.ReactNode;
} & OptionPropsCommon;

export type SelectorPropsPicture = {
  variant: "picture";
  size?: "small" | "medium";
  hideText?: boolean;
  options?: OptionPictureProps[];
};

export type SelectorPropsList = {
  variant: "list";
  direction?: "row" | "column";
  size?: "small" | "medium";
  options?: OptionPropsSimple[];
};

export type CommonSelectorProps = {
  label?: string;
} & (SelectorPropsList | SelectorPropsPicture);

export type SlidePropsMulti = {
  type: "multi";
} & CommonSelectorProps &
  SlidePropsBase;

export type SlidePropsSingle = {
  type: "single";
  logic?: LogicDefinition;
} & CommonSelectorProps &
  SlidePropsBase;

export type SlidePropsShortText = {
  type: "short-text";
  placeholder?: string;
  label?: string;
} & SlidePropsBase;

export type SlidePropsEmail = {
  type: "email";
  placeholder?: string;
  label?: string;
} & SlidePropsBase;

export type SlidePropsDate = {
  type: "date";
} & SlidePropsBase;

export type SlidePropsTime = {
  type: "time";
} & SlidePropsBase;

export type SlidePropsLocation = {
  type: "location";
  placeholder?: string;
} & SlidePropsBase;

export type SlidePropsLoading = {
  type: "loading";
  variant?: "circle" | "linear";
  /** 0 - 100 */
  from?: number;
  /** 0 - 100 */
  to?: number;
  /** In seconds */
  duration?: number;
  completedText?: React.ReactNode;
  statusText?: string | ((s: { progress: number }) => string);
  autoProceed?: boolean;
  onLoadingCompleted?: () => void;
} & SlidePropsBase;

export type SlidePropsFiller = {
  type: "filler";
} & SlidePropsBase;

export type LoadingPhase = {
  title: string;
  duration?: number; // in seconds
};

export type LogicDefinition = {
  optionIdx: number;
  slideID: string;
}[];

// A helper type to extract specific SlideProps based on the 'type' discriminator
export type ExtractSlideProps<T extends SlideProps["type"]> = Extract<SlideProps, { type: T }>;
