import { IAuthTokens } from "../services/AuthService/types";

// Helper to get cookie value by name
export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const setSession = (tokens: IAuthTokens) => {
  if (typeof window !== "undefined") {
    const expires = new Date(tokens.accessTokenExpiresAt).toUTCString();
    const cookieOptions = `path=/; SameSite=Lax; expires=${expires}`;

    document.cookie = `accessToken=${tokens.accessToken}; ${cookieOptions}`;
    document.cookie = `refreshToken=${tokens.refreshToken}; ${cookieOptions}`;
    document.cookie = `userId=${tokens.userId}; ${cookieOptions}`;
    document.cookie = `userName=${tokens.userName}; ${cookieOptions}`;
    document.cookie = `userRole=${tokens.userRole.toLowerCase()}; ${cookieOptions}`;
  }
};

export const getAccessToken = (): string | null => {
  return getCookie("accessToken");
};

export const getRefreshToken = (): string | null => {
  return getCookie("refreshToken");
};

export const clearSession = () => {
  if (typeof window !== "undefined") {
    const expired = "path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `accessToken=; ${expired}`;
    document.cookie = `refreshToken=; ${expired}`;
    document.cookie = `userId=; ${expired}`;
    document.cookie = `userName=; ${expired}`;
    document.cookie = `userRole=; ${expired}`;
  }
};
