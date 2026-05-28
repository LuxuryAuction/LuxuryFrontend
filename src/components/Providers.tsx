"use client";

import { useLayoutEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import { setAuth } from "../store/slices/authSlice";
import { readClientAuthSession } from "../utils/authSession";

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const session = readClientAuthSession();
    if (session.isAuthenticated) {
      dispatch(
        setAuth({
          userId: session.userId,
          userName: session.userName,
          userRole: session.userRole,
        }),
      );
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
