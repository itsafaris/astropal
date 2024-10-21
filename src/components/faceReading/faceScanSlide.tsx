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
  Stack,
  useTheme,
  HStack,
} from "@chakra-ui/react";
import { SlideHeading } from "@components/quizpage/components";
import { useGlobalUpdate2 } from "@components/wrappers/RootWrapper";
import { WebcamDetection } from "@components/WebcamDetection";
import { Slide, useQuiz } from "@martynasj/quiz-lib/index";
import { readFileAsDataURL } from "@utils/image";
import React, { ComponentProps, useEffect } from "react";
import posthog from "posthog-js";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";

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
      <SlideHeading textAlign={"center"} fontWeight={"bold"} mb={4}>
        Take a photo of your face or upload existing one
      </SlideHeading>

      <Stack spacing={3} my={8}>
        <CTAButton
          colorScheme="brand"
          ref={cancelRef}
          onClick={() => {
            onWebcamOpen();
          }}
          rightIcon={<Icon as={FaCamera} />}
        >
          Take a New Photo
        </CTAButton>

        <Text textAlign={"center"} fontWeight={"semibold"}>
          Or
        </Text>

        <Box position={"relative"} width={"full"}>
          <CTAButton colorScheme="brand">
            Upload a Photo <Icon ml={1} as={MdFileUpload} boxSize={6} />
          </CTAButton>

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
            }}
          />
        </Box>
      </Stack>

      <Stack
        backgroundColor={"green.50"}
        p={3}
        py={4}
        borderRadius={"lg"}
        textAlign={"center"}
        color={"green.700"}
        mb={4}
      >
        <HStack justifyContent={"center"}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            Your privacy is our top priority{" "}
          </Text>
          <Icon as={IoShieldCheckmarkSharp} ml={1} boxSize={5} />
        </HStack>

        <Stack alignItems={"center"} spacing={1}>
          <Text>1. Your photo never leaves your device</Text>

          <Text>2. It gets immediately deleted</Text>
        </Stack>
      </Stack>

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

export const CTAButton = React.forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  (props, ref) => {
    const theme = useTheme();

    return (
      <Button
        px={8}
        py={6}
        variant={"solid"}
        colorScheme="brand"
        width={"full"}
        boxShadow={`inset 0 0 0 6px ${theme.colors.brand["400"]}, 0px 5px 30px 0px rgba(0,0,0,0.2)`}
        borderRadius={8}
        ref={ref}
        {...props}
      />
    );
  }
);
