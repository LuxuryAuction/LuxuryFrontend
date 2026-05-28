import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { usersService } from "../services/UsersService";
import {
  INotificationsListParams,
  INotificationsListResponse,
} from "../services/UsersService/types";
import { RootState } from "../store";

export const useNotifications = (params?: INotificationsListParams) => {
  const userName = useSelector((state: RootState) => state.auth.userName);

  const [data, setData] = useState<INotificationsListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!userName) return;

    setIsLoading(true);
    setError(null);

    try {
      const responseData = await usersService.getNotifications(userName, params);
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch notifications"));
    } finally {
      setIsLoading(false);
    }
  }, [userName, params]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = useCallback(
    async (notificationId: number) => {
      if (!userName) return;

      try {
        await usersService.markNotificationAsRead(userName, notificationId);
        await fetchNotifications();
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to mark notification as read"));
        throw err;
      }
    },
    [userName, fetchNotifications],
  );

  const markAllAsRead = useCallback(async () => {
    if (!userName) return;

    try {
      await usersService.markAllNotificationsAsRead(userName);
      await fetchNotifications();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to mark notifications as read"));
      throw err;
    }
  }, [userName, fetchNotifications]);

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
