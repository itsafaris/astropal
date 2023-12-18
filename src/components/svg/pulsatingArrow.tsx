import { Icon } from "@chakra-ui/react";
import * as React from "react";

export function PulsatingArrow(props: React.ComponentProps<typeof Icon>) {
  return (
    <Icon
      width={336}
      height={464}
      viewBox="0 0 336 464"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity={0.3}
        d="M40 36l127.5 83L295 36"
        stroke="#000"
        strokeOpacity={0.3}
        strokeWidth={41}
        strokeLinecap="square"
      />
      <path
        opacity={0.5}
        d="M40 139l127.5 83L295 139"
        stroke="#000"
        strokeOpacity={0.7}
        strokeWidth={41}
        strokeLinecap="square"
      />
      <path
        opacity={0.7}
        d="M40 242l127.5 83L295 242"
        stroke="#000"
        strokeWidth={41}
        strokeLinecap="square"
      />
      <path d="M40 345l127.5 83L295 345" stroke="#000" strokeWidth={41} strokeLinecap="square" />
    </Icon>
  );
}
