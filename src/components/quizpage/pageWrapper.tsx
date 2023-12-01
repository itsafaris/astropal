import { isSSR } from "@utils/ssr";
import { PropsWithChildren } from "react";
import { Flex, Text } from "@chakra-ui/react";

export function QuizPageWrapper(props: PropsWithChildren<{}>) {
  if (isSSR()) {
    return <div></div>;
  }

  return (
    <Flex minHeight={"100vh"} direction={"column"}>
      <Text
        fontSize={"2xl"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontFamily={"mono"}
        colorScheme={"brand"}
      >
        AstroPal
      </Text>
      {props.children}
    </Flex>
  );
}
