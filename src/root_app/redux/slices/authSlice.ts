import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAuthLocalStorage } from "../../storage/local";
import { IAuthentication } from "../../interfaces/user";

const getInitialState = (): IAuthentication => {
  const authDetails = getAuthLocalStorage();
  return {
    accessToken: (authDetails.accessToken || "") as string,
    refreshToken: (authDetails.refreshToken || "") as string,
  };
};

const initialState: IAuthentication = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuth: (state, action: PayloadAction<IAuthentication>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearAuth: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { saveAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
