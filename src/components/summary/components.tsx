import { ComponentProps } from "react";
import { Box, Button, Flex, useTheme, Text, TextProps } from "@chakra-ui/react";
import { Link } from "gatsby";

export function CTALinkToPricing(props: ComponentProps<typeof Button>) {
  const theme = useTheme();

  return (
    <Link to="/summary#pricing-plans" title="Pricing plans">
      <Button
        px={8}
        py={7}
        variant={"solid"}
        backgroundColor="brand.600"
        _hover={{
          backgroundColor: "brand.500",
        }}
        width={"full"}
        boxShadow={`inset 0 0 0 6px ${theme.colors.brand["800"]}, 0px 5px 15px 0px #00000030`}
        borderRadius={8}
        {...props}
      >
        Get My Insights
      </Button>
    </Link>
  );
}

export function DealRibbon() {
  const color = "pink.100";

  return (
    <Flex flexDirection={"column"} alignItems={"center"} mt={"-8px"} zIndex={1}>
      <Box
        width={0}
        height={0}
        borderLeft={"20px solid transparent"}
        borderRight={"20px solid transparent"}
        borderBottom={`14px solid`}
        borderBottomColor={color}
        ml={100}
      />
      <Text
        px={5}
        py={"3px"}
        backgroundColor={color}
        color="pink.800"
        fontWeight={"bold"}
        fontSize={"small"}
        borderRadius={100}
      >
        Biggest savings with this option!
      </Text>
    </Flex>
  );
}

export function Headline(props: TextProps) {
  return (
    <Text
      fontSize={"2.5rem"}
      lineHeight={1.2}
      fontFamily={"serif"}
      fontWeight={"bold"}
      textAlign={"center"}
      {...props}
    />
  );
}

export function HeadlineHighlight(props: TextProps) {
  return (
    <Text
      as="span"
      backgroundColor={"brand.600"}
      backgroundImage={"linear-gradient(140deg, #dfbc38, brand.400)"}
      backgroundSize={"100%"}
      backgroundRepeat={"repeat"}
      sx={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        MozBackgroundClip: "text",
        MozTextFillColor: "transparent",
      }}
      {...props}
    />
  );
}
