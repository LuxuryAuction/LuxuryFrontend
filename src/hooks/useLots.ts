import { useCallback, useEffect, useState } from "react";
import { lotsService } from "../services/LotsService";
import { ILotListResponse, ILotListParams, ILotDetails, ICreateLotRequest, IPlaceBidRequest } from "../services/LotsService/types";

export const useGetLots = (params?: ILotListParams) => {
  const [data, setData] = useState<ILotListResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLots = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await lotsService.getLots(params ?? {});

      setData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch lots"));
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchLots();
  }, [params]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchLots,
  };
};

export const useGetUserLots = (params: ILotListParams, userId?: number | string) => {

  const [data, setData] = useState<ILotListResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserLots = useCallback(async () => {
    if (userId == null) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const data = await lotsService.getLots({ ...params, userId });

      setData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user lots"));
    } finally {
      setIsLoading(false);
    }
  }, [params, userId]);

  useEffect(() => {
    fetchUserLots();
  }, [fetchUserLots]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchUserLots,
  };
};


export const useGetLot = (id?: number) => {
  const [data, setData] = useState<ILotDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLot = useCallback(async () => {
    if (typeof id !== "number" || Number.isNaN(id)) return;

    setIsLoading(true);

    try {
      const lot = await lotsService.getLotById(id);
      setData(lot);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLot();
  }, [fetchLot]);

  return {
    data,
    isLoading,
    refetch: fetchLot,
  };
};

export const usePlaceBid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const placeBid = async (lotId: number, data: IPlaceBidRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      return await lotsService.placeBid(lotId, data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to place bid");
      setError(error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    placeBid,
    isLoading,
    error,
  };
};
export const useCreateLot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createLot = async (data: ICreateLotRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await lotsService.createLot(data);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create lot");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createLot,
    isLoading,
    error,
  };
};
