"use client";

import { toast } from "sonner";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import {
  useState,
  useRef,
  ElementRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";

import { createMediaSubmit } from "@/actions/create-media-submit";
import { updateCard } from "@/actions/update-card";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

import { forwardRef } from "react";

import { ChildrenProps as WebCameraRefProps } from "react-webcam";

import WebcamCapture from "@/components/media/webcam-capture";
import { ChildrenProps } from "react-webcam";

interface DescriptionProps {
  data: CardWithList;
}

export const Description = forwardRef<WebCameraRefProps, DescriptionProps>(
  ({ data }, ref) => {
    const params = useParams();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const webcamRef = ref as React.Ref<ChildrenProps>;

    const [startImg, setStart] = useState<string>("");

    const [descriptionImg, setDescriptionImg] = useState<string>("");
    const [submitImag, setSubmitImg] = useState<string>("");

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        // Your code here, this will run after a 1-second delay
        console.log("Effect ran after 1 second");
        const startImg = webcamRef.current?.getScreenshot();
        console.log("start screen shot with data:");
        console.log(startImg);
        if (typeof startImg == "string") {
          setStart(startImg);
        }
      }, 1000);

      // Cleanup function to clear the timeout in case the component unmounts
      return () => clearTimeout(timeoutId);
    }, []);

    const descriptionScreenshot = (imageData: string) => {
      console.log("start description shot with data:");
      console.log(imageData);
      setDescriptionImg(imageData);
    };

    const submitScreenshot = (imageData: string) => {
      console.log("start description shot with data:");
      console.log(imageData);
      setSubmitImg(imageData);
    };

    const enableEditing = () => {
      const descriptionPic = webcamRef?.current?.getScreenshot();
      console.log("saved description picture");
      console.log(descriptionPic);
      if (typeof descriptionPic == "string") {
        setDescriptionImg(descriptionPic);
      }

      setIsEditing(true);
      setTimeout(() => {
        textareaRef.current?.focus();
      });
    };

    const disableEditing = () => {
      setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const { execute, fieldErrors } = useAction(createMediaSubmit, {
      onSuccess: (data) => {
        console.log("succs");
        // queryClient.invalidateQueries({
        //   queryKey: ["card", data.id],
        // });
        // queryClient.invalidateQueries({
        //   queryKey: ["card-logs", data.id],
        // });
        toast.success(`question "${data.title}" finished!`);
        disableEditing();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onSubmit = (formData: FormData) => {
      const description = formData.get("description") as string;
      const boardId = params.testId as string;
      const title = data.title as string;

      console.log("saved answer description");
      console.log(`${description}`);
      textareaRef.current?.value ? (description as string) : undefined;

      const submitscreenshot = webcamRef.current?.getScreenshot();
      console.log("saved submit picture");
      if (typeof submitscreenshot === "string") {
        submitScreenshot(submitscreenshot);
      }

      console.log("saved answer description");
      console.log(`${description}`);

      disableEditing();

      // execute({
      //   title,
      //   description,
      //   dataUrl,
      // });
    };

    return (
      <div className="flex items-start gap-x-3 w-full">
        <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700 mb-2">Description</p>
          {isEditing ? (
            <form action={onSubmit} ref={formRef} className="space-y-2">
              <FormTextarea
                id="description"
                className="w-full mt-2"
                // placeholder="Add a more detailed description"
                placeholder={`${data.description}`}
                defaultValue={undefined}
                errors={fieldErrors}
                ref={textareaRef}
              />

              <div className="flex items-center gap-x-2">
                <FormSubmit>Save</FormSubmit>
                <Button
                  type="button"
                  onClick={disableEditing}
                  size="sm"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div
              onClick={enableEditing}
              role="button"
              className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
            >
              {/* {data.description || "Add a more detailed description..."} */}
              {textareaRef.current?.value}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Description.displayName = "Description";

// Description.Skeleton  = function DescriptionSkeleton() {
//   return (
//     <div className="flex items-start gap-x-3 w-full">
//       <Skeleton className="h-6 w-6 bg-neutral-200" />
//       <div className="w-full">
//         <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
//         <Skeleton className="w-full h-[78px] bg-neutral-200" />
//       </div>
//     </div>
//   );
// };
