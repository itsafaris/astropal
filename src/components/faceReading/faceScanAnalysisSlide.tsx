import { FaceDetectionComponent } from "@components/FaceDetectionComponent";
import { useGlobalState2 } from "@components/root/RootWrapper";
import { Slide, useQuiz } from "@martynasj/quiz-lib/index";

export interface IFaceScanAnalysisSlideProps {}

export function FaceScanAnalysisSlide(props: IFaceScanAnalysisSlideProps) {
  const globalState = useGlobalState2();
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="face-scan-analysis" type="filler">
      <FaceDetectionComponent
        imgDataUrl={globalState.faceImageDataUrl}
        onAnalysisComplete={() => {
          submitQuestion();
        }}
      />
    </Slide>
  );
}
