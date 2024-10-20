import { API_URLS } from "../constants";
import { IApiResponse } from "../interfaces/commons";
import { IPostIssue } from "../interfaces/issues";
import { API_UTILS, makeRequest } from "../utilities";

export const getAllIssues = async (
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.GET_OPTIONS };

  return await makeRequest(API_URLS.GET_ISSUES, payload, signal);
};

export const getIssueById = async (
  id: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.GET_OPTIONS };
  return await makeRequest(`${API_URLS.GET_ISSUE_BY_ID}${id}`, payload, signal);
};

export const postIssue = async (data: IPostIssue, signal: AbortSignal) => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(data) };
  return await makeRequest(API_URLS.POST_ISSUE, payload, signal);
};
