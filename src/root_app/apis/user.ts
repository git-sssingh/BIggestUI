import { API_URLS } from "../constants";
import {
  IAuthentication,
  IForgetPassword,
  IResetPassword,
  ISignIn,
  ISignup,
  IUpdateUserRequest,
} from "../interfaces/user";
import { API_UTILS, makeRequest } from "../utilities";
import { IApiResponse } from "../interfaces/commons";

export const postCreateUser = async (body: ISignup, signal: AbortSignal) => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(body) };

  return await makeRequest(API_URLS.POST_SIGNUP, payload, signal);
};

export const getCompanyUsers = async (id: string, signal: AbortSignal) => {
  return await makeRequest(
    `${API_URLS.GET_COMPANY_USERS}${id}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const getUserById = async (id: string, signal: AbortSignal) => {
  return await makeRequest(
    `${API_URLS.GET_USER_BY_ID}${id}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const postForgotPassword = async (
  body: IForgetPassword,
  signal: AbortSignal
) => {
  const payload = {
    ...API_UTILS.POST_OPTIONS,
    body: JSON.stringify(body),
  };

  return await makeRequest(API_URLS.POST_FORGOT_PASSWORD, payload, signal);
};

export const putResetPassword = async (
  body: IResetPassword,
  signal: AbortSignal
) => {
  const payload = {
    ...API_UTILS.PUT_OPTIONS,
    body: JSON.stringify(body),
  };

  return await makeRequest(API_URLS.PUT_RESET_PASSWORD, payload, signal);
};

export const postSignIn = async (
  body: ISignIn,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(body) };

  return await makeRequest(API_URLS.POST_LOGIN, payload, signal);
};

export const getUserTeams = async (userId: string, signal: AbortSignal) => {
  return await makeRequest(
    `${API_URLS.GET_USER_TEAMS}${userId}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const putUpdateProfilePic = async (
  body: string,
  signal: AbortSignal
) => {
  const payload = { ...API_UTILS.PUT_OPTIONS, body: JSON.stringify(body) };

  return await makeRequest(API_URLS.PUT_USER_PROFILE_PIC, payload, signal);
};

export const putUpdateUser = async (
  body: IUpdateUserRequest,
  signal: AbortSignal
) => {
  const payload = { ...API_UTILS.PUT_OPTIONS, body: JSON.stringify(body) };

  return await makeRequest(API_URLS.PUT_USER_PROFILE, payload, signal);
};

export const getUserActivityCount = async (
  userId: string,
  signal: AbortSignal
) => {
  return await makeRequest(
    `${API_URLS.GET_USER_ACTIVITY_COUNT}${userId}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const getUsersByTeam = async (teamId: string, signal: AbortSignal) => {
  return await makeRequest(
    `${API_URLS.GET_USERS_BY_TEAM}${teamId}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const postRefreshToken = async (
  payload: IAuthentication,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const body = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(payload) };
  return await makeRequest(API_URLS.POST_REFRESH_TOKEN, body, signal);
};
