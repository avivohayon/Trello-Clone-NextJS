import { z } from "zod";
import { Card, MediaActivityLog } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateMediaLog } from "./schema";

export type InputType = z.infer<typeof CreateMediaLog>;
export type ReturnType = ActionState<InputType, MediaActivityLog>;