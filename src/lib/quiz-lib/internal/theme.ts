import { extendTheme } from "@chakra-ui/theme-utils";
import { QuizTheme } from "../public/types";

export const chakraTheme = (quizTheme: QuizTheme) =>
  extendTheme({
    colors: {
      brand: quizTheme.mainColor,
    },
  });
