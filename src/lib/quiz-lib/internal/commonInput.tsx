import { InputProps, SelectProps } from "@chakra-ui/react";

export function commonInputStyles() {
  return {
    size: "lg",
    _hover: {
      borderColor: "bg.600",
    },
    _placeholder: {
      color: "text.400",
    },
    borderColor: "bg.600",
    borderWidth: 1,
    backgroundColor: "bg.200",
    color: "text.main",
  } satisfies InputProps | SelectProps;
}
