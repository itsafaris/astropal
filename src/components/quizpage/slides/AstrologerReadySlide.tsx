import React, { createElement } from "react";
import { Slide } from "@martynasj/quiz-lib";
import { Text, useTheme, Flex } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

import orbGif from "@images/orb_animated_2.gif";

import { StaticImage } from "gatsby-plugin-image";

import { getPersonalInfoFromState } from "@utils/state";

import { NextButton } from "../components";
import { navigate } from "gatsby";

export function AstrologerReadySlide() {
  return (
    <Slide id="astrologer-ready" type="filler">
      {({ quizState }) => {
        const { yourZodiac, firstName } = getPersonalInfoFromState(quizState);
        const theme = useTheme();

        return (
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Flex my={8} flexDirection={"row"} justifyContent={"center"}>
              <Flex
                borderRadius={"full"}
                overflow={"hidden"}
                height={"250px"}
                width={"250px"}
                boxShadow={"inset 0 0 50px 0 #d2890052, 0 0 50px 0 #d289006e"}
                position={"relative"}
              >
                <Flex
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
                </Flex>

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

                <StaticImage style={{ opacity: 1 }} alt="" src="../../images/astro-avatar.png" />
              </Flex>
            </Flex>

            <Text
              fontWeight="bold"
              textAlign={"center"}
              width={"full"}
              fontSize={"2xl"}
              color="white"
            >
              {firstName}, <br />
              Your Astrological Profile <br /> Is Ready
            </Text>

            <Text
              my={2}
              textAlign={"center"}
              width={"full"}
              fontSize={"md"}
              color={"whiteAlpha.600"}
            >
              Know more about yourself.
            </Text>

            <ArrowDownIcon mb={6} color="whiteAlpha.600" fontSize={"3xl"} />

            <NextButton onClick={() => navigate("/summary")}>Show me results</NextButton>
          </Flex>
        );
      }}
    </Slide>
  );
}
