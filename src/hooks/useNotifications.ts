import { useState, useEffect, useCallback } from "react";
import { usersService } from "../services/UsersService";
import { INotification } from "../services/UsersService/types";

export const useNotifications = () => {
  const [data, setData] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await usersService.getNotifications();
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch notifications"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = useCallback(async (notificationIds?: string[]) => {
    try {
      await usersService.markNotificationsAsRead(notificationIds);
      await fetchNotifications();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to mark notifications as read"));
    }
  }, [fetchNotifications]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchNotifications,
    markAsRead,
  };
};
