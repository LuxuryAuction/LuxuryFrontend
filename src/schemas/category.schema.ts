import { z } from "zod";

export const categoryEditSchema = z.object({
  name: z.string().trim().min(1, "Назва обов'язкова").max(80, "Максимум 80 символів"),
  shortDescription: z.string().trim().max(240, "Максимум 240 символів"),
  image: z
    .string()
    .trim()
    .max(500, "Максимум 500 символів"),
  postingPrice: z.string().trim().min(1, "Min price is 1")
});

export type CategoryEditSchema = z.infer<typeof categoryEditSchema>;
