import { api } from "../apiService";
import { API_ENDPOINTS } from "@/src/constants/api";
import { IRegisterRequest, IRegisterResponse, ILoginRequest, IAuthTokens } from "./types";

export const authService = {
  register: async (data: IRegisterRequest): Promise<IRegisterResponse> => {
    const response = await api.post<IRegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    );
    return response;
  },

  login: async (data: ILoginRequest): Promise<IAuthTokens> => {
    const response = await api.post<IAuthTokens>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
    );
    return response;
  },

  logout: async (): Promise<void> => {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT, {});
  },
};
