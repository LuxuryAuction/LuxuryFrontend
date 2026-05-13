"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import { setAuth } from "../store/slices/authSlice";
import { getCookie } from "../utils/session";

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = getCookie("accessToken");
      const userId = getCookie("userId");
      const userName = getCookie("userName");
      const userRole = getCookie("userRole");

      if (accessToken && userId && userName && userRole) {
        dispatch(
          setAuth({
            userId: Number(userId),
            userName,
            userRole,
          })
        );
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  );
}
