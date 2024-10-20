import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { themeSettings } from "../../../theme";
import { ThemeConfig } from "antd";

interface ITheme {
  mode: string;
  theme: ThemeConfig;
}

const initialState: ITheme = {
  mode: "light",
  theme: themeSettings("light"),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<string>) => {
      const newState = {
        ...state,
        mode: action.payload,
        theme: themeSettings(state.mode === "light" ? "dark" : "light"),
      };
      return newState;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
