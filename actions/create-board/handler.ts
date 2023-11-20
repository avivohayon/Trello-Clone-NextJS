// "use server";
// import { revalidatePath } from 'next/cache';
// import { auth } from "@clerk/nextjs";
// import { InputType, ReturnType } from "./types";
// import { db } from "@/lib/db";
// import { createSafeAction } from '@/lib/create-safe-action';
// import { CreateBoard } from './schema';

// const handler = async (data: InputType): Promise<ReturnType> => {
//     const { userId, orgId } = auth();

//     if (!userId || !orgId) {
//         return {
//             error: "Unauthorized",
//         };
//     }

//     const { title, image } = data;

//     const [
//         imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName
//     ] = image.split("|"); //  split the values from the hidden input image we took in form-popover/picker (value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}    )

//     if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
//         return {
//             error: "Missing fields. Failed to create board."
//         };
//     }
//     let board;

//     try {

//         board = await db.board.create({
//             data: {
//                 title,

//             }
//         });
//     } catch (error) {
//         return {
//             error: "Failed to create"
//         };
//     }

//     revalidatePath(`/board/${board.id}`);
//     return { data: board };
// };

// export const createBoard = createSafeAction(CreateBoard, handler);
