import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITags {
  searchedTags: string[];
}

const initialState: ITags = {
  searchedTags: [],
};

const blogsByTagSearchSlice = createSlice({
  name: "blogsByTagSearch",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      if (!action.payload) return;
      if (!state.searchedTags?.includes(action.payload)) {
        state.searchedTags = [...state.searchedTags, action.payload.trim()];
      }
    },
    clear: (state) => {
      state.searchedTags = [];
    },
  },
});

export const { set, clear } = blogsByTagSearchSlice.actions;
export default blogsByTagSearchSlice.reducer;
