import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { usersService } from "../services/UsersService";
import {
  INotificationsListParams,
  INotificationsListResponse,
} from "../services/UsersService/types";
import { RootState } from "../store";

export const useNotifications = (params?: INotificationsListParams) => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [data, setData] = useState<INotificationsListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (userId == null) return;

    setIsLoading(true);
    setError(null);

    try {
      const responseData = await usersService.getNotifications(userId, params);
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch notifications"));
    } finally {
      setIsLoading(false);
    }
  }, [userId, params]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = useCallback(
    async (notificationId: number) => {
      if (userId == null) return;

      try {
        await usersService.markNotificationAsRead(userId, notificationId);
        await fetchNotifications();
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to mark notification as read"));
        throw err;
      }
    },
    [userId, fetchNotifications],
  );

  const markAllAsRead = useCallback(async () => {
    if (userId == null) return;

    try {
      await usersService.markAllNotificationsAsRead(userId);
      await fetchNotifications();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to mark notifications as read"));
      throw err;
    }
  }, [userId, fetchNotifications]);

  return {
    data,
    items: data?.items ?? [],
    unreadCount: data?.unreadCount ?? 0,
    page: data?.page ?? 1,
    pageSize: data?.pageSize ?? 0,
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
};
