import { useState } from "react";
import { authService } from "../services/AuthService";
import { ILoginRequest, IRegisterRequest } from "../services/AuthService/types";
import { setSession, clearSession } from "../utils/session";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (payload: ILoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await authService.login(payload);
      setSession(responseData);
      return responseData;
    } catch (err) {
      const authError = err instanceof Error ? err : new Error("Failed to login");
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: IRegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await authService.register(payload);
      return responseData;
    } catch (err) {
      const authError = err instanceof Error ? err : new Error("Failed to register");
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout request failed, clearing session anyway:", err);
    } finally {
      clearSession();
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
};
