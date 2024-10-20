import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITags {
  searchedTags: string[];
}

const initialState: ITags = {
  searchedTags: [],
};

const questionsByTagSearchSlice = createSlice({
  name: "questionsByTagSearch",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      if (!action.payload) return;

      if (!state.searchedTags?.includes(action.payload)) {
        state.searchedTags = [...state.searchedTags, action.payload];
      }
    },
    clear: (state) => {
      state.searchedTags = [];
    },
  },
});

export const { set, clear } = questionsByTagSearchSlice.actions;
export default questionsByTagSearchSlice.reducer;
