import { ICommonResponse } from "./commons";

export interface IAuthentication {
  accessToken: string;
  refreshToken: string;
}

export interface ISignIn {
  emailId: string;
  password: string;
}

export interface ISignup {
  name: string;
  description: string | null;
  userId: string;
  emailId: string;
  contactNumber: string | null;
  designation: string | null;
  password: string;
  companyId: string;
}

export interface IForgetPassword {
  emailId: string;
}

export interface IResetPassword {
  password: string;
}

export interface IUserResponse {
  name: string;
  description: string | null;
  userId: string;
  emailId: string;
  contactNumber: string | null;
  designation: string | null;
  isActive: boolean;
  createdDate: string;
  lastUpdated: string;
  profilePic: string | null;
  id: string;
  companyDetail: ICommonResponse;
  questionPoint?: number;
  answerPoint?: number;
}

export interface IUserTeamResponse {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  lastUpdated: string;
  owner: ICommonResponse;
  canRead: boolean;
  canWrite: boolean;
  canComment: boolean;
  canAnswer: boolean;
  isOwner: boolean;
}

export interface IUpdateUserRequest {
  name: string;
  description: string | null;
  contactNumber: string | null;
  designation: string | null;
}

export interface IUserCountResponse {
  publicId: string;
  questionCount: number;
  answerCount: number;
  wikiCount: number;
  userTeamCount: number;
}

export interface IGetTeamByUser {
  teams: IUserTeamResponse[];
}

export interface IGetUsersByTeam {
  users: IUserResponse[];
}
