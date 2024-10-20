import { API_URLS } from "../constants";
import {
  IPostTeam,
  IPutAssignedUserToTeam,
  IPutTeam,
} from "../interfaces/teams";
import { API_UTILS, makeRequest } from "../utilities";

export const postTeam = async (data: IPostTeam, signal: AbortSignal) => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(data) };
  return await makeRequest(API_URLS.POST_TEAM, payload, signal);
};

export const getTeamById = async (id: string, signal: AbortSignal) => {
  return await makeRequest(
    `${API_URLS.GET_TEAM_BY_ID}${id}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const getCompanyTeams = async (signal: AbortSignal) => {
  return await makeRequest(
    API_URLS.GET_COMPANY_TEAMS,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const putTeam = async (
  teamId: string,
  data: IPutTeam,
  signal: AbortSignal
) => {
  const payload = { ...API_UTILS.PUT_OPTIONS, body: JSON.stringify(data) };
  return await makeRequest(
    `${API_URLS.PUT_TEAM_BY_ID}${teamId}`,
    payload,
    signal
  );
};

export const putAssignedUserById = async (
  teamId: string,
  data: IPutAssignedUserToTeam,
  signal: AbortSignal
) => {
  const payload = { ...API_UTILS.PUT_OPTIONS, body: JSON.stringify(data) };
  return await makeRequest(
    `${API_URLS.PUT_ASSIGNED_USERS_BY_ID}${teamId}`,
    payload,
    signal
  );
};
