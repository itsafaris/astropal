import { Quiz, QuizProps } from "@martynasj/quiz-lib";

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

export function QuizWrapper(props: Omit<QuizProps, "locationApiKey">) {
  return (
    <Quiz
      showDebugUI
      containerProps={{
        minH: "100vh",
      }}
      // headerComponent={
      //   <Text
      //     p={3}
      //     bg={"white"}
      //     fontSize={"2xl"}
      //     textAlign={"center"}
      //     fontWeight={"bold"}
      //     fontFamily={"mono"}
      //     colorScheme={"brand"}
      //   >
      //     AstroPal
      //   </Text>
      // }
      onErrorEvent={(_) => {
        //
      }}
      {...props}
      locationApiKey={locationApiKey}
    />
  );
}
