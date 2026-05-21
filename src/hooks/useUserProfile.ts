import { useState, useEffect, useCallback } from "react";
import { usersService } from "../services/UsersService";
import { IUserProfile } from "../services/UsersService/types";

export const useGetProfile = (profileUserId?: number | string) => {
  const [data, setData] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    if (profileUserId == null) return;

    setIsLoading(true);
    setError(null);
    try {
      const responseData = await usersService.getProfile(profileUserId);
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user profile"));
    } finally {
      setIsLoading(false);
    }
  }, [profileUserId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};
