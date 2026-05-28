import { api } from "../apiService";
import { API_ENDPOINTS } from "@/src/constants/api";
import { filterApiParams } from "@/src/utils/apiUtils";
import {
  IUserProfile,
  INotificationsListParams,
  INotificationsListResponse,
  IUserBidsListParams,
  IUserBidsListResponse,
} from "./types";

export const usersService = {
  getProfile: async (userName: string): Promise<IUserProfile> => {
    const response = await api.get<IUserProfile>(
      API_ENDPOINTS.USERS.PROFILE(userName),
    );
    return response;
  },

  getNotifications: async (
    userName: string,
    params?: INotificationsListParams,
  ): Promise<INotificationsListResponse> => {
    const response = await api.get<INotificationsListResponse>(
      API_ENDPOINTS.USERS.NOTIFICATIONS(userName),
      filterApiParams(params ?? {}),
    );
    return response;
  },

  markAllNotificationsAsRead: async (userName: string): Promise<void> => {
    await api.patch(API_ENDPOINTS.USERS.NOTIFICATIONS_READ_ALL(userName), {});
  },

  markNotificationAsRead: async (
    userName: string,
    notificationId: number,
  ): Promise<void> => {
    await api.patch(API_ENDPOINTS.USERS.NOTIFICATION_READ(userName, notificationId), {});
  },

  getUserBids: async (
    userName: string,
    params?: IUserBidsListParams,
  ): Promise<IUserBidsListResponse> => {
    const response = await api.get<IUserBidsListResponse>(
      API_ENDPOINTS.USERS.BIDS(userName),
      filterApiParams(params ?? {}),
    );
    return response;
  },
};
