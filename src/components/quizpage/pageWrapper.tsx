import { isSSR } from "@utils/ssr";
import { PropsWithChildren } from "react";
import { Flex } from "@chakra-ui/react";

export function QuizPageWrapper(props: PropsWithChildren<{}>) {
  if (isSSR()) {
    return <div></div>;
  }

  return <Flex direction={"column"}>{props.children}</Flex>;
}
