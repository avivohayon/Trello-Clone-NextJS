"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import {  MEDIA_TYPE, REASON } from "@prisma/client";


// import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";
import { createCameraLog } from "@/lib/create-camera-log";
import { CreateMediaLog } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, description, dataUrl } = data;
  let card;

  try {
    

    await createCameraLog({
      reason: REASON.SUBMIT,
      mediaType: MEDIA_TYPE.CAMERA,
      title: title,
      description: description,
      dataUrl: dataUrl,
    });
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  // dont know yet what i should revalidate to need to test it
  // revalidatePath(`/test`);
  return { data: card };
};

export const createMediaSubmit = createSafeAction(CreateMediaLog, handler);