import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { Span } from "@components/quizpage/components";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ComponentProps } from "react";

import { LuScanFace, LuClock, LuGift, LuArrowRight } from "react-icons/lu";

export interface IFaceReadingLandingPageProps {}

export default function FaceReadingLandingPage(props: IFaceReadingLandingPageProps) {
  return (
    <Container pt={4} pb={8}>
      <Flex gap={4} justifyContent={"center"} mb={4}>
        <Badge labelText="Rated by real users" text="98.7% Accuracy" icon="🎯" />
        <Badge labelText="20M users' choice" text="4.8 Satisfaction Score" icon="⭐" />
      </Flex>

      <Box my={8}>
        <StaticImage
          src="../../images/facereading_lp.png"
          placeholder="blurred"
          alt="face reading by astropal"
          style={{ borderRadius: 12 }}
          width={600}
          height={440}
        />
      </Box>

      <Heading textAlign={"center"} fontSize={"2xl"} mt={4}>
        <Span color="brand.500">Find your happines</Span>
        <br />
        <Span fontSize={"2xl"}>with the most accurate face reading</Span>
      </Heading>
      <Flex mt={4} gap={2} justifyContent={"center"} flexWrap={"wrap"}>
        <Tag size={"sm"} colorScheme="blue">
          <TagLeftIcon mr={1} boxSize="12px" as={LuClock} />
          <TagLabel>1-min quiz</TagLabel>
        </Tag>
        <Tag size={"sm"} colorScheme="blue">
          <TagLeftIcon mr={1} boxSize="12px" as={LuScanFace} />
          <TagLabel>Face scan</TagLabel>
        </Tag>
        <Tag size={"sm"} colorScheme="blue">
          <TagLeftIcon mr={1} boxSize="12px" as={LuGift} />
          <TagLabel>Personalized guide</TagLabel>
        </Tag>
      </Flex>

      <Button
        as={Link}
        display={"flex"}
        to="quiz"
        size="lg"
        border="4px solid"
        borderColor={"brand.400"}
        textDecoration={"none"}
        my={10}
        mx="auto"
        width={"full"}
        maxWidth={"md"}
        colorScheme="brand"
        rightIcon={<LuArrowRight />}
      >
        Let's Begin
      </Button>

      <Box>
        <Text fontSize={"xs"} textAlign={"center"}>
          By continuing, I agree to <Link to="/privacy-policy">Astropal's Privacy Policy</Link> and{" "}
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
        </Text>
        <Text my={2} fontSize={"xs"} textAlign={"center"}>
          © Astropal, 2024
        </Text>
      </Box>
    </Container>
  );
}

export interface BadgeProps {
  labelText: string;
  text: string;
  icon: string;
}

export function Badge({
  icon,
  labelText,
  text,
  ...rest
}: BadgeProps & ComponentProps<typeof Flex>) {
  return (
    <Flex
      display={"inline-flex"}
      px={2}
      pr={3}
      alignItems={"center"}
      border="1px solid"
      borderColor={"brand.600"}
      borderRadius={"lg"}
      gap={2}
      {...rest}
    >
      <Text fontSize={"2xl"} lineHeight={1.5}>
        {icon}
      </Text>
      <Flex flexDirection={"column"} justifyContent={"center"}>
        <Text fontSize={"2xs"} lineHeight={1.2}>
          {labelText}
        </Text>
        <Text fontSize={"2xs"} fontWeight={"bold"} lineHeight={1.2}>
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}
