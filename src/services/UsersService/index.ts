import { api } from "../apiService";
import { API_ENDPOINTS } from "@/src/constants/api";
import { IUserProfile, INotification } from "./types";

export const usersService = {
  getProfile: async (): Promise<IUserProfile> => {
    const response = await api.get<IUserProfile>(
      API_ENDPOINTS.USERS.ME.PROFILE
    );
    return response;
  },
  getNotifications: async (): Promise<INotification[]> => {
    const response = await api.get<INotification[]>(
      API_ENDPOINTS.USERS.ME.NOTIFICATIONS.LIST
    );
    return response;
  },
  markNotificationsAsRead: async (notificationIds?: string[]): Promise<void> => {
    await api.patch(API_ENDPOINTS.USERS.ME.NOTIFICATIONS.READ, {
      notificationIds,
    });
  },
};
