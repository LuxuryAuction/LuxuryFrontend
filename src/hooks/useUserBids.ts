import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { usersService } from "../services/UsersService";
import {
  IUserBidsListParams,
  IUserBidsListResponse,
} from "../services/UsersService/types";
import { RootState } from "../store";

export const useUserBids = (
  params?: IUserBidsListParams,
  profileUserId?: number | string,
) => {
  const authUserId = useSelector((state: RootState) => state.auth.userId);
  const userId = profileUserId ?? authUserId;

  const [data, setData] = useState<IUserBidsListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBids = useCallback(async () => {
    if (userId == null) return;

    setIsLoading(true);
    setError(null);

    try {
      const responseData = await usersService.getUserBids(userId, params);
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch bids"));
    } finally {
      setIsLoading(false);
    }
  }, [userId, params]);

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  return {
    data,
    items: data?.items ?? [],
    winningLotsCount: data?.winningLotsCount ?? 0,
    outbidLotsCount: data?.outbidLotsCount ?? 0,
    page: data?.page ?? 1,
    pageSize: data?.pageSize ?? 0,
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    refetch: fetchBids,
  };
};
