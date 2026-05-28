import { useState, useEffect, useCallback } from "react";
import { usersService } from "../services/UsersService";
import { IUserProfile } from "../services/UsersService/types";

export const useGetProfile = (profileUserName?: string) => {
  const [data, setData] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!profileUserName) return;

    setIsLoading(true);
    setError(null);
    try {
      const responseData = await usersService.getProfile(profileUserName);
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user profile"));
    } finally {
      setIsLoading(false);
    }
  }, [profileUserName]);

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
