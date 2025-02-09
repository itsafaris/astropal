import { Box, Flex, Text, TextProps } from "@chakra-ui/react";
import { ComponentProps, PropsWithChildren } from "react";
import { useSlide } from "./slide";
import { AnimatePresence, motion } from "framer-motion";

export function Title({ children, ...rest }: PropsWithChildren<TextProps>) {
  const slide = useSlide();
  return (
    <Text fontSize="2xl" lineHeight={1.4} mb={8} fontWeight="semibold" color="bg.900" {...rest}>
      {children}{" "}
      {slide.optional && (
        <Text as="span" my={2} color="bg.400" fontWeight={"normal"} fontSize={"medium"}>
          (optional)
        </Text>
      )}
    </Text>
  );
}

export function Span(props: PropsWithChildren<TextProps>) {
  return <Text as="span" {...props} />;
}

export function Subtitle(props: PropsWithChildren<TextProps>) {
  return <Text color="bg.800" mb={4} fontSize={"sm"} {...props} />;
}

export function TransitionText({
  text,
  ...rest
}: Omit<ComponentProps<typeof Text>, "children"> & { text: string }) {
  return (
    <Text position={"relative"} {...rest}>
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

export function Callout(
  props: PropsWithChildren<{ title?: string } & ComponentProps<typeof Flex>>
) {
  const { title, children, ...rest } = props;
  return (
    <Flex
      px={4}
      py={2}
      mb={8}
      gap={1}
      borderRadius={"xl"}
      flexDirection="column"
      backgroundColor={"blue.50"}
      {...rest}
    >
      {title && (
        <Box
          flexShrink={0}
          borderRadius={"full"}
          color="text.main"
          fontWeight={"bold"}
          fontSize={"sm"}
        >
          {title}
        </Box>
      )}

      <Flex borderRadius={"md"}>
        <Text fontSize="sm" color="text.main">
          {children}
        </Text>
      </Flex>
    </Flex>
  );
}
