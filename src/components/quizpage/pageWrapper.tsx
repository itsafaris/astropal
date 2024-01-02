import { PropsWithChildren, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

export function QuizPageWrapper(props: PropsWithChildren<{}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Flex direction={"column"}>{props.children}</Flex>;
}
