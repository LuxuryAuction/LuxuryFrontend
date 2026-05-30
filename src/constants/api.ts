
/**
 * Common API endpoints
 */
export const API_ENDPOINTS = { 
  AUTH: {
    REGISTER: 'auth/register',
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
  },
  USERS: {
    PROFILE: (userName: string) => `users/${userName}/profile`,
    NOTIFICATIONS: (userName: string) => `users/${userName}/notifications`,
    NOTIFICATIONS_READ_ALL: (userName: string) => `users/${userName}/notifications/read`,
    NOTIFICATION_READ: (userName: string, notificationId: number | string) =>
      `users/${userName}/notifications/${notificationId}/read`,
    BIDS: (userName: string) => `users/${userName}/bids`,
  },
  CATEGORIES: {
    LIST: "categories",
    CREATE: "admin/categories",
    BY_ID: (id: number) => `admin/categories/${id}`,
    UPDATE_STATUS: (id: number) => `admin/categories${id}/status`
  },
  LOTS:{
    LIST: 'lots',
    GET_BY_ID: (id: number) => `lots/${id}`,
    PLACE_BID: (id: number) => `lots/${id}/bids`,
  },
  CHATS: {
    DIRECT: "chats/direct",
    DIRECT_MESSAGES: (chatId: number | string) => `chats/direct/${chatId}/messages`,
  }
}