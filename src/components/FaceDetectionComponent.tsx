import { Box, Flex, Icon, Image, Progress, Text } from "@chakra-ui/react";
import { DrawingUtils, FaceLandmarker, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import * as React from "react";
import { useServices } from "./root/RootWrapper";
import { dataUrlToHtmlImageElement } from "@utils/image";
import { FaCheck } from "react-icons/fa";

export interface IFaceDetectionComponentProps {
  imgDataUrl?: string;
  onAnalysisComplete?: () => void;
}

type FaceReadingStateInitial = {
  type: "initial";
  faceLandmarkerResult?: FaceLandmarkerResult;
};

type FaceReadingStateScanning = {
  type: "scanning";
  faceLandmarkerResult?: FaceLandmarkerResult;
};

type FaceReadingStateInterpreting = {
  type: "interpreting";
  phase: number;
  faceLandmarkerResult?: FaceLandmarkerResult;
};

type FaceReadingStateDone = {
  type: "done";
  faceLandmarkerResult?: FaceLandmarkerResult;
};

type FaceReadingState =
  | FaceReadingStateInitial
  | FaceReadingStateScanning
  | FaceReadingStateInterpreting
  | FaceReadingStateDone;

export function FaceDetectionComponent({
  imgDataUrl,
  onAnalysisComplete,
}: IFaceDetectionComponentProps) {
  const scanningAnimationDuration = 5;

  const $canvas = React.useRef<HTMLCanvasElement>(null);
  const { faceLandmarker } = useServices();

  const [faceReadingState, setFaceReadingState] = React.useState<FaceReadingState>({
    type: "initial",
  });

  React.useEffect(() => {
    if (!faceReadingState.faceLandmarkerResult) {
      return;
    }
    drawResults(faceReadingState.faceLandmarkerResult);
  }, [faceReadingState.faceLandmarkerResult]);

  React.useEffect(() => {
    if (!imgDataUrl) {
      return;
    }
    if (!faceLandmarker) {
      return;
    }
    setFaceReadingState({ type: "scanning", faceLandmarkerResult: undefined });
    dataUrlToHtmlImageElement(imgDataUrl).then((img) => {
      detectFeatures(img);
    });
  }, [imgDataUrl, faceLandmarker]);

  async function drawResults(result: FaceLandmarkerResult) {
    const canvas = $canvas.current;
    if (!canvas) {
      console.error("canvas element not found");
      return;
    }

    canvas.setAttribute("width", $canvas.current.clientHeight + "px");
    canvas.setAttribute("height", $canvas.current.clientWidth + "px");

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("canvas ctx not found");
      return;
    }

    const drawingUtils = new DrawingUtils(ctx);

    for (const landmarks of result.faceLandmarks) {
      const c1 = "#07bfc4b3";
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
        color: "#07bfc421",
        lineWidth: 1,
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, {
        color: c1,
        lineWidth: 1,
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, {
        color: c1,
        lineWidth: 1,
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, {
        color: c1,
        lineWidth: 1,
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, {
        color: c1,
        lineWidth: 1,
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, {
        color: c1,
        lineWidth: 1,
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, {
        color: c1,
        lineWidth: 1,
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
        color: c1,
        lineWidth: 1,
      });
    }
  }

  async function detectFeatures($image: HTMLImageElement) {
    if (!faceLandmarker) {
      console.log("Wait for faceLandmarker to load before clicking!");
      return;
    }

    await faceLandmarker.setOptions({ runningMode: "IMAGE" });
    const faceLandmarkerResult = faceLandmarker.detect($image);
    setFaceReadingState((s) => ({ ...s, faceLandmarkerResult }));
  }

  return (
    <Box>
      <Flex position={"relative"} justifyContent={"center"}>
        <Box position={"relative"}>
          {imgDataUrl && (
            <Box position={"relative"}>
              <Image src={imgDataUrl} maxHeight={320} mx="auto" borderRadius={"xl"} />
              {faceReadingState.type === "scanning" && (
                <Box
                  width={"100%"}
                  animation={`handPoints ${scanningAnimationDuration}s ease-in-out`}
                  bg="teal.300"
                  opacity={0.5}
                  position={"absolute"}
                  top={0}
                  left={0}
                  borderBottom={"4px solid green"}
                  onAnimationEnd={() => {
                    setFaceReadingState({ type: "interpreting", phase: 1 });
                  }}
                />
              )}
            </Box>
          )}
          <canvas
            ref={$canvas}
            width={"800px"}
            height={"999px"}
            style={{
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              position: "absolute",
              pointerEvents: "none",
              visibility: faceReadingState.type === "scanning" ? "hidden" : "visible",
            }}
          />
        </Box>
      </Flex>
      <Box>
        {faceReadingState.type === "interpreting" && (
          <Box position={"relative"} mx={8}>
            {faceReadingState.phase === 0 ? null : (
              <LoadingComponent onComplete={onAnalysisComplete} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function LoadingComponent({ onComplete }: { onComplete?: () => void }) {
  const totalLoadingTime = 8;

  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    startAnalysisPhases();
  }, []);

  async function startAnalysisPhases() {
    const intervalTime = (totalLoadingTime * 1000) / 100;
    const i = setInterval(() => {
      setPhase((v) => {
        const next = v + 1;
        if (next > 100) {
          clearInterval(i);
          onComplete?.();
        }
        return next;
      });
    }, intervalTime);
  }

  return (
    <Box mt={2}>
      <Progress size={"sm"} value={phase} borderRadius={"full"} colorScheme={"green"} mb={2} />
      <Flex direction={"column"} gap={1} fontWeight={"bold"}>
        <LoadingListItem isComplete={phase >= 25} text="Reading the face data"></LoadingListItem>
        <LoadingListItem isComplete={phase >= 50} text="Analysing results" />
        <LoadingListItem isComplete={phase >= 75} text="Forecasting destiny" />
        <LoadingListItem isComplete={phase >= 100} text="Results are ready" />
      </Flex>
    </Box>
  );
}

function LoadingListItem({ isComplete, text }: { isComplete?: boolean; text: string }) {
  return (
    <Flex gap={2} alignItems={"center"}>
      <Icon as={FaCheck} color={isComplete ? "green.500" : "text.200"} />
      <Text color={isComplete ? "text" : "text.200"} fontSize={"sm"}>
        {text}
      </Text>
    </Flex>
  );
}
