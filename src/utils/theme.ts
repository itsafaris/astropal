import { ChakraTheme, DeepPartial, extendTheme } from "@chakra-ui/react";

export const brandColor = {
  50: "#ffe8f1",
  100: "#f0c4d1",
  200: "#e09fb2",
  300: "#d27a93",
  400: "#c45574",
  500: "#aa3b5a",
  600: "#852d46",
  700: "#611f32",
  800: "#3c111e",
  900: "#1b020a",
};

export const secondary = {
  50: "#e8f8ff",
  100: "#c8ddea",
  200: "#a8c2d7",
  300: "#86a8c5",
  400: "#658cb4",
  500: "#4b709a",
  600: "#3a5579",
  700: "#284057",
  800: "#162937",
  900: "#011118",
};

export const _theme: DeepPartial<ChakraTheme> = {
  fonts: {
    heading: "Inter Variable, sans-serif",
    body: "Inter Variable, sans-serif",
  },
  colors: {
    brand: brandColor,
    secondary,
  },
};

export const theme = extendTheme(_theme) as ChakraTheme;
