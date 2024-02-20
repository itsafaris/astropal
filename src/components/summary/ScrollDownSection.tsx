import { ArrowDownIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/react";

export function ScrollDownSection() {
  return (
    <Stack alignItems={"center"} pb={8} fontWeight={"bold"}>
      <Text textAlign={"center"} width={"full"} fontSize={"xl"} color={"whiteAlpha.600"}>
        Scroll to see more
      </Text>

      <ArrowDownIcon color="whiteAlpha.600" fontSize={"3xl"} />
    </Stack>
  );
}
