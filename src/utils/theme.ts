import { ChakraTheme, DeepPartial, extendTheme } from "@chakra-ui/react";

export const brandColor = {
  50: "#ffe7db",
  100: "#ffc2af",
  200: "#ffa07e",
  300: "#ff824c",
  400: "#ff651a",
  500: "#e65400",
  600: "#b43400",
  700: "#811d00",
  800: "#4f0a00",
  900: "#210003",
};

export const bg = {
  50: "#FFFFFF",
  100: "#F5EEE5",
  200: "#F2E9DE",
  300: "#EFE4D7",
  400: "#ECDFD0",
  500: "#E9DAC9",
  600: "#E6D5C2",
  700: "#E3D0BB",
  800: "#E0CBB4",
  900: "#DFC9AA",
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
