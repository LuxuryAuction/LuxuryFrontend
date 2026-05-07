import { z } from "zod";
import { fileSchema, notSpaceOnly } from "../utils/validationUtils";


export const createLotSchema = z.object({
  title: notSpaceOnly("Title is required").max(120, "Max 120 characters"),
  description: notSpaceOnly("Description is required"),
  categoryId: notSpaceOnly("Please select a category"),
  condition: notSpaceOnly("Please select a valid condition"),
  sex: z.string().optional(),
  size: z.string().optional(),
  startingPrice: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num > 0;
  }, "Enter a valid starting price"),
  minBidIncrement: z.string().refine((val) => {
    if (val === "") return true;
    return !isNaN(Number(val));
  }, "Enter a valid number"),
  startDate: notSpaceOnly("Start date is required"),
  delivery: notSpaceOnly("Please select delivery method"),
  images: z.array(fileSchema).max(8, "Max 8 photos allowed"),
});

export type CreateLotSchema = z.infer<typeof createLotSchema>;
