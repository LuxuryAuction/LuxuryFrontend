import { API_ENDPOINTS } from "@/src/constants/api";
import { api } from "../apiService";
import type { ICreateDirectChatRequest, IDirectChatDto, IDirectMessageDto, ILotMessageDto } from "./types";

export const chatService = {
  getDirectChats: async (): Promise<IDirectChatDto[]> => {
    return api.get<IDirectChatDto[]>(API_ENDPOINTS.CHATS.DIRECT);
  },

  createDirectChat: async (data: ICreateDirectChatRequest): Promise<IDirectChatDto> => {
    return api.post<IDirectChatDto>(API_ENDPOINTS.CHATS.DIRECT, data);
  },

  getDirectMessages: async (chatId: number | string): Promise<IDirectMessageDto[]> => {
    return api.get<IDirectMessageDto[]>(API_ENDPOINTS.CHATS.DIRECT_MESSAGES(chatId));
  },

  getLotMessages: async (lotId: number | string): Promise<ILotMessageDto[]> => {
    return api.get<ILotMessageDto[]>(API_ENDPOINTS.CHATS.LOT_MESSAGES(lotId));
  },
};
