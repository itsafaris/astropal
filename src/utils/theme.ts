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
  0: "#000",
  50: "#051215",
  100: "#092025",
  150: "#0D2E35",
  200: "#113C45",
  250: "#154A55",
  300: "#195865",
  350: "#1D6675",
  400: "#217485",
  450: "#258295",
  500: "#258FA7",
  550: "#3B9BB0",
  600: "#51A7B9",
  650: "#67B3C2",
  700: "#7DBFCB",
  750: "#93CBD4",
  800: "#A9D7DD",
  850: "#BFE3E6",
  900: "#D5EFEF",
  950: "#EAF7FA",
  1000: "#FFFFFF",
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
