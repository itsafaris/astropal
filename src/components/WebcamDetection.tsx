import * as React from "react";
import { useServices } from "./root/RootWrapper";
import { DrawingUtils, FaceLandmarker, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

export interface IWebcamDetectionProps {
  onCaptureImage?: (imgDataUrl: string, detectionResult: FaceLandmarkerResult) => void;
}

export function WebcamDetection(props: IWebcamDetectionProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [webcamRunning, setWebcamRunning] = React.useState(false);
  const { faceLandmarker } = useServices();
  const drawingUtilsRef = React.useRef<DrawingUtils | null>(null);
  const lastVideoTimeRef = React.useRef<number | null>(null);
  const [resultsState, setResultsState] = React.useState<"ok" | "error" | "initial">("initial");
  const faceLandmarkerResult = React.useRef<FaceLandmarkerResult | null>(null);

  React.useEffect(() => {
    enableCam();
    drawingUtilsRef.current = new DrawingUtils(canvasRef.current!.getContext("2d")!);
  }, [faceLandmarker]);

  React.useEffect(() => {
    const hasGetUserMedia = () => {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    };

    if (!hasGetUserMedia()) {
      console.warn("getUserMedia() is not supported by your browser");
      return;
    }
  }, []);

  const enableCam = async () => {
    if (!faceLandmarker) {
      console.log("Wait! faceLandmarker not loaded yet.");
      return;
    }

    const video = videoRef.current;
    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      return;
    }

    if (webcamRunning) {
      setWebcamRunning(false);
      // Additional logic to stop the webcam can be added here
    } else {
      setWebcamRunning(true);

      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (!video) {
        console.log("no video");
        return;
      }

      video.srcObject = stream;
    }
  };

  const predictWebcam = () => {
    if (!faceLandmarker) {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }
    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      return;
    }

    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;

    let results: FaceLandmarkerResult | null = null;

    let startTimeMs = performance.now();
    if (lastVideoTimeRef.current !== video.currentTime) {
      lastVideoTimeRef.current = video.currentTime;
      results = faceLandmarker.detectForVideo(video, startTimeMs);
      faceLandmarkerResult.current = results;

      if (results.faceLandmarks.length === 0) {
        setResultsState("error");
      } else {
        setResultsState("ok");
      }
    }

    const drawingUtils = drawingUtilsRef.current!;

    if (results?.faceLandmarks) {
      for (const landmarks of results.faceLandmarks) {
        drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_CONTOURS, {
          color: "#33ff99",
          lineWidth: 3,
        });
      }
    }

    if (webcamRunning) {
      window.setTimeout(predictWebcam, 30);
    }
  };

  function captureImage() {
    const video = videoRef.current!;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx!.translate(canvas.width, 0);
    ctx!.scale(-1, 1); // flip horizontally
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    props.onCaptureImage?.(dataUrl, faceLandmarkerResult.current!);
  }

  return (
    <Box>
      <Box
        position={"relative"}
        display={"inline-block"}
        border="8px solid"
        borderColor={
          resultsState === "error" ? "red.500" : resultsState === "ok" ? "green.400" : "transparent"
        }
      >
        <video
          ref={videoRef}
          autoPlay
          onLoadedData={() => predictWebcam()}
          style={{ transform: "scaleX(-1)" }}
        ></video>
        <canvas
          ref={canvasRef}
          style={{
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            transform: "scaleX(-1)",
          }}
        />

        {resultsState === "error" && (
          <Flex
            position={"absolute"}
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            bg="whiteAlpha.700"
          >
            <Text
              fontWeight={"bold"}
              fontSize={"2xl"}
              textAlign={"center"}
              px={10}
              my={3}
              color="red.600"
            >
              Face not detected
            </Text>
            <Text color="red.500" fontWeight={"bold"} top={"50%"} width={"80%"} mx="auto">
              Try to position yourself until you see a green frame around your face
            </Text>
          </Flex>
        )}
      </Box>

      <Flex width={"full"} p={2} justifyContent={"center"}>
        <Button
          isDisabled={resultsState !== "ok"}
          colorScheme="brand"
          onClick={() => {
            captureImage();
          }}
        >
          Capture
        </Button>
      </Flex>
    </Box>
  );
}
