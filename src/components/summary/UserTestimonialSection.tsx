import { Text, Stack } from "@chakra-ui/react";
import { TestimonialCard } from "@components/TestimonialCard";

import { StaticImage } from "gatsby-plugin-image";
import { Headline } from "./components";

export function UserTestimonialSection() {
  return (
    <Stack spacing={7} id="product-section">
      <Headline color="black">
        Hear What <br /> Our User's Say
      </Headline>

      <StaticImage
        alt=""
        src="../../images/art-1.png"
        style={{ width: 110, opacity: 1, marginLeft: "auto", marginRight: "auto" }}
      />

      <TestimonialCard
        testimonial={{
          name: "Harper Wilson",
          quote: `Hi Astropal, I love your program! I spent the entire weekend experimenting, and it took me sooooooo deep into my explorations.🙏🙏🙏`,
          question: "",
          avatar: <StaticImage alt="Astropal user image" src="../../images/user3.png" />,
          commentAge: "1d",
        }}
      />

      <TestimonialCard
        testimonial={{
          name: "Josh",
          quote: `Bought this. Worth every penny.`,
          question: "",
          avatar: <StaticImage alt="Astropal user image" src="../../images/user8.png" />,
          commentAge: "3d",
        }}
      />

      <TestimonialCard
        testimonial={{
          name: "Stephanie",
          quote: `I have always been a bit skeptical about astrology, but after diving into the world of
        horoscopes and birth charts, I must say that I am thoroughly impressed. ASMP
        has been a revelation, providing me with valuable insights into various aspects of my life.
        The accuracy with which the astrologer interpreted my birth chart was truly remarkable. It
        felt like a personalized roadmap, guiding me through the intricacies of my personality,
        strengths, and areas for growth. The predictions were surprisingly on point, offering a
        glimpse into potential opportunities and challenges on the horizon ❤️
        
        What I appreciate most
        about astrology is its holistic approach to self-discovery. It goes beyond the superficial and
        delves into the depths of one's psyche. The guidance provided has been a source of comfort and
        motivation during uncertain times, helping me navigate life's twists and turns with a newfound
        sense of purpose`,
          question: "",
          avatar: <StaticImage alt="Astropal user image" src="../../images/user7.png" />,
          commentAge: "7d",
        }}
      />
    </Stack>
  );
}
