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
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
        color: "#42c99a",
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
    <Box p={8}>
      <Box
        position={"relative"}
        display={"inline-block"}
        transform={faceReadingState.type === "interpreting" ? "scale(0.6)" : "scale(1)"}
        transformOrigin={"top center"}
        transition={"transform 2s"}
        onTransitionEnd={() => {
          setFaceReadingState((s) => ({ ...s, phase: 1 }));
        }}
      >
        {imgDataUrl && (
          <Box position={"relative"}>
            <Image src={imgDataUrl} width={600} />
            {faceReadingState.type === "scanning" && (
              <Box
                width={"100%"}
                animation={"handPoints 3s ease-in-out"}
                bg="teal.300"
                opacity={0.5}
                position={"absolute"}
                top={0}
                left={0}
                borderBottom={"4px solid green"}
                onAnimationEnd={() => {
                  setFaceReadingState({ type: "interpreting", phase: 0 });
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
      <Box>
        {faceReadingState.type === "interpreting" && (
          <Box position={"relative"} top={-20}>
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
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    startAnalysisPhases();
  }, []);

  async function startAnalysisPhases() {
    const i = setInterval(() => {
      setPhase((v) => {
        const next = v + 1;
        if (next > 100) {
          clearInterval(i);
          onComplete?.();
        }
        return next;
      });
    }, 50);
  }

  return (
    <Box>
      <Progress value={phase} borderRadius={"full"} colorScheme="brand" mb={2} />
      <Flex direction={"column"} gap={3} fontWeight={"bold"}>
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
      <Text color={isComplete ? "text" : "text.200"}>{text}</Text>
    </Flex>
  );
}
