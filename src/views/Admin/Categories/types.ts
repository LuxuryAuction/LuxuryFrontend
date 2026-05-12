import type { CategoryEditSchema } from "@/src/schemas/category.schema";
import type { ICategory } from "@/src/services/CategoriesService/types";

export type CategoryEditFormValues = CategoryEditSchema;

export const getCategoryEditDefaultValues = (category: ICategory): CategoryEditFormValues => ({
  name: category.name,
  shortDescription: category.shortDescription,
  image: category.image,
  postingPrice: String(category.postingPrice),
});
