import { filterApiParams } from "@/src/utils/apiUtils";
import { api } from "../apiService";
import { ICategory } from "./types";
import { API_ENDPOINTS } from "@/src/constants/api";

export const categoryService = {
  getCategories: async (): Promise<ICategory[]> => {
    // const params = filterApiParams({ userId });
    const response = await api.get<ICategory[]>(
      API_ENDPOINTS.CATEGORIES.LIST,
      // params,
    );
    return response
  },
};
