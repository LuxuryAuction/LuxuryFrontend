import { api } from "../apiService";
import { API_ENDPOINTS } from "@/src/constants/api";
import { IUserProfile, INotification } from "./types";

export const usersService = {
  getProfile: async (userId: number | string): Promise<IUserProfile> => {
    const response = await api.get<IUserProfile>(
      API_ENDPOINTS.USERS.PROFILE(userId)
    );
    return response;
  },
  getNotifications: async (userId: number | string): Promise<INotification[]> => {
    const response = await api.get<INotification[]>(
      API_ENDPOINTS.USERS.NOTIFICATIONS(userId)
    );
    return response;
  },
  markNotificationsAsRead: async (userId: number | string, notificationIds?: string[]): Promise<void> => {
    await api.patch(API_ENDPOINTS.USERS.NOTIFICATIONS_READ(userId), {
      notificationIds,
    });
  },
};
