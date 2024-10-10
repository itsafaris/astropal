import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
  Input,
  Box,
} from "@chakra-ui/react";
import { SlideHeading } from "@components/quizpage/components";
import { useGlobalUpdate2 } from "@components/wrappers/RootWrapper";
import { WebcamDetection } from "@components/WebcamDetection";
import { Slide, useQuiz } from "@martynasj/quiz-lib/index";
import { readFileAsDataURL } from "@utils/image";
import React, { useEffect } from "react";
import { FiCamera, FiUpload } from "react-icons/fi";
import posthog from "posthog-js";


export interface IFaceScanSlideProps {}

export function FaceScanSlide(props: IFaceScanSlideProps) {
  return (
    <Slide id="face-scan" type="filler">
      <FaceScanContent />
    </Slide>
  );
}

export function FaceScanContent(props: IFaceScanSlideProps) {
  const { submitQuestion } = useQuiz();
  const update = useGlobalUpdate2();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isWebcamOpen, onOpen: onWebcamOpen, onClose: onWebcamClose } = useDisclosure();
  const imgUploadRef = React.useRef<HTMLInputElement | null>(null);

  const cancelRef = React.useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    posthog.stopSessionRecording();
    // session recording will be enabled in the next step
  }, []);

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) {
      return;
    }
    const dataUrl = await readFileAsDataURL(file);
    update((v) => ({ ...v, faceImageDataUrl: dataUrl }));
    submitQuestion();
  }

  return (
    <React.Fragment>
      <SlideHeading>Take a picture of your head as instructed</SlideHeading>
      <Button colorScheme="brand" onClick={onOpen}>
        Take a picture now
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <Flex gap={4} flexDirection={"column"} p={4}>
            <Button
              size="lg"
              ref={cancelRef}
              onClick={() => {
                onWebcamOpen();
                onClose();
              }}
              leftIcon={<Icon as={FiCamera} />}
            >
              Take a Photo
            </Button>
            <Box position={"relative"} width={"full"}>
              <Button size="lg" leftIcon={<Icon as={FiUpload} />} width={"full"}>
                Choose File
              </Button>
              <Input
                ref={imgUploadRef}
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept="image/*"
                type="file"
                onChange={(e) => {
                  handleFileUpload(e);
                  onClose();
                }}
              />
            </Box>
          </Flex>
        </ModalContent>
      </Modal>

      <Modal isOpen={isWebcamOpen} onClose={onWebcamClose}>
        <ModalOverlay />
        <ModalContent
          as={Flex}
          direction={"column"}
          gap={4}
          mx={3}
          p={4}
          height={"70vh"}
          maxHeight={"650px"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Text fontWeight={"semibold"} textAlign={"center"}>
            Click capture if you see a green contour around your face
          </Text>
          <WebcamDetection
            onCaptureImage={(dataUrl) => {
              onWebcamClose();
              update((v) => ({ ...v, faceImageDataUrl: dataUrl }));
              submitQuestion();
            }}
          />
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}
