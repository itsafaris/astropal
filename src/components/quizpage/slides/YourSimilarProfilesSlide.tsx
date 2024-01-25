import React, { Fragment, createElement, useState } from "react";
import { Callout, Selector, Slide, Title, useQuiz } from "@martynasj/quiz-lib";
import { Text, Box, useTheme, Flex, Image, Stack } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

import colorMap from "@images/color_map.png";
import orbGif from "@images/orb_animated_2.gif";

import { TestimonialCard } from "@components/testimonial";
import { StaticImage } from "gatsby-plugin-image";

import { getPersonalInfoFromState } from "@utils/state";

import { Span, Subtitle } from "../components";

export function YourSimilarProfilesSlide() {
  const theme = useTheme();
  return (
    <Slide id="similar-profiles" type="filler">
      {({ quizState }) => {
        const { yourZodiac, yourGender } = getPersonalInfoFromState(quizState);

        return (
          <Fragment>
            <Title textAlign={"center"}>{`We helped other ${yourZodiac.name} ${
              !yourGender ? "" : yourGender === "Other" ? "people" : yourGender.toLowerCase() + "s"
            } like you`}</Title>
            <Subtitle textAlign={"center"} color="bg.600">
              We are currently guiding <Span>{yourZodiac.countOfProfiles.toLocaleString()}</Span>{" "}
              people with profiles similar to yours, who report an average <Span>2x</Span>{" "}
              improvement in their relationships after just <Span>two weeks</Span> using our service
            </Subtitle>

            <Flex p={8} gap={2} flexDirection={"column"}>
              {yourZodiac.svgComponent &&
                createElement(yourZodiac.svgComponent, {
                  height: 160,
                  width: "100%",
                  fill: theme.colors.bg["200"],
                  stroke: theme.colors.bg["600"],
                  strokeWidth: 2,
                })}
              <Text
                fontSize={"3xl"}
                fontWeight={"semibold"}
                textAlign={"center"}
                fontFamily={"cursive"}
                color="brand.500"
              >
                {yourZodiac.name}
              </Text>
            </Flex>
          </Fragment>
        );
      }}
    </Slide>
  );
}
