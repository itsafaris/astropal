import { ChakraTheme, DeepPartial, extendTheme } from "@chakra-ui/react";

export const brandColor = {
  50: "#ede7ff",
  100: "#c6bafc",
  200: "#a08df3",
  300: "#7a5fed",
  400: "#5432e7",
  500: "#3a18cd",
  600: "#2c12a1",
  700: "#1f0d74",
  800: "#110747",
  900: "#06021e",
};

export const _theme: DeepPartial<ChakraTheme> = {
  fonts: {
    heading: "Inter Variable, sans-serif",
    body: "Inter Variable, sans-serif",
  },
  colors: {
    brand: brandColor,
  },
};

export const theme = extendTheme(_theme) as ChakraTheme;
