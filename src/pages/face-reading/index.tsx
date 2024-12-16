import { Box, Button, Container, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { Span } from "@components/quizpage/components";
import { SEO } from "@components/seo";
import { TopNavigation } from "@components/topnavigation";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ComponentProps } from "react";
import { LuScanFace, LuClock, LuGift, LuArrowRight } from "react-icons/lu";

export function Head() {
  return <SEO />;
}

export interface IFaceReadingLandingPageProps {}

export default function FaceReadingLandingPage(props: IFaceReadingLandingPageProps) {
  return (
    <Box>
      <TopNavigation />

      <Container pt={4} pb={8}>
        <Flex gap={4} justifyContent={"center"} mb={4}>
          <Badge labelText="Rated by real users" text="98.7% Accuracy" icon="🎯" />
          <Badge labelText="20M users' choice" text="4.8 Satisfaction Score" icon="⭐" />
        </Flex>

        <Flex my={4} justifyContent={"center"}>
          <StaticImage
            src="../../images/facereading_lp.jpg"
            placeholder="blurred"
            alt="face reading by Intuvist"
            style={{ borderRadius: 12 }}
            width={520}
            height={440}
          />
        </Flex>

        <Heading textAlign={"center"} fontSize={"2xl"} mt={4}>
          <Span color="brand.500">Find your happines</Span>
          <br />
          <Span fontSize={"2xl"}>with the most accurate face reading</Span>
        </Heading>

        <Flex mt={4} gap={2} justifyContent={"center"} flexWrap={"wrap"}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            borderRadius={"md"}
            backgroundColor={"purple.50"}
            px={[1, 2]}
            gap={1}
          >
            <Icon as={LuClock} boxSize="12px" />
            <Text fontSize={["xs", "sm"]} fontWeight={"semibold"} color={"purple.700"}>
              1-min quiz
            </Text>
          </Stack>

          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            borderRadius={"md"}
            backgroundColor={"purple.50"}
            px={[1, 2]}
            gap={1}
          >
            <Icon as={LuScanFace} boxSize="12px" />
            <Text fontSize={["xs", "sm"]} fontWeight={"semibold"} color={"purple.700"}>
              Face scan
            </Text>
          </Stack>

          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            borderRadius={"md"}
            backgroundColor={"purple.50"}
            px={[1, 2]}
            gap={1}
          >
            <Icon as={LuGift} boxSize="12px" />
            <Text fontSize={["xs", "sm"]} fontWeight={"semibold"} color={"purple.700"}>
              Personalized guide
            </Text>
          </Stack>
        </Flex>

        <Button
          as={Link}
          display={"flex"}
          to="quiz"
          size="lg"
          border="4px solid"
          borderColor={"brand.400"}
          textDecoration={"none"}
          mt={6}
          mb={10}
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
            By continuing, I agree to <Link to="/privacy-policy">Intuvist's Privacy Policy</Link>{" "}
            and <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </Text>
          <Text my={2} fontSize={"xs"} textAlign={"center"}>
            © Intuvist, 2024
          </Text>
          <Text my={2} fontSize={"xs"} textAlign={"center"} color={"gray.400"}>
            For entertainment purposes only
          </Text>
        </Box>
      </Container>
    </Box>
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
    <Flex display={"inline-flex"} alignItems={"center"} borderRadius={"lg"} gap={2} {...rest}>
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
