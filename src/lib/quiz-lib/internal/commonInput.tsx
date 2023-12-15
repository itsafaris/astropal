import { InputProps, SelectProps } from "@chakra-ui/react";

export function commonInputStyles() {
  return {
    size: "lg",
    _hover: {
      borderColor: "bg.600",
    },
    _placeholder: {
      color: "bg.600",
    },
    borderColor: "bg.600",
    borderWidth: 1,
    backgroundColor: "bg.200",
    color: "bg.900",
  } satisfies InputProps | SelectProps;
}
