
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
    ME: {
      PROFILE: 'users/me/profile',
      MY_LOTS: 'users/me/lots',
      NOTIFICATIONS: {
        LIST: 'users/me/notifications',
        READ: 'users/me/notifications/read',
      },
    }
  },
  CATEGORIES: {
    LIST: "categories",
    BY_ID: (id: number) => `admin/categories/${id}`,
    UPDATE_STATUS: (id: number) => `admin/categories${id}/status`
  },
  LOTS:{
    LIST: 'lots',
    GET_BY_ID: (id: number) => `lots/${id}`
  }
}