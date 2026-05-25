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
  getProfile: async (userId: number | string): Promise<IUserProfile> => {
    const response = await api.get<IUserProfile>(
      API_ENDPOINTS.USERS.PROFILE(userId),
    );
    return response;
  },

  getNotifications: async (
    userId: number | string,
    params?: INotificationsListParams,
  ): Promise<INotificationsListResponse> => {
    const response = await api.get<INotificationsListResponse>(
      API_ENDPOINTS.USERS.NOTIFICATIONS(userId),
      filterApiParams(params ?? {}),
    );
    return response;
  },

  markAllNotificationsAsRead: async (userId: number | string): Promise<void> => {
    await api.patch(API_ENDPOINTS.USERS.NOTIFICATIONS_READ_ALL(userId), {});
  },

  markNotificationAsRead: async (
    userId: number | string,
    notificationId: number,
  ): Promise<void> => {
    await api.patch(API_ENDPOINTS.USERS.NOTIFICATION_READ(userId, notificationId), {});
  },

  getUserBids: async (
    userId: number | string,
    params?: IUserBidsListParams,
  ): Promise<IUserBidsListResponse> => {
    const response = await api.get<IUserBidsListResponse>(
      API_ENDPOINTS.USERS.BIDS(userId),
      filterApiParams(params ?? {}),
    );
    return response;
  },
};
