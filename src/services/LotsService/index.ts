import { api } from "../apiService";
import { API_ENDPOINTS } from "@/src/constants/api";
import { ILotDetails, ILotListResponse, ILotListParams, ILot, ICreateLotRequest, IPlaceBidRequest, ILotDetailsBid } from "./types";
import { filterApiParams } from "@/src/utils/apiUtils";

function buildCreateLotFormData(data: ICreateLotRequest): FormData {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("categoryId", String(data.categoryId));
  formData.append("description", data.description);
  formData.append("startingPrice", String(data.startingPrice));
  formData.append("priceStep", String(data.priceStep));
  formData.append("startDate", data.startDate);
  formData.append("draft", String(data.draft));
  formData.append("sex", data.sex);
  formData.append("condition", data.condition);
  formData.append("size", data.size);
  formData.append("deliveryMethod", data.deliveryMethod);
  data.images.forEach((file) => formData.append("images", file));
  return formData;
}

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

  createLot: async (data: ICreateLotRequest): Promise<ILot> => {
    const response = await api.post<ILot>(
      API_ENDPOINTS.LOTS.LIST,
      buildCreateLotFormData(data),
    );
    return response;
  },

  placeBid: async (lotId: number, data: IPlaceBidRequest): Promise<ILotDetailsBid> => {
    const response = await api.post<ILotDetailsBid>(
      API_ENDPOINTS.LOTS.PLACE_BID(lotId),
      data,
    );
    return response;
  },
};
