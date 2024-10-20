import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import DefaultImage from "../../assets/profile.png";
import { DecodeTokenType } from "../../types";
import { decodeToken } from "../../utilities";
import { getAuthLocalStorage } from "../../storage/local";

interface IUser {
  Id: string;
  CompanyId: string;
  CompanyName: string;
  Name: string;
  ProfileImage: string;
  QuestionPoints: number;
  AnswerPoints: number;
  TeamId: string;
  CompanyCode: string;
  SubscriptionId: string;
  SubscriptionDetails: string;
  exp: number | string;
}

const getInitialState = (): IUser => {
  const authDetails = getAuthLocalStorage();
  let decodedToken: DecodeTokenType = authDetails?.accessToken
    ? decodeToken<DecodeTokenType>(authDetails?.accessToken as string)
    : ({} as DecodeTokenType);
  return {
    Id: decodedToken?.Id || "",
    CompanyId: decodedToken?.CompanyId || "",
    CompanyName: decodedToken?.CompanyName || "",
    Name: decodedToken?.Name || "",
    ProfileImage: decodedToken?.ProfileImage || DefaultImage,
    QuestionPoints: decodedToken?.QuestionPoints || 0,
    AnswerPoints: decodedToken?.AnswerPoints || 0,
    TeamId: decodedToken?.TeamId || "",
    CompanyCode: decodedToken?.CompanyCode || "",
    SubscriptionId: decodedToken?.SubscriptionId || "",
    SubscriptionDetails: decodedToken?.SubscriptionDetails || "",
    exp: decodedToken?.exp || "",
  };
};

const initialState: IUser = getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<IUser>) => {
      const newState = {
        ...state,
        ...action.payload,
      };
      return newState;
    },
  },
});

export const { save } = userSlice.actions;
export default userSlice.reducer;
