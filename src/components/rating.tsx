import { Box, Flex } from "@chakra-ui/react";
import { ComponentProps } from "react";

export function Rating({
  value,
  lowValue,
  total,
  colorScheme = "orange",
  ...rest
}: { value: number; lowValue: number; total: number; colorScheme?: string } & ComponentProps<
  typeof Flex
>) {
  return (
    <Flex {...rest} gap={"2px"}>
      {Array(total)
        .fill("")
        .map((_, idx) => {
          return (
            <Box
              key={idx}
              height={"6px"}
              borderRadius={"sm"}
              flex={1}
              bg={
                value < idx + 1
                  ? `${colorScheme}.100`
                  : lowValue < idx + 1
                  ? `${colorScheme}.500`
                  : `${colorScheme}.300`
              }
            ></Box>
          );
        })}
    </Flex>
  );
}
