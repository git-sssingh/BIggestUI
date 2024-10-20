// import { SESSION_STORAGE_KEYS } from "../constants";

import { LOCAL_STORAGE_KEYS } from "../constants";
import { IAuthentication } from "../interfaces/user";

const setAuthLocalStorage = (value: IAuthentication): void => {
  if (!value) return;
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_DETAILS, JSON.stringify(value));
};

const getAuthLocalStorage = (): IAuthentication => {
  const authDetails = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_DETAILS);
  return authDetails ? JSON.parse(authDetails) : "";
};

const removeAuthLocalStorage = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_DETAILS);
};

const setLastVisitedUrlLocalStorage = (value: string): void => {
  localStorage.setItem("last url", JSON.stringify(value));
};

const getLastVisitedUrlLocalStorage = (): string => {
  const lastUrl = localStorage.getItem("last url");
  return lastUrl ? JSON.parse(lastUrl) : undefined;
};

const removeLastVisitedUrlLocalStorage = (): void => {
  localStorage.removeItem("last url");
};

const setQuestionsCurrentPageLocalStorage = (value: number): void => {
  localStorage.setItem("questions current page", JSON.stringify(value));
};

const getQuestionsCurrentPageLocalStorage = (): number => {
  const currentPage = localStorage.getItem("questions current page");
  return currentPage ? JSON.parse(currentPage) : 1;
};

const removeQuestionsCurrentPageLocalStorage = (): void => {
  localStorage.removeItem("questions current page");
};

const clearLocalStorage = (): void => {
  localStorage.clear();
};

export {
  // clear
  clearLocalStorage,

  // get
  getAuthLocalStorage,
  getLastVisitedUrlLocalStorage,
  getQuestionsCurrentPageLocalStorage,

  // remove
  removeAuthLocalStorage,
  removeLastVisitedUrlLocalStorage,
  removeQuestionsCurrentPageLocalStorage,

  // set
  setAuthLocalStorage,
  setLastVisitedUrlLocalStorage,
  setQuestionsCurrentPageLocalStorage,
};
