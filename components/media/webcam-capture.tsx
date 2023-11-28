import React, { useRef, useCallback, useImperativeHandle } from "react";
import Webcam, { ChildrenProps as WebCameraRefProps } from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

interface WebcamCaptureProps {
  onCapture?: (imageData: string) => void;
  hidden?: boolean;
  toggleHidden?: () => void;
}

const WebcamCapture = (
  { onCapture, hidden, toggleHidden }: WebcamCaptureProps,
  ref: React.Ref<WebCameraRefProps>
) => {
  const webcamRef = useRef<any>(null);

  // a way to init a reference with a function and "export" it so parent compoenent can use its function
  // for example here we say that this component can have a referanse and one of its function is a screenShot()
  // which all it does it say to the inner ref of the camera itself to take a pic when
  // other compoenent define a referense like this "  const webcamRef = useRef<WebCameraRefProps>(null);

  // a ref, and this reference have a screenshot function it can execute
  useImperativeHandle(ref, () => ({
    getScreenshot: () => webcamRef.current?.getScreenshot(),
  }));

  // const capture = useCallback(() => {
  //   console.log("webcamRef.current.height");

  //   console.log(webcamRef.current.height);
  //   if (hidden) {
  //     webcamRef.current.height = videoConstraints.height;
  //     webcamRef.current.width = videoConstraints.width;
  //   }
  //   const imageSrc = webcamRef.current?.getScreenshot();
  //   if (imageSrc) {
  //     // onCapture(imageSrc);
  //   }
  //   // }, [onCapture]);
  // }, []);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        forceScreenshotSourceSize
        videoConstraints={{
          height: videoConstraints.height,
          width: videoConstraints.width,
        }}
        height={hidden ? "0" : `${videoConstraints.height}`}
        width={hidden ? "0" : `${videoConstraints.width}`}
      />
      {/* <button onClick={capture}>Capture photo</button> */}
    </>
  );
};

export default React.forwardRef(WebcamCapture);
