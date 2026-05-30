import { z } from "zod";

export const categoryEditSchema = z.object({
  name: z.string().trim().min(1, "Назва обов'язкова").max(80, "Максимум 80 символів"),
  shortDescription: z.string().trim().max(240, "Максимум 240 символів"),
  postingPrice: z.string().trim().min(1, "Min price is 1"),
  image: z.instanceof(File).optional(),
});

export type CategoryEditSchema = z.infer<typeof categoryEditSchema>;

export const categoryCreateSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug обов'язковий")
    .max(80, "Максимум 80 символів")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Лише латиниця, цифри та дефіси"),
  name: z.string().trim().min(1, "Назва обов'язкова").max(80, "Максимум 80 символів"),
  shortDescription: z.string().trim().max(240, "Максимум 240 символів"),
  image: z.instanceof(File, { message: "Зображення обов'язкове" }),
  postingPrice: z.string().trim().min(1, "Min price is 1"),
});

export type CategoryCreateSchema = z.infer<typeof categoryCreateSchema>;
