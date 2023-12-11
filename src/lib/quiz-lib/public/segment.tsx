import { useEffect } from "react";
import * as React from "react";

import { SegmentProps } from "./types";
import { useQuizActions } from "../internal/state";

export type SegmentComponentProps = SegmentProps & {
  children?: React.ReactNode;
};

export function Segment(props: SegmentComponentProps) {
  const actions = useQuizActions();

  useEffect(() => {
    actions.registerSegment({
      title: props.title,
      slideCount: React.Children.count(props.children),
    });
  }, []);

  return props.children;
}
