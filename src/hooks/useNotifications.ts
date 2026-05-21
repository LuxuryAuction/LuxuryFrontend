import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { usersService } from "../services/UsersService";
import { INotification } from "../services/UsersService/types";
import { RootState } from "../store";

export const useNotifications = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [data, setData] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (userId == null) return;

    setIsLoading(true);
    setError(null);
    try {
      const responseData = await usersService.getNotifications(userId);
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch notifications"));
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = useCallback(async (notificationIds?: string[]) => {
    if (userId == null) return;

    try {
      await usersService.markNotificationsAsRead(userId, notificationIds);
      await fetchNotifications();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to mark notifications as read"));
    }
  }, [userId, fetchNotifications]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchNotifications,
    markAsRead,
  };
};
