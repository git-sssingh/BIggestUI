export interface IMenuItem {
  route?: string;
  literal: string;
  key?: string;
}

export type DecodeTokenType = {
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
};

export type CModalHandler = {
  modalOpen: (value: boolean) => void;
  close: () => void;
};

export type CPopupConfirmHandle = {
  open: (value: boolean) => void;
};
