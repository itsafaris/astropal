import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { PricingSection } from "@components/pricing";
import { TopNavigation } from "@components/topnavigation";
import orbGif from "@images/orb_animated_2.gif";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

export interface IPricingPageProps {}

export default function PricingPage() {
  return (
    <Box py={4} bg="bg.100" color="bg.900">
      <Container>
        <TopNavigation />

        <Heading fontSize={"3xl"} mb={3} mx={4} textAlign={"center"}>
          Unlock Long-Awaited Answers To Your Burning Questions
        </Heading>

        <Flex flexDirection={"column"} alignItems={"center"}>
          <Flex my={8} flexDirection={"row"} justifyContent={"center"}>
            <Flex
              borderRadius={"full"}
              overflow={"hidden"}
              height={"200px"}
              width={"200px"}
              boxShadow={"inset 0 0 50px 0 #d2890052, 0 0 50px 0 #d289006e"}
              position={"relative"}
            >
              {/* <Flex
                  flexDirection={"column"}
                  position={"absolute"}
                  zIndex={10}
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >
                  {yourZodiac.svgComponent &&
                    createElement(yourZodiac.svgComponent, {
                      height: 150,
                      width: 150,
                      stroke: "#f2bf79",
                      fill: theme.colors.bg["100"],
                      strokeWidth: 4,
                    })}
                </Flex> */}

              <Flex
                borderRadius={"full"}
                overflow={"hidden"}
                height={"250px"}
                width={"250px"}
                position={"absolute"}
                zIndex={-1}
                boxShadow={"0 0 20px 0 black"}
                opacity={0.4}
              >
                <img src={orbGif} />
              </Flex>

              <StaticImage style={{ opacity: 1 }} alt="" src="../images/astro-avatar.png" />
            </Flex>
          </Flex>
        </Flex>

        <Heading fontSize={"3xl"} textAlign={"center"} mb={4}>
          Choose your plan
        </Heading>

        <PricingSection />
      </Container>
    </Box>
  );
}
