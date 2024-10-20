import { createSlice } from "@reduxjs/toolkit";

interface ILoader {
  loading: boolean;
}

const initialState: ILoader = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
    },
    stop: (state) => {
      state.loading = false;
    },
  },
});

export const { start, stop } = loaderSlice.actions;
export default loaderSlice.reducer;
