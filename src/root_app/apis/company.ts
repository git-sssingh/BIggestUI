import { API_URLS } from "../constants";
import { IApiResponse } from "../interfaces/commons";
import { ICreateCompany } from "../interfaces/company";
import { API_UTILS, makeRequest } from "../utilities";

export const postCompany = async (
  data: ICreateCompany,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = {
    ...API_UTILS.POST_OPTIONS,
    body: JSON.stringify(data),
  };

  return await makeRequest(API_URLS.POST_COMPANY, payload, signal);
};

export const getCompanyById = async (id: string, signal: AbortSignal) => {
  return await makeRequest(
    `${API_URLS.GET_COMPANY_BY_ID}${id}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const getCompanies = async (signal: AbortSignal) => {
  return await makeRequest(
    API_URLS.GET_COMPANIES,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const getCompanySubscriptions = async (
  companyId: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.GET_COMPANY_SUBSCRIPTIONS_BY_COMPANY_ID}${companyId}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};
