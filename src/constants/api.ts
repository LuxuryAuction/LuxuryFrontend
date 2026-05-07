
/**
 * Common API endpoints
 */
export const API_ENDPOINTS = { 
  CATEGORIES:{
    LIST: 'categories'
  },
  LOTS:{
    LIST: 'lots',
    GET_BY_ID: (id: number) => `lots/${id}`
  }
}