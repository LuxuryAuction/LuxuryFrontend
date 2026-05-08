
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
    }
  },
  CATEGORIES:{
    LIST: 'categories'
  },
  LOTS:{
    LIST: 'lots',
    GET_BY_ID: (id: number) => `lots/${id}`
  }
}