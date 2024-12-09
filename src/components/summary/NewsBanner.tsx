import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const fadeInOut = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  10% { opacity: 1; transform: scale(1); }
  90% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.95); }
`;

interface NewsBannerProps {
  items: Array<{ name: string; text: string; highlightedText: string }>;
}

export const NewsBanner: React.FC<NewsBannerProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  const { name, text, highlightedText } = items[currentIndex];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
      backgroundColor={"brand.50"}
      py={3}
    >
      <Text key={currentIndex} fontSize="xs" animation={`${fadeInOut} 4s ease-in-out infinite`}>
        <Text as="span" fontWeight={"bold"}>
          {name}
        </Text>{" "}
        {text}{" "}
        <Text as="span" fontWeight={"bold"} color={"brand.500"}>
          {highlightedText}
        </Text>
      </Text>
    </Box>
  );
};
