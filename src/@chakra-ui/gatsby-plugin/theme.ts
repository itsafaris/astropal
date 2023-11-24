import { ChakraTheme, DeepPartial, extendTheme } from "@chakra-ui/react";

const theme: DeepPartial<ChakraTheme> = {
  fonts: {
    heading: "Inter Variable, sans-serif",
    body: "Inter Variable, sans-serif",
  },
};

export default extendTheme(theme);
