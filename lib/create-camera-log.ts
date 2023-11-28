import { auth, currentUser } from "@clerk/nextjs";
import { MediaActivityLog, REASON, ENTITY_TYPE, MEDIA_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

interface Props {
    
    reason: REASON
    mediaType: MEDIA_TYPE
    title: string
    description: string
    dataUrl: string

}

export const createCameraLog = async (props: Props) => {

    try {
        const { orgId } = auth();
        const user = await currentUser();

        if (!user || !orgId) {
        throw new Error("User not found!");
        }
        const { reason, mediaType, title, description ,dataUrl} = props;

        await db.mediaActivityLog.create({
            data: {
                orgId, 
                reason,
                mediaType,
                title,
                description,
                dataUrl,
                userId: user.id,
                userImage: user?.imageUrl,
                userName: user?.firstName + " " + user?.lastName,
            
            }
        })
    }catch(error) {
        console.log("[CAMERA_LOG_ERROR]", error);
    }

    }



