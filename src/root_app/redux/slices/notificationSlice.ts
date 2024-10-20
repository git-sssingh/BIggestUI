import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type NoticeMethods = "success" | "error" | "warning" | "info";

interface INotification {
  type: NoticeMethods;
  message: string;
}

const initialState: INotification = {
  type: "success",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    success: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        type: "success",
        message: action.payload,
      };
    },
    error: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        type: "error",
        message: action.payload,
      };
    },
    warning: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        type: "warning",
        message: action.payload,
      };
    },
    info: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        type: "info",
        message: action.payload,
      };
    },
  },
});

export const { success, error, info, warning } =
  notificationSlice.actions;
export default notificationSlice.reducer;
