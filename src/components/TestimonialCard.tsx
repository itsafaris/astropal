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
