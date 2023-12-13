import { SlideProps } from "../public/types";

export function getSlideProperties(slide: SlideProps) {
  return {
    slideID: slide.id,
    slideIsOptional: slide.optional || false,
    slideType: slide.type,
  };
}
