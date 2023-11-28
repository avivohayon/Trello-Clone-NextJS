"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTestCardModal } from "@/hooks/use-test-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";
import { CameraRecorder2 } from "@/components/media/camera-recorder2";

// import { useCamera } from "@/hooks/use-camera";s
import { useEffect, useRef, useState } from "react";
import WebcamStreamCapture from "@/components/media/webcame-stream-catcher";

import { ChildrenProps as WebCameraRefProps } from "react-webcam";

import WebcamCapture from "@/components/media/webcam-capture";
import { ChildrenProps } from "react-webcam";

export const TestCardModal = () => {
  const id = useTestCardModal((state) => state.id);
  const isOpen = useTestCardModal((state) => state.isOpen);
  const onClose = useTestCardModal((state) => state.onClose);

  // const webcamRef = useRef<any>(null);
  const webcamRef = useRef<WebCameraRefProps>(null);
  const [screenShot, setScreenShot] = useState<string>("");

  const handlerScreenshot = (imageData: string) => {
    console.log("start hadlerScreen shot with data:");
    console.log(imageData);
    setScreenShot(imageData);
  };

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <WebcamCapture
          // onCapture={handlerScreenshot}
          ref={webcamRef}
          hidden={false}
        />
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <></>
              ) : (
                // <Description.Skeleton />
                <Description data={cardData} ref={webcamRef} />
              )}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogsData} />
              )}
            </div>
          </div>

          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
