"use client";

import { resolve } from "path";
import React, { useEffect, useRef, useState } from "react";

export const CameraRecorder2 = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);

  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const getVideo = () => {
    console.log("start get video");
    navigator.mediaDevices
      .getUserMedia({ video: { width: 320, height: 300 } })
      .then((stream) => {
        const video = videoRef.current;
        if (video) {
          console.log("say hell video");
          video.srcObject = stream;
          video
            .play()
            .then(() => {
              // Update the video size after metadata is loaded
              if (video.videoWidth && video.videoHeight) {
                video.width = video.videoWidth;
                video.height = video.videoHeight;
              }
            })
            .catch((error) => console.error("Error playing video:", error));
        }
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    if (photo) {
      photo.width = width;
      photo.height = height as number;

      let ctx = photo.getContext("2d");

      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);

        console.log("image url is: \n");
        ctx.canvas.toBlob((blob) => {
          console.log("Image Blob:", blob);
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            // Now you can use the base64String as needed, such as saving it to your database
            console.log("Base64-encoded image:", base64String);
            setPhotoUrl(base64String);
          };
          reader.readAsDataURL(blob!);

          // resolve(blob);
        });
        setHasPhoto(true);
      }
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ border: "9px solid red" }}>
        <p>Camera record</p>
        <video ref={videoRef} autoPlay controls loop />
        <button onClick={takePhoto}>Click me</button>
        <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
          <canvas ref={photoRef}></canvas>
          <button>Close me</button>
          {hasPhoto && <img src={photoUrl}></img>}
        </div>
      </div>
    </div>
  );
};
