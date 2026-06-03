export interface IDirectChatUser {
  id: number;
  userName: string;
  profileImage: string | null;
}

export interface IDirectMessageDto {
  id: number;
  chatId: number;
  senderId: number;
  senderUserName: string;
  senderProfileImage: string | null;
  recipientId: number;
  recipientUserName: string;
  content: string;
  createdAt: string;
  readAt: string | null;
}

export interface ILotMessageDto {
  id: number;
  lotId: number;
  senderId: number;
  senderUserName: string;
  senderProfileImage: string | null;
  content: string;
  createdAt: string;
}

export interface IDirectChatDto {
  chatId: number;
  otherUser: IDirectChatUser;
  lastMessage: IDirectMessageDto | null;
  unreadCount: number;
  updatedAt: string;
}

export interface ICreateDirectChatRequest {
  otherUserId: number;
}
