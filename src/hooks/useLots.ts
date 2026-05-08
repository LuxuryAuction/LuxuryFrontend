import { useCallback, useEffect, useState } from "react";
import { lotsService } from "../services/LotsService";
import { ILotListResponse, ILotListParams, ILotDetails, ILot, ICreateLotRequest } from "../services/LotsService/types";

export const useGetLots = (params?: ILotListParams) => {
  const [data, setData] = useState<ILotListResponse>();
  const [isLoading, setIsLoading] = useState(false);
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

export const useGetUserLots = (params: ILotListParams) => {
  const [data, setData] = useState<ILot[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserLots = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await lotsService.getUserLots(params);

      setData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user lots"));
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchUserLots();
  }, [params]);

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

  const fetchLot = async () => {
    if (typeof id !== "number") return;

    setIsLoading(true);

    try {
      const lot = await lotsService.getLotById(id);
      setData(lot);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLot();
  }, [id]);

  return {
    data,
    isLoading,
    refetch: fetchLot,
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
