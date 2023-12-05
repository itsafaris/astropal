import { Box, Image as ChakraImage, Flex, Text, TextProps } from "@chakra-ui/react";
import { ComponentProps, PropsWithChildren } from "react";
import { useSlide } from "./slide";
import { AnimatePresence, motion } from "framer-motion";

export function Title({ children, ...rest }: PropsWithChildren<TextProps>) {
  const slide = useSlide();
  return (
    <Text fontSize="xl" fontWeight="medium" {...rest}>
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

export function TransitionText({
  text,
  ...rest
}: Omit<ComponentProps<typeof Text>, "children"> & { text: string }) {
  return (
    <Text {...rest} position={"relative"}>
      <AnimatePresence>
        <motion.span
          style={{ position: "absolute", width: "100%", left: 0, top: 0 }}
          key={text} // Important: use text as the key to trigger the animation on change
          initial={{ opacity: 0 }} // Start with the text invisible.
          animate={{ opacity: 1 }} // Animate to fully visible.
          exit={{ opacity: 0 }} // Exit to invisible.
          transition={{ duration: 0.5 }} // Customize the duration as needed
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <span style={{ visibility: "hidden" }} aria-hidden>
        {text}
      </span>
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
