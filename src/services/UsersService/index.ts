import { api } from "../apiService";
import { API_ENDPOINTS } from "@/src/constants/api";
import { IUserProfile } from "./types";

export const usersService = {
  getProfile: async (): Promise<IUserProfile> => {
    const response = await api.get<IUserProfile>(
      API_ENDPOINTS.USERS.ME.PROFILE
    );
    return response;
  },
};
