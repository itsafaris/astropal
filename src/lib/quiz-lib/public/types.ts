import { BackgroundProps, ColorProps, ThemeTypings } from "@chakra-ui/styled-system";

export type IOptionInputType = "checkbox" | "radio" | "none";

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
  phases: LoadingPhase[];
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

export type ShadedColor = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type QuizTheme = {
  mainColor?: ShadedColor;
};
