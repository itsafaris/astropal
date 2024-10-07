import { Box } from "@chakra-ui/react";
import { FaceDetectionComponent } from "@components/FaceDetectionComponent";
import { NextButton } from "@components/quizpage/components";
import { useGlobalState2 } from "@components/wrappers/RootWrapper";
import { Slide } from "@martynasj/quiz-lib/index";
import { useState } from "react";

export interface IFaceScanAnalysisSlideProps {}

export function FaceScanAnalysisSlide(props: IFaceScanAnalysisSlideProps) {
  const [isComplete, setIsComplete] = useState(false);
  const globalState = useGlobalState2();

  return (
    <Slide id="face-scan-analysis" type="filler">
      <Box mb={4} mt={-3}>
        <FaceDetectionComponent
          imgDataUrl={globalState.faceImageDataUrl}
          onAnalysisComplete={() => {
            setIsComplete(true);
          }}
        />
      </Box>
      {isComplete && <NextButton>Continue</NextButton>}
    </Slide>
  );
}
