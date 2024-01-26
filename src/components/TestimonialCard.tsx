import React from "react";
import { Box, Text, Stack } from "@chakra-ui/react";

export type Testimonial = {
  name: string;
  quote: string;
  question: string;
  avatar: React.ReactNode;
  commentAge: string;
};

export const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Box color="black" boxShadow={"lg"} p={4} bg="white">
      <Stack spacing={2} direction={"row"}>
        <Box
          flexShrink={0}
          width={8}
          height={8}
          bg="blue"
          borderRadius={"full"}
          overflow={"hidden"}
        >
          {testimonial.avatar}
        </Box>
        <Stack>
          <Stack spacing={0} bg={"gray.100"} px={3} py={2} borderRadius={18}>
            <Text color="black" fontWeight={600} fontSize={"xs"}>
              {testimonial.name}
            </Text>
            <Text fontSize={"xs"}>{testimonial.quote}</Text>
          </Stack>
          <Stack px={2} direction={"row"} fontSize={"xs"} color="gray.500" fontWeight={"bold"}>
            <Text color="gray.700" fontWeight={"thin"}>
              {testimonial.commentAge}
            </Text>
            <Text>Like</Text>
            <Text>Reply</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
