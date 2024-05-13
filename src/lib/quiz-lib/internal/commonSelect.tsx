import { Flex, Grid } from "@chakra-ui/react";

import { useSlide } from "../public/slide";
import { OptionPropsCommon, SlidePropsMulti, SlidePropsSingle } from "../public/types";
import { OptionSimple, OptionWithPicture } from "./option";
import { SelectorValue } from "./state";

export type OptionRendererProps = {
  handleOptionClick: (value: SelectorValue) => void;
  isOptionSelected: (value: SelectorValue) => boolean;
};

function getOptionValue(option: OptionPropsCommon) {
  return option.value ?? option.text;
}

export function CommonSelect({ handleOptionClick, isOptionSelected }: OptionRendererProps) {
  const slideCtx = useSlide() as SlidePropsMulti | SlidePropsSingle;

  if (slideCtx.variant === "list") {
    const dir = slideCtx.direction ?? "column";
    return (
      <Flex width={"full"} flexDir={dir} flexWrap={dir === "row" ? "wrap" : undefined} gap={3}>
        {slideCtx.options?.map((option, idx) => {
          const value = getOptionValue(option);
          const optionValue: SelectorValue = {
            value: value,
            idx,
          };
          return (
            <OptionSimple
              key={value}
              isSelected={isOptionSelected(optionValue)}
              onClick={() => handleOptionClick(optionValue)}
              text={option.text}
              icon={option.icon}
              selectorIconType={slideCtx.type === "single" ? "radio" : "checkbox"}
              size={slideCtx.size}
              {...option.styleProps}
            />
          );
        })}
      </Flex>
    );
  }

  const columns = slideCtx.size === "small" ? 3 : 2;
  const imgHeight = slideCtx.size === "small" ? 100 : 160;

  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={3}>
      {slideCtx.options?.map((option, idx) => {
        const value = getOptionValue(option);
        const optionValue: SelectorValue = { value: value, idx };
        return (
          <OptionWithPicture
            key={value}
            isSelected={isOptionSelected(optionValue)}
            onClick={() => handleOptionClick(optionValue)}
            text={option.text}
            imgHeight={imgHeight}
            imgComponent={option.imgComponent}
            hideText={slideCtx.hideText}
            {...option.styleProps}
          />
        );
      })}
    </Grid>
  );
}
