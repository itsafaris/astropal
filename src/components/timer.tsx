import React from "react";

import { Flex, Text } from "@chakra-ui/react";
import { useRootState } from "./wrappers/RootWrapper";

function formatTimestamp(timestamp: number): {
  minutes: string;
  seconds: string;
} {
  return {
    minutes: Math.floor(timestamp / 60000)
      .toString()
      .padStart(2, "0"),
    seconds: Math.floor((timestamp % 60000) / 1000)
      .toString()
      .padStart(2, "0"),
  };
}

export function Timer() {
  const { offerTime, setOfferTime } = useRootState();
  const [time, setTime] = React.useState(offerTime);

  React.useEffect(() => {
    let time = offerTime;

    const timer = setInterval(() => {
      setTime((t) => {
        time = t;
        if (t <= 0) {
          clearInterval(timer);
          return t;
        }

        return t - 1000;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      setOfferTime(time);
    };
  }, []);

  const readableTime = formatTimestamp(time);

  return (
    <Flex
      display={"inline-flex"}
      flexDirection="row"
      alignItems="center"
      justifyContent="start"
      width={"60px"}
      color="inherit"
    >
      <Flex flexDirection="column" alignItems="center" justifyContent={"center"} gap={0}>
        <Text fontWeight="bold" fontSize={"xl"} lineHeight={1} textAlign={"center"}>
          {readableTime.minutes}
        </Text>
      </Flex>

      <Text fontWeight={"bold"} fontSize={"xl"} lineHeight={1}>
        :
      </Text>

      <Flex flexDirection="column" alignItems="center" justifyContent={"center"} gap={0}>
        <Text fontWeight="bold" fontSize={"xl"} lineHeight={1} textAlign={"center"}>
          {readableTime.seconds}
        </Text>
      </Flex>
    </Flex>
  );
}
