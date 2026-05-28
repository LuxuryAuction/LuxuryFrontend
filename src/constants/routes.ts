/**
 * Route configuration for the application.
 */

// Routes that are accessible only to administrators
export const ADMIN_ROUTES = [
  "/admin",
];

// Routes that require authentication (any role)
export const PROTECTED_ROUTES = [
  "/user/create-lot",
  "/user/my-bids",
  "/user/lots",
  "/user/notifications",
  "/user/chat",
];

// Routes for authentication (should redirect to home/dashboard if already logged in)
export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
];

// Public routes that anyone can access (including /user/categories etc. as requested)
export const PUBLIC_ROUTES = [
  "/",
  "/user/profile",
  "/user/categories",
  "/user/auction-rules",
  "/user/info",
  "/user/trust",
  "/user/verified-sellers",
];
