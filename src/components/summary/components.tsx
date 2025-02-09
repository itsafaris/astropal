import { ComponentProps } from "react";
import { Box, Button, Flex, useTheme, Text, TextProps } from "@chakra-ui/react";
import { Link } from "gatsby";
import { trackPosthogEvent } from "@utils/tracking";

export function CTALinkToPricing({ children, ...rest }: ComponentProps<typeof Button>) {
  return (
    <Link to="/summary#pricing-plans" title="Pricing plans">
      <CTAButton
        onClick={() => {
          trackPosthogEvent({
            name: "cta-click",
            properties: {
              id: rest.id,
            },
          });
        }}
        {...rest}
      >
        {children ?? "Start Now"}
      </CTAButton>
    </Link>
  );
}

export function CTAButton(props: ComponentProps<typeof Button>) {
  const theme = useTheme();
  return (
    <Button
      px={8}
      py={7}
      variant={"solid"}
      backgroundColor="brand.500"
      bgGradient={"linear-gradient(140deg, #dfbc38, brand.500)"}
      _hover={{
        bgGradient: "linear-gradient(140deg, #dfbc38, brand.400)",
      }}
      width={"full"}
      boxShadow={`inset 0 0 0 3px ${theme.colors.brand["800"]}, 0px 5px 15px 0px #00000030`}
      borderRadius={8}
      {...props}
    />
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
      color="bg.500"
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

export function InvertedHighlight(props: TextProps) {
  return (
    <Text
      as="span"
      // backgroundColor={"brand.600"}
      backgroundImage={"linear-gradient(140deg, brand.500, brand.800)"}
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
