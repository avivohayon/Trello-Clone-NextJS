import { z } from "zod";

// defining the structure of the input meaning what we must values we must have in order to create a board data in the db, and how the data should look like
// in here, we must have 2 values to create a board:"title", "image" and the title must have at-least 3 chars
export const CreateBoard = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }).min(3, {
    message: "Title is too short."
  }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
});