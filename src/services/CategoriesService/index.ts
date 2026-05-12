import { api } from "../apiService";
import { ICategory, ICategoryUpdatePayload } from "./types";
import { API_ENDPOINTS } from "@/src/constants/api";

export const categoryService = {
  getCategories: async (): Promise<ICategory[]> => {
    return api.get<ICategory[]>(API_ENDPOINTS.CATEGORIES.LIST);
  },

  updateCategory: async (id: number, payload: ICategoryUpdatePayload): Promise<ICategory> => {
    return api.patch<ICategory>(API_ENDPOINTS.CATEGORIES.BY_ID(id), payload);
  },
};
