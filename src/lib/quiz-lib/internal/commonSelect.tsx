import { Flex, Grid } from "@chakra-ui/react";

import { useSlide } from "../public/slide";
import { OptionPropsCommon, SlideProps, SlidePropsMulti, SlidePropsSingle } from "../public/types";
import { OptionSimple, OptionWithPicture } from "./option";
import { SelectorValue } from "./state";

export type OptionRendererProps = {
  handleOptionClick: (value: SelectorValue) => void;
  isOptionSelected: (optionID: string) => boolean;
};

function getOptionID(slide: SlideProps, option: OptionPropsCommon) {
  return slide.id + "/" + option.text;
}

export function CommonSelect({ handleOptionClick, isOptionSelected }: OptionRendererProps) {
  const slideCtx = useSlide() as SlidePropsMulti | SlidePropsSingle;

  if (slideCtx.variant === "list") {
    return (
      <Flex width={"full"} flexDir={"column"} gap={3}>
        {slideCtx.options?.map((option, idx) => {
          const optionID = getOptionID(slideCtx, option);
          const optionValue: SelectorValue = {
            id: optionID,
            idx,
            value: option.text,
          };
          return (
            <OptionSimple
              key={optionID}
              isSelected={isOptionSelected(optionID)}
              onClick={() => handleOptionClick(optionValue)}
              text={option.text}
              icon={option.icon}
              selectorIconType={slideCtx.type === "single" ? "radio" : "checkbox"}
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
        const optionID = getOptionID(slideCtx, option);
        const optionValue: SelectorValue = { id: optionID, idx, value: option.text };
        return (
          <OptionWithPicture
            key={optionID}
            isSelected={isOptionSelected(optionID)}
            onClick={() => handleOptionClick(optionValue)}
            text={option.text}
            imgHeight={imgHeight}
            imgComponent={option.imgComponent}
          />
        );
      })}
    </Grid>
  );
}
