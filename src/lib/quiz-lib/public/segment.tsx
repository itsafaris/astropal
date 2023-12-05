import { SegmentProps } from "./types";

export type SegmentComponentProps = SegmentProps & {
  children?: React.ReactNode;
};

export function Segment(props: SegmentComponentProps) {
  return props.children;
}
