import { API_URLS } from "../constants";
import { makeRequest, API_UTILS } from "../utilities";

export const getReport = async (signal: AbortSignal) => {
  return await makeRequest(API_URLS.GET_REPORT, API_UTILS.GET_OPTIONS, signal);
};
