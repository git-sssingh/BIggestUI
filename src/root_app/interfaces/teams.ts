import { ICommonResponse } from "./commons";

export interface IUserTeamResponse {
  id: string;
  name: string;
  profilePic: string;
  description: string;
  createdDate: string;
  lastUpdated: string;
  canRead: boolean;
  canWrite: boolean;
  canComment: boolean;
  canAnswer: boolean;
  isOwner: boolean;
  isActive: boolean;
}

export interface ITeamResponse {
  id: string;
  title: string;
  description: string | null;
  logo: string | null;
  banner: string | null;
  isActive: boolean | null;
  createdDate: string;
  lastUpdatedDate: string;
  createdBy: ICommonResponse;
  lastUpdatedBy: ICommonResponse;
  members: IUserTeamResponse[];
}

export interface ICreateTeamRequest {
  title: string;
  description: string | null;
  logo: string | null;
  bannerImage: string | null;
}

export interface IUpdateTeamRequest extends ICreateTeamRequest {
  isActive: boolean;
}

export interface IAssignUserToTeamRequest {
  members: IMembersRequest[];
}

export interface IMembersRequest {
  id: string;
  read: boolean;
  write: boolean;
  owner: boolean;
  canAnswer: boolean;
  canComment: boolean;
  isActive: boolean;
}

export interface IPostTeam extends ICreateTeamRequest {}

export interface IGetTeamById extends ITeamResponse {}

export interface IGetTeams {
  teams: ITeamResponse[];
}

export interface IPutTeam extends IUpdateTeamRequest {}

export interface IPutAssignedUserToTeam extends IAssignUserToTeamRequest {}
