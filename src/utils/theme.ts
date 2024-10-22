import { ChakraTheme, DeepPartial, extendTheme } from "@chakra-ui/react";

export const brandColor = {
  "50": "#f9f6fe",
  "100": "#f1ebfc",
  "200": "#e6dbf9",
  "300": "#ceb8f3",
  "400": "#b694ec",
  "500": "#9a6be1",
  "600": "#834cd1",
  "700": "#6e39b7",
  "800": "#5e3396",
  "900": "#4d2a79",
};

export const bg = {
  50: "#FAF9FA",
  100: "#F6F4F6",
  200: "#EDE8ED",
  300: "#E6E0E6",
  400: "#DDD4DD",
  500: "#BEACBE",
  600: "#9E859E",
  700: "#785F78",
  800: "#503F50",
  900: "#282028",
};

export const text = {
  main: "black",
  invert: "white",
  50: "#eceffe",
  100: "#d3d6e1",
  200: "#b8bbc7",
  300: "#9da1af",
  400: "#828897",
  500: "#686e7d",
  600: "#505762",
  700: "#383d47",
  800: "#20232d",
  900: "#060916",
};

export const _theme: DeepPartial<ChakraTheme> = {
  fonts: {
    heading: "Inter Variable, sans-serif",
    body: "Inter Variable, sans-serif",
  },
  colors: {
    brand: brandColor,
    bg,
    text,
  },
};

export const theme = extendTheme(_theme) as ChakraTheme;
