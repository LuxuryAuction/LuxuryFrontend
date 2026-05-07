import { z } from "zod";

export const notSpaceOnly = (message: string) =>
  z.string().min(1, message).refine((val) => val.trim().length > 0, message);


export const fileSchema = z.custom<File>((v) => typeof window !== "undefined" && v instanceof File, {
  message: "Invalid file",
});