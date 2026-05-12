import { IAuthTokens } from "../services/AuthService/types";

export const setSession = (tokens: IAuthTokens) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("accessTokenExpiresAt", tokens.accessTokenExpiresAt);
    localStorage.setItem("refreshTokenExpiresAt", tokens.refreshTokenExpiresAt);
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken");
  }
  return null;
};

export const getRefreshTokenExpiresAt = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshTokenExpiresAt");
  }
  return null;
};

export const clearSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpiresAt");
    localStorage.removeItem("refreshTokenExpiresAt");
  }
};
