
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
    PROFILE: (userId: number | string) => `users/${userId}/profile`,
    NOTIFICATIONS: (userId: number | string) => `users/${userId}/notifications`,
    NOTIFICATIONS_READ: (userId: number | string) => `users/${userId}/notifications/read`,
  },
  CATEGORIES: {
    LIST: "categories",
    BY_ID: (id: number) => `admin/categories/${id}`,
    UPDATE_STATUS: (id: number) => `admin/categories${id}/status`
  },
  LOTS:{
    LIST: 'lots',
    GET_BY_ID: (id: number) => `lots/${id}`,
    USER_LOTS: (userId: number | string) => `lots/user/${userId}`,
  }
}