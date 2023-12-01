import { Box, Text } from "@chakra-ui/react";

type ITestimonial = {
  authorName: string;
  text: string;
  rating: number;
  imgComponent: React.ReactNode;
};

export function TestimonialCard({
  testimonial,
}: {
  testimonial: ITestimonial;
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="4"
      width="100%"
      color="white"
    >
      <Rating value={testimonial.rating} />
      <Box display="flex" flexDirection="row" gap={4}>
        <Text
          height={"100%"}
          fontSize={40}
          fontWeight={700}
          fontFamily={"serif"}
          alignSelf={"flex-start"}
          color="inherit"
        >
          “
        </Text>
        <Text
          fontSize="medium"
          fontStyle="italic"
          fontWeight="light"
          color="inherit"
        >
          {testimonial.text}
        </Text>
        <Text
          height={"100%"}
          fontSize={40}
          fontWeight={700}
          fontFamily={"serif"}
          alignSelf={"flex-end"}
          color="inherit"
        >
          „
        </Text>
      </Box>

      <Box
        width="full"
        display="flex"
        alignItems="center"
        gap="4"
        flexDirection={"column"}
      >
        <Box display="flex" flexDirection="column" alignItems="start" gap="1">
          <Text
            fontWeight="semibold"
            width={"full"}
            textAlign={"center"}
            color="inherit"
          >
            {testimonial.authorName}
          </Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"50%"}
          overflow={"hidden"}
          height={150}
          width={150}
        >
          {testimonial.imgComponent}
        </Box>

        {/* <Rating value={testimonial.rating} /> */}
      </Box>
    </Box>
  );
}

import { StarIcon } from "@chakra-ui/icons";

export function Rating({ value }: { value: number }) {
  const maxCount = 5;
  const fullCount = value >= maxCount ? maxCount : Math.floor(value);
  const emptyCount = maxCount - fullCount;

  return (
    <Box display="flex" alignItems="center" gap="1" height="4">
      {[...Array(fullCount)].map((_, idx) => (
        <StarIcon
          key={idx}
          boxSize={5}
          color="orange"
          stroke="4"
          fill="orange"
        />
      ))}
      {[...Array(emptyCount)].map((_, idx) => (
        <StarIcon
          key={idx}
          boxSize={5}
          color="#cbcbcb"
          stroke="4"
          fill="#cbcbcb"
        />
      ))}
    </Box>
  );
}
