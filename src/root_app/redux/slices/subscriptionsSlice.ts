import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISubscription } from "../../interfaces/subscription";

interface ISubscriptions {
  searchedSubscription: ISubscription | null;
  subscriptions: ISubscription[];
}

const initialState: ISubscriptions = {
  searchedSubscription: null,
  subscriptions: [],
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ISubscription[]>) => {
      if (!action.payload) return;

      state.subscriptions = [...action.payload];
    },
    get: (state, action: PayloadAction<string>) => {
      var result = state.subscriptions?.filter((x) => x.id === action.payload);
      state.searchedSubscription = result?.length > 0 ? result[0] : null;
    },
  },
});

export const { set, get } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
