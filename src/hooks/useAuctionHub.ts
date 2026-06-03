import { useCallback, useEffect, useRef, useState } from "react";
import type { HubConnection } from "@microsoft/signalr";
import {
  AUCTION_HUB_EVENTS,
  AUCTION_HUB_METHODS,
  createAuctionHub,
} from "@/src/services/ChatService/hub";
import type { IDirectMessageDto, ILotMessageDto } from "@/src/services/ChatService/types";

type UseAuctionHubOptions = {
  enabled?: boolean;
  onDirectMessage?: (message: IDirectMessageDto) => void;
  onLotMessage?: (message: ILotMessageDto) => void;
};

export const useAuctionHub = ({
  enabled = true,
  onDirectMessage,
  onLotMessage,
}: UseAuctionHubOptions = {}) => {
  const connectionRef = useRef<HubConnection | null>(null);
  const onDirectMessageRef = useRef(onDirectMessage);
  const onLotMessageRef = useRef(onLotMessage);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    onDirectMessageRef.current = onDirectMessage;
  }, [onDirectMessage]);

  useEffect(() => {
    onLotMessageRef.current = onLotMessage;
  }, [onLotMessage]);

  useEffect(() => {
    if (!enabled) return;

    const connection = createAuctionHub();
    connectionRef.current = connection;

    connection.on(AUCTION_HUB_EVENTS.DIRECT_MESSAGE, (dto: IDirectMessageDto) => {
      onDirectMessageRef.current?.(dto);
    });
    connection.on(AUCTION_HUB_EVENTS.LOT_MESSAGE, (dto: ILotMessageDto) => {
      onLotMessageRef.current?.(dto);
    });

    connection
      .start()
      .then(() => {
        setIsConnected(true);
        setError(null);
      })
      .catch((err) => {
        setIsConnected(false);
        setError(err instanceof Error ? err : new Error("Realtime connection failed"));
      });

    connection.onreconnected(() => setIsConnected(true));
    connection.onclose(() => setIsConnected(false));

    return () => {
      connection.off(AUCTION_HUB_EVENTS.DIRECT_MESSAGE);
      connection.off(AUCTION_HUB_EVENTS.LOT_MESSAGE);
      void connection.stop();
      connectionRef.current = null;
      setIsConnected(false);
    };
  }, [enabled]);

  const sendDirectMessage = useCallback(async (recipientUserId: number, content: string) => {
    const connection = connectionRef.current;
    if (!connection) {
      throw new Error("Chat connection is not ready yet.");
    }

    await connection.invoke(AUCTION_HUB_METHODS.SEND_DIRECT_MESSAGE, recipientUserId, content);
  }, []);

  const joinLot = useCallback(async (lotId: number) => {
    const connection = connectionRef.current;
    if (!connection) {
      throw new Error("Chat connection is not ready yet.");
    }

    await connection.invoke(AUCTION_HUB_METHODS.JOIN_LOT, lotId);
  }, []);

  const leaveLot = useCallback(async (lotId: number) => {
    const connection = connectionRef.current;
    if (!connection) return;

    await connection.invoke(AUCTION_HUB_METHODS.LEAVE_LOT, lotId);
  }, []);

  const sendLotMessage = useCallback(async (lotId: number, content: string) => {
    const connection = connectionRef.current;
    if (!connection) {
      throw new Error("Chat connection is not ready yet.");
    }

    await connection.invoke(AUCTION_HUB_METHODS.SEND_LOT_MESSAGE, lotId, content);
  }, []);

  const markDirectRead = useCallback(async (messageId: number) => {
    const connection = connectionRef.current;
    if (!connection) {
      throw new Error("Chat connection is not ready yet.");
    }

    await connection.invoke(AUCTION_HUB_METHODS.MARK_DIRECT_READ, messageId);
  }, []);

  return {
    sendDirectMessage,
    sendLotMessage,
    joinLot,
    leaveLot,
    markDirectRead,
    isConnected,
    error,
  };
};
