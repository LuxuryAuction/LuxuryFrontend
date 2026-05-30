import { api } from "../apiService";
import { ICategory, ICategoryCreatePayload, ICategoryUpdatePayload } from "./types";
import { API_ENDPOINTS } from "@/src/constants/api";

function buildCategoryUpdateFormData(payload: ICategoryUpdatePayload): FormData {
  const formData = new FormData();
  formData.append("Name", payload.name);
  formData.append("ShortDescription", payload.shortDescription);
  formData.append("PostingPrice", String(payload.postingPrice));
  if (payload.image) {
    formData.append("Image", payload.image);
  }
  return formData;
}

function buildCategoryCreateFormData(payload: ICategoryCreatePayload): FormData {
  const formData = new FormData();
  formData.append("Id", String(payload.id ?? 0));
  formData.append("Slug", payload.slug);
  formData.append("Name", payload.name);
  formData.append("ShortDescription", payload.shortDescription);
  formData.append("Image", payload.image);
  formData.append("PostingPrice", String(payload.postingPrice));
  formData.append("IsFrozen", "false");
  return formData;
}

export const categoryService = {
  getCategories: async (): Promise<ICategory[]> => {
    return api.get<ICategory[]>(API_ENDPOINTS.CATEGORIES.LIST);
  },

  createCategory: async (payload: ICategoryCreatePayload): Promise<ICategory> => {
    return api.post<ICategory>(
      API_ENDPOINTS.CATEGORIES.CREATE,
      buildCategoryCreateFormData(payload),
    );
  },

  updateCategory: async (id: number, payload: ICategoryUpdatePayload): Promise<ICategory> => {
    return api.patch<ICategory>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id),
      buildCategoryUpdateFormData(payload),
    );
  },
};
