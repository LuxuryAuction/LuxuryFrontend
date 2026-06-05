import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersService } from "../services/UsersService";
import { IUserProfile } from "../services/UsersService/types";
import { AppDispatch, RootState } from "../store";
import { setUserBalance } from "../store/slices/authSlice";

export const useGetProfile = (profileUserName?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const authUserName = useSelector((state: RootState) => state.auth.userName);
  const [data, setData] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!profileUserName) return undefined;

    setIsLoading(true);
    setError(null);
    try {
      const responseData = await usersService.getProfile(profileUserName);
      setData(responseData);

      const isOwnProfile =
        authUserName != null &&
        profileUserName.toLowerCase() === authUserName.toLowerCase();
      if (isOwnProfile && responseData.balance != null) {
        dispatch(setUserBalance(responseData.balance));
      }

      return responseData;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user profile"));
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [profileUserName, authUserName, dispatch]);

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
