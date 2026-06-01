import { api } from "../apiService";
import { API_ENDPOINTS } from "@/src/constants/api";
import type { ITopUpRequest, ITopUpResponse } from "./types";

export const paymentsService = {
  topUp: async (data: ITopUpRequest): Promise<ITopUpResponse> => {
    return api.post<ITopUpResponse>(API_ENDPOINTS.PAYMENTS.TOP_UP, data);
  },
};
