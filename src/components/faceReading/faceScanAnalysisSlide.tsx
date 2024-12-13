import { Box } from "@chakra-ui/react";
import { FaceDetectionComponent } from "@components/FaceDetectionComponent";
import { NextButton } from "@components/quizpage/components";
import { useRootState } from "@components/wrappers/RootWrapper";
import { Slide } from "@martynasj/quiz-lib/index";
import { isProdMode } from "@utils/isProdMode";
import posthog from "posthog-js";
import React, { useEffect, useState } from "react";

export interface IFaceScanAnalysisSlideProps {}

export function FaceScanAnalysisSlide(props: IFaceScanAnalysisSlideProps) {
  return (
    <Slide id="face-scan-analysis" type="filler">
      <FaceScanAnalysisContent />
    </Slide>
  );
}

function FaceScanAnalysisContent() {
  const [isComplete, setIsComplete] = useState(false);
  const { faceImageDataUrl } = useRootState();

  useEffect(() => {
    posthog.stopSessionRecording();
    return () => {
      if (isProdMode()) {
        posthog.startSessionRecording();
      }
    };
  }, []);

  return (
    <React.Fragment>
      <Box mb={4} mt={-3}>
        <FaceDetectionComponent
          imgDataUrl={faceImageDataUrl}
          onAnalysisComplete={() => {
            setIsComplete(true);
          }}
        />
      </Box>
      {isComplete && <NextButton>Continue</NextButton>}
    </React.Fragment>
  );
}
