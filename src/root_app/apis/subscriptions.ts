import { API_URLS } from "../constants";
import { IApiResponse } from "../interfaces/commons";
import { ISubscription } from "../interfaces/subscription";
import { API_UTILS, makeRequest } from "../utilities";

export const createSubscription = async (
  data: ISubscription,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(data) };

  return await makeRequest(API_URLS.POST_SUBSCRIPTION, payload, signal);
};

export const getSubscriptions = async (
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.GET_OPTIONS };
  return await makeRequest(API_URLS.GET_SUBSCRIPTIONS, payload, signal);
};

export const getSubscriptionById = async (
  id: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.GET_SUBSCRIPTION_BY_ID}${id}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const updateSubscriptionById = async (
  id: string,
  data: ISubscription,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.PUT_OPTIONS, body: JSON.stringify(data) };

  return await makeRequest(
    `${API_URLS.PUT_SUBSCRIPTION_BY_ID}${id}`,
    payload,
    signal
  );
};
