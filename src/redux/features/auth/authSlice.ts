import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TUser = {
  email: string;
  exp: number;
  iat: number;
  _id: string;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authslice.actions;
export default authslice.reducer;
export const useCurrentUser = (state: RootState) => state.auth.user;
