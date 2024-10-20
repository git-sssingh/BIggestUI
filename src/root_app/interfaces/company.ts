import { ISubscriptionPlan } from "./subscription";

export interface ICreateCompany {
  name: string;
  description: string | null;
  address: string;
  city: string;
  pinCode: string;
  subscriptionId: string;
  emailId: string;
  contactNumber: string;
  paymentDetails: IPaymentDetails;
}

export interface IPaymentDetails {
  amount: number;
  transactionId: string;
  details: string;
}

export interface ICompany {
  name: string;
  description: string | null;
  addresses: ICompanyAddress[];
  publicId: string;
  createdDate: string;
  lastUpdatedDate: string;
}

export interface ICompanyAddress {
  address: string;
  city: string;
  pinCode: string;
}

export interface ICompanySubscriptionResponse {
  subscritionId: string;
  title: string;
  description: string;
  plan: ISubscriptionPlan;
  dateOptedIn: string;
  expiringDate: string;
  isActive: boolean;
}

export interface IPostCompany extends ICreateCompany {}

export interface IGetCompanyById extends ICompany, ICompanyAddress {}

export interface IGetCompanies {
  companies: (ICompany & ICompanyAddress)[];
}

export interface IGetCompanySubscriptions {
  subscriptions: ICompanySubscriptionResponse[];
}
