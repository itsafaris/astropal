import { BackgroundProps, ColorProps, ThemeTypings } from "@chakra-ui/styled-system";

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
  | SlidePropsLocation
  | SlidePropsLoading
  | SlidePropsFiller;

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

export type SlidePropsBase = {
  id: string;
  optional?: boolean;
  /** When slide becomes active, these props will be applied */
  quizContainerProps?: ContainerPropsOverride;
};

export type OptionPropsCommon = {
  text: string;
};

export type OptionPropsSimple = {
  icon?: React.ReactNode;
} & OptionPropsCommon;

export type OptionPictureProps = {
  imgUrl: string;
} & OptionPropsCommon;

export type SelectorPropsPicture = {
  variant: "picture";
  size?: "small" | "medium";
  options?: OptionPictureProps[];
};

export type SelectorPropsList = {
  variant: "list";
  options?: OptionPropsSimple[];
};

export type CommonSelectorProps = {} & (SelectorPropsList | SelectorPropsPicture);

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
} & SlidePropsBase;

export type SlidePropsDate = {
  type: "date";
} & SlidePropsBase;

export type SlidePropsLocation = {
  type: "location";
  placeholder?: string;
} & SlidePropsBase;

export type SlidePropsLoading = {
  type: "loading";
  /** 0 - 100 */
  from?: number;
  /** 0 - 100 */
  to?: number;
  /** In seconds */
  duration?: number;
  completedText?: React.ReactNode;
  statusText?: string | ((s: { progress: number }) => string);
  autoProceed?: boolean;
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
