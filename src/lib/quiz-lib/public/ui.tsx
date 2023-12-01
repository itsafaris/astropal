import { Box, Image as ChakraImage, Flex, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useSlide } from "./slide";

export function Title({ children }: PropsWithChildren) {
  const slide = useSlide();
  return (
    <Text fontSize="xl" fontWeight="medium">
      {children}{" "}
      {slide.optional && (
        <Text as="span" my={2} color="blackAlpha.500">
          (optional)
        </Text>
      )}
    </Text>
  );
}

export function Subtitle({ children }: PropsWithChildren) {
  return (
    <Text fontSize="xl" fontWeight="medium" color="blackAlpha.700">
      {children}
    </Text>
  );
}

export function Callout(props: PropsWithChildren<{ emoji?: string }>) {
  const { emoji = "💡", children } = props;
  return (
    <Flex px={4} py={3} backgroundColor={"blackAlpha.100"} gap={2} borderRadius={"md"}>
      <Box>
        <Text fontSize={"2xl"}>{emoji}</Text>
      </Box>
      <Text fontSize="md">{children}</Text>
    </Flex>
  );
}

export function Image(props: { src: string }) {
  return <ChakraImage width={"100%"} maxHeight={300} src={props.src} objectFit={"contain"} />;
}
