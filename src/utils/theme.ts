import { ChakraTheme, DeepPartial, extendTheme } from "@chakra-ui/react";

export const brandColor = {
  50: "#190500",
  100: "#3b1d0f",
  200: "#60371f",
  300: "#85532d",
  400: "#ab733b",
  500: "#c49354",
  600: "#d2a879",
  700: "#dfbe9d",
  800: "#eed6c1",
  900: "#feeee1",
};

export const bg = {
  50: "#f4f4f0",
  100: "#e0dfd7",
  200: "#cbc8bc",
  300: "#b6b19f",
  400: "#a19882",
  500: "#877c69",
  600: "#695f52",
  700: "#4b433c",
  800: "#2d2723",
  900: "#0f0d0b",
};

export const _theme: DeepPartial<ChakraTheme> = {
  fonts: {
    heading: "Inter Variable, sans-serif",
    body: "Inter Variable, sans-serif",
  },
  colors: {
    brand: brandColor,
    bg,
  },
};

export const theme = extendTheme(_theme) as ChakraTheme;
