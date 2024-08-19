import * as React from "react";

import { Box, Image } from "@chakra-ui/react";
import { FaceDetectionComponent } from "@components/FaceDetectionComponent";

export interface IFaceDetectionPageProps {}

export default function FaceDetectionPage(props: IFaceDetectionPageProps) {
  const [uploadedImage, setUploadedImage] = React.useState<File>();

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) {
      return;
    }
    setUploadedImage(file);
  }

  return (
    <Box p={8}>
      <FaceDetectionComponent imgFile={uploadedImage} />
      <div>
        <h2>Upload from File System</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
      </div>
    </Box>
  );
}

/********************************************************************
// Demo 2: Continuously grab image from webcam stream and detect it.
********************************************************************/

// const video = document.getElementById("webcam") as HTMLVideoElement;
// const canvasElement = document.getElementById("output_canvas") as HTMLCanvasElement;

// const canvasCtx = canvasElement.getContext("2d");

// // Check if webcam access is supported.
// function hasGetUserMedia() {
//   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
// }

// // If webcam supported, add event listener to button for when user
// // wants to activate it.
// if (hasGetUserMedia()) {
//   enableWebcamButton = document.getElementById("webcamButton") as HTMLButtonElement;
//   enableWebcamButton.addEventListener("click", enableCam);
// } else {
//   console.warn("getUserMedia() is not supported by your browser");
// }

// // Enable the live webcam view and start detection.
// function enableCam(event) {
//   if (!faceLandmarker) {
//     console.log("Wait! faceLandmarker not loaded yet.");
//     return;
//   }

//   if (webcamRunning === true) {
//     webcamRunning = false;
//     enableWebcamButton.innerText = "ENABLE PREDICTIONS";
//   } else {
//     webcamRunning = true;
//     enableWebcamButton.innerText = "DISABLE PREDICTIONS";
//   }

//   // getUsermedia parameters.
//   const constraints = {
//     video: true,
//   };

//   // Activate the webcam stream.
//   navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//     video.srcObject = stream;
//     video.addEventListener("loadeddata", predictWebcam);
//   });
// }

// let lastVideoTime = -1;
// let results = undefined;
// const drawingUtils = new DrawingUtils(canvasCtx);

// async function predictWebcam() {
//   const radio = video.videoHeight / video.videoWidth;
//   video.style.width = videoWidth + "px";
//   video.style.height = videoWidth * radio + "px";
//   canvasElement.style.width = videoWidth + "px";
//   canvasElement.style.height = videoWidth * radio + "px";
//   canvasElement.width = video.videoWidth;
//   canvasElement.height = video.videoHeight;
//   // Now let's start detecting the stream.
//   if (runningMode === "IMAGE") {
//     runningMode = "VIDEO";
//     await faceLandmarker.setOptions({ runningMode: runningMode });
//   }
//   let startTimeMs = performance.now();
//   if (lastVideoTime !== video.currentTime) {
//     lastVideoTime = video.currentTime;
//     results = faceLandmarker.detectForVideo(video, startTimeMs);
//   }
//   if (results.faceLandmarks) {
//     for (const landmarks of results.faceLandmarks) {
//       drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, {
//         color: "#C0C0C070",
//         lineWidth: 1,
//       });
//       drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, {
//         color: "#FF3030",
//       });
//       drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, {
//         color: "#FF3030",
//       });
//       drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, {
//         color: "#30FF30",
//       });
//       drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, {
//         color: "#30FF30",
//       });
//       drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, {
//         color: "#E0E0E0",
//       });
//       drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
//         color: "#E0E0E0",
//       });
//       drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, {
//         color: "#FF3030",
//       });
//       drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, {
//         color: "#30FF30",
//       });
//     }
//   }
//   drawBlendShapes(videoBlendShapes, results.faceBlendshapes);

//   // Call this function again to keep predicting when the browser is ready.
//   if (webcamRunning === true) {
//     window.requestAnimationFrame(predictWebcam);
//   }
// }
