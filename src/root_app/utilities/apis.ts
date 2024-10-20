import { API_METHODS, ROUTES } from "../constants";
import { IApiResponse } from "../interfaces/commons";
import authSlice from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { getAuthLocalStorage } from "../storage/local";

const getApiOptions = () => {
  const authDetails = getAuthLocalStorage();

  return {
    mode: "cors",
    cache: "no-cache",
    // credentials: "same-origin",
    headers: {
      "Content-Type":
        "application/json, application/x-www-form-urlencoded, multipart/form-data",
      Authorization: `Bearer ${authDetails?.accessToken || ""}`,
      Accept: "*/*",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
};

export const API_UTILS = {
  GET_OPTIONS: {
    ...getApiOptions(),
    method: API_METHODS.GET,
  },
  POST_OPTIONS: {
    ...getApiOptions(),
    method: API_METHODS.POST,
    body: {},
  },
  PUT_OPTIONS: {
    ...getApiOptions(),
    method: API_METHODS.PUT,
    body: {},
  },
  DELETE_OPTIONS: {
    ...getApiOptions(),
    method: API_METHODS.DELETE,
  },
};

export const makeRequest = async (
  url: string,
  payload: any,
  signal: AbortSignal
): Promise<IApiResponse> => {
  let apiResponse: IApiResponse = {
    status: 200,
    statusText: "",
    data: null,
    error: "",
  };

  payload = {
    ...payload,
    headers: {
      ...payload.headers,
      Authorization: `Bearer ${getAuthLocalStorage()?.accessToken}`,
    },
  };

  return fetch(url, {
    ...payload,
    signal,
  })
    .then((response) => {
      apiResponse.status = response?.status;
      if (response?.status === 404) {
        window.location.href = `#/*`;
      }
      if (response?.status === 401) {
        window.location.href = `#${ROUTES.signIn}`;
      }
      apiResponse.statusText = response?.statusText;
      return response.json();
    })
    .then((responseData) => {
      apiResponse.data = responseData;
      apiResponse.statusText =
        responseData?.message ||
        responseData?.statusText ||
        responseData?.error ||
        "";

      return apiResponse;
    })
    .catch((error: Error) => {
      apiResponse.error = !apiResponse.statusText
        ? error.message
        : apiResponse.statusText;
      return apiResponse;
    });
};
