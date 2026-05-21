import { api } from "../apiService";
import { API_ENDPOINTS } from "@/src/constants/api";
import { ILotDetails, ILotListResponse, ILotListParams, ILot, ICreateLotRequest } from "./types";
import { filterApiParams } from "@/src/utils/apiUtils";

export const lotsService = {
  getLots: async (params: ILotListParams): Promise<ILotListResponse> => {
    const filteredParams = filterApiParams(params);
    const response = await api.get<ILotListResponse>(
      API_ENDPOINTS.LOTS.LIST,
      filteredParams,
    );
    return response;
  },

  getLotById: async (id: number): Promise<ILotDetails> => {
    const response = await api.get<ILotDetails>(API_ENDPOINTS.LOTS.GET_BY_ID(id));
    return response;
  },

  getUserLots: async (userId: number | string, filters: ILotListParams): Promise<ILot[]> => {
    const params = filterApiParams(filters);
    const response = await api.get<ILot[]>(
      API_ENDPOINTS.LOTS.USER_LOTS(userId),
      params
    );
    return response;
  },

  createLot: async (data: ICreateLotRequest): Promise<ILot> => {
    const response = await api.post<ILot>(API_ENDPOINTS.LOTS.LIST, data);
    return response;
  },
};
