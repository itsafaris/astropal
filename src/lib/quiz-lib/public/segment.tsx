import { SlideComponentProps } from "./slide";
import { SegmentProps } from "./types";

export type SegmentComponentProps = SegmentProps & {
  children?: React.ReactElement<SlideComponentProps>[] | React.ReactElement<SlideComponentProps>;
};

export function Segment(props: SegmentComponentProps) {
  return props.children;
}
