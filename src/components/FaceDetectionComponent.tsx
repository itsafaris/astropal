import { Box, Image } from "@chakra-ui/react";
import { DrawingUtils, FaceLandmarker, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import * as React from "react";
import { useServices } from "./root/RootWrapper";

export interface IFaceDetectionComponentProps {
  imgFile?: File;
}

export function FaceDetectionComponent(props: IFaceDetectionComponentProps) {
  const $canvas = React.useRef<HTMLCanvasElement>(null);
  const [imgDataUrl, setImgDataUrl] = React.useState<string>();
  const { faceLandmarker } = useServices();

  const [faceLandmarkerResult, setFaceLandmarkerResult] =
    React.useState<FaceLandmarkerResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!props.imgFile) {
      return;
    }
    readFileAsDataURL(props.imgFile).then((dataurl) => {
      setImgDataUrl(dataurl);
    });
  }, [props.imgFile]);

  React.useEffect(() => {
    if (!faceLandmarkerResult) {
      return;
    }

    const canvas = $canvas.current;
    if (!canvas) {
      console.error("canvas element not found");
      return;
    }

    console.log($canvas.current.clientHeight);
    console.log($canvas.current.clientWidth);
    canvas.setAttribute("width", $canvas.current.clientHeight + "px");
    canvas.setAttribute("height", $canvas.current.clientWidth + "px");

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("canvas ctx not found");
      return;
    }

    const drawingUtils = new DrawingUtils(ctx);

    for (const landmarks of faceLandmarkerResult.faceLandmarks) {
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
        color: "#42c99a",
        lineWidth: 1,
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, {
        color: "#FF3030",
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, {
        color: "#FF3030",
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, {
        color: "#30FF30",
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, {
        color: "#30FF30",
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, {
        color: "#45ffbe",
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
        color: "#E0E0E0",
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, {
        color: "#FF3030",
      });
      drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, {
        color: "#30FF30",
      });
    }
  }, [faceLandmarkerResult]);

  React.useEffect(() => {
    if (!imgDataUrl) {
      return;
    }
    setIsLoading(true);
    setFaceLandmarkerResult(null);
    createHTMLImageElement(imgDataUrl).then((img) => {
      detectFeatures(img);
    });
  }, [imgDataUrl]);

  async function detectFeatures($image: HTMLImageElement) {
    if (!faceLandmarker) {
      console.log("Wait for faceLandmarker to load before clicking!");
      return;
    }

    await faceLandmarker.setOptions({ runningMode: "IMAGE" });
    const faceLandmarkerResult = faceLandmarker.detect($image);
    setFaceLandmarkerResult(faceLandmarkerResult);
  }

  return (
    <Box p={8}>
      <Box position={"relative"} display={"inline-block"}>
        {imgDataUrl && (
          <Box position={"relative"}>
            <Image src={imgDataUrl} width={500} />
            {isLoading && (
              <Box
                width={"100%"}
                animation={"handPoints 8s ease-in-out"}
                bg="teal.300"
                opacity={0.5}
                position={"absolute"}
                top={0}
                left={0}
                borderBottom={"4px solid green"}
                onAnimationEnd={() => {
                  setIsLoading(false);
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
            visibility: isLoading ? "hidden" : "visible",
          }}
        />
      </Box>
    </Box>
  );
}

// Function to read file as data URL
const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (e) => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

// Function to create HTMLImageElement
const createHTMLImageElement = (dataUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
};
