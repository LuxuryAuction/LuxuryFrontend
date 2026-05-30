import type { CategoryCreateSchema, CategoryEditSchema } from "@/src/schemas/category.schema";
import type { ICategory } from "@/src/services/CategoriesService/types";

export type CategoryEditFormValues = CategoryEditSchema;
export type CategoryCreateFormValues = CategoryCreateSchema;

export const getCategoryEditDefaultValues = (category: ICategory): CategoryEditFormValues => ({
  name: category.name,
  shortDescription: category.shortDescription,
  postingPrice: String(category.postingPrice),
});

export const CATEGORY_CREATE_DEFAULT_VALUES: CategoryCreateFormValues = {
  slug: "",
  name: "",
  shortDescription: "",
  image: undefined as unknown as File,
  postingPrice: "",
};
