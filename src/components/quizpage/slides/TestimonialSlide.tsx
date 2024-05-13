import { Slide } from "@martynasj/quiz-lib";
import { StaticImage } from "gatsby-plugin-image";
import { NextButton, SlideHeading, Span } from "../components";
import { Box, Stack, Text } from "@chakra-ui/react";

export function TestimonialSlide() {
  return (
    <Slide id="quote" type="filler">
      <SlideHeading>
        So far, <Span fontWeight={"bold"}>8 out of 10</Span> of our users love their AI astrologers
        💛
      </SlideHeading>

      <Stack spacing={10}>
        <TestimonialSection />

        <Stack
          pt={5}
          position={"sticky"}
          bottom={3}
          width={"100%"}
          bgGradient="linear(to-t, white 60%, transparent)"
        >
          <NextButton position={"sticky"} bottom={3} width={"100%"}>
            Try Yours
          </NextButton>
        </Stack>
      </Stack>
    </Slide>
  );
}

export function TestimonialSection() {
  return (
    <Stack spacing={4}>
      <TestimonialCard
        testimonial={{
          name: "Harper Wilson",
          quote: `Love my astrologer Sophia! I spent entire weekend experimenting and it took me sooooooo deep into my explorations 🙏🙏🙏`,
          question: "",
          avatar: <StaticImage alt="Astropal user image" src={"../../../images/user3.png"} />,
          commentAge: "1d",
        }}
      />

      <TestimonialCard
        testimonial={{
          name: "Josh",
          quote: `3 weeks in and so far it has been pretty spot on 🎯`,
          question: "",
          avatar: <StaticImage alt="Astropal user image" src={"../../../images/user8.png"} />,
          commentAge: "3d",
        }}
      />

      <TestimonialCard
        testimonial={{
          name: "Paige Madison Hartley",
          quote: `well that basically can now replace my astrologer here in Greeley haha 😅`,
          question: "",
          avatar: <StaticImage alt="Astropal user image" src={"../../../images/user1.png"} />,
          commentAge: "7d",
        }}
      />

      <TestimonialCard
        testimonial={{
          name: "Stephanie",
          quote: `I was initially skeptical, but I must now admit that I am thoroughly impressed. The accuracy with which the Luna interprets my birth chart is remarkable. The predictions are also accurate, offers glimpses into potential opportunities and challenges on the horizon`,
          question: "",
          avatar: <StaticImage alt="Astropal user image" src={"../../../images/user7.png"} />,
          commentAge: "7d",
        }}
      />
    </Stack>
  );
}

export type Testimonial = {
  name: string;
  quote: string;
  question: string;
  avatar: React.ReactNode;
  commentAge: string;
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Stack spacing={2} direction={"row"}>
      <Box
        flexShrink={0}
        width={8}
        height={8}
        bg="gray.300"
        borderRadius={"full"}
        overflow={"hidden"}
      >
        {testimonial.avatar}
      </Box>
      <Stack>
        <Stack spacing={0} bg={"gray.200"} px={4} py={2} borderRadius={"14px"}>
          <Text color="black" fontWeight={600} fontSize={"13px"}>
            {testimonial.name}
          </Text>
          <Text color="black" fontSize={"13px"}>
            {testimonial.quote}
          </Text>
        </Stack>

        <Stack px={2} direction={"row"} fontSize={"xs"} color="gray.500" fontWeight={"bold"}>
          <Text color="gray.700" fontWeight={"regular"}>
            {testimonial.commentAge}
          </Text>
          <Text>Like</Text>
          <Text>Reply</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
