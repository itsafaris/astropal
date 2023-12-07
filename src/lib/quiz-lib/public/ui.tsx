import { Box, Image as ChakraImage, Flex, Text, TextProps } from "@chakra-ui/react";
import { ComponentProps, PropsWithChildren } from "react";
import { useSlide } from "./slide";
import { AnimatePresence, motion } from "framer-motion";

export function Title({ children, ...rest }: PropsWithChildren<TextProps>) {
  const slide = useSlide();
  return (
    <Text fontSize="2xl" lineHeight={1.4} fontWeight="semibold" {...rest}>
      {children}{" "}
      {slide.optional && (
        <Text as="span" my={2} color="blackAlpha.500">
          (optional)
        </Text>
      )}
    </Text>
  );
}

export function Span(props: PropsWithChildren<TextProps>) {
  return <Text as="span" {...props} />;
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
    <Flex
      px={6}
      py={4}
      mx={4}
      gap={1}
      borderRadius={"xl"}
      borderStyle={"solid"}
      borderWidth={1}
      borderColor={"secondary.300"}
      flexDirection="column"
      backgroundColor={"secondary.50"}
      opacity={0.6}
    >
      <Box
        flexShrink={0}
        borderRadius={"full"}
        color="secondary.900"
        fontWeight={"bold"}
        fontSize={"sm"}
      >
        Tip! {emoji}
      </Box>
      <Flex borderRadius={"md"}>
        <Text fontSize="sm" color="secondary.900">
          {children}
        </Text>
      </Flex>
    </Flex>
  );
}

export function Image(props: { src: string }) {
  return <ChakraImage width={"100%"} maxHeight={300} src={props.src} objectFit={"contain"} />;
}
