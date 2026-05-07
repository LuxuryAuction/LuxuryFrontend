import { useCallback, useEffect, useState } from "react";
import { lotsService } from "../services/LotsService";
import { ILotListResponse, ILotListParams, ILotDetails } from "../services/LotsService/types";

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLots();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchLots,
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLot();
  }, [id]);

  return {
    data,
    isLoading,
    refetch: fetchLot,
  };
};