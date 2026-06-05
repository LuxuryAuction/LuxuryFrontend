import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: number | null;
  userName: string | null;
  userRole: string | null;
  balance: number | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userId: null,
  userName: null,
  userRole: null,
  balance: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ userId: number; userName: string; userRole: string }>
    ) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userRole = action.payload.userRole.toLowerCase();
      state.isAuthenticated = true;
    },
    setUserBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.userName = null;
      state.userRole = null;
      state.balance = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, setUserBalance, clearAuth } = authSlice.actions;
export default authSlice.reducer;
