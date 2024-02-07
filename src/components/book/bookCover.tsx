import React from "react";
import { Box, Text, VStack, Heading } from "@chakra-ui/react";

export const BookCover = ({ title, author, subtitle }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      bg="gray.100"
      boxShadow="2xl"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: "5px",
        bottom: "5px",
        left: "5px",
        right: "5px",
        bg: "white",
        transform: "rotate(2deg)",
        zIndex: -1,
        borderRadius: "lg",
      }}
    >
      <VStack align="flex-start">
        <Heading as="h3" size="lg" lineHeight="tight" noOfLines={2} mb={2}>
          {title}
        </Heading>
        {subtitle && (
          <Text fontSize="sm" color="gray.500" noOfLines={1} mb={4}>
            {subtitle}
          </Text>
        )}
        <Text fontSize="md" fontWeight="bold">
          by {author}
        </Text>
      </VStack>
    </Box>
  );
};
