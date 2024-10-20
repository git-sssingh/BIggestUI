export interface IBase {
  id: string;
  createdDate: string;
}

export interface ISubscriptionPlan {
  noOfTeamsCreate: number;
  noOfQuestionsPost: number;
  noOfWikisPost: number;
  noOfUsers: number;
  canSeeReport: boolean;
}

export interface ISubscription {
  id: string;
  title: string;
  description: string | null;
  plan: ISubscriptionPlan;
  amount: number;
  validDay: number;
}

export interface ICreateSubscription extends ISubscription {}

export interface IUpdateSubscription extends ISubscription {}

export interface IGetSubscription extends IBase, ISubscription {}

export interface IGetSubscriptions {
  subscriptions: (ISubscription & IBase)[];
}
