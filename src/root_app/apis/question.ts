import { API_URLS } from "../constants";
import { IApiResponse } from "../interfaces/commons";
import {
  ICreateQuestionRequest,
  IPostQuestionBookmark,
  IPutQuestion,
} from "../interfaces/question";
import { API_UTILS, makeRequest } from "../utilities";

export const postQuestion = async (
  data: ICreateQuestionRequest,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(data) };

  return await makeRequest(API_URLS.POST_QUESTION, payload, signal);
};

export const getQuestionById = async (
  id: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.GET_QUESTION_BY_ID}${id}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const getQuestionsByCompanyId = async (
  companyId: string,
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.GET_QUESTIONS_BY_COMPANY_ID}${companyId}/pageNumber/${pageNumber}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const getQuestionsByTeam = async (
  teamId: string,
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.GET_QUESTIONS_BY_TEAM}${teamId}/pageNumber/${pageNumber}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const getQuestionsByAuthor = async (
  authorId: string,
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.GET_QUESTIONS_BY_AUTHOR}${authorId}/pageNumber/${pageNumber}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const deleteQuestionById = async (
  id: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.DELETE_QUESTION_BY_ID}${id}`,
    API_UTILS.DELETE_OPTIONS,
    signal
  );
};

export const postQuestionBookmark = async (
  body: IPostQuestionBookmark,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = {
    ...API_UTILS.POST_OPTIONS,
    body: JSON.stringify(body),
  };

  return await makeRequest(API_URLS.POST_QUESTION_BOOKMARK, payload, signal);
};

export const deleteQuestionBookmark = async (
  questionId: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.DELETE_QUESTION_BOOKMARK}${questionId}`,
    API_UTILS.DELETE_OPTIONS,
    signal
  );
};

export const getBookmarkedQuestions = async (
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.GET_BOOKMARKED_QUESTIONS}/pageNumber/${pageNumber}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const postQuestionUpvote = async (
  questionId: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.POST_QUESTION_UPVOTE_BY_ID}${questionId}`,
    API_UTILS.POST_OPTIONS,
    signal
  );
};

export const postQuestionDownvote = async (
  questionId: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.POST_QUESTION_DOWNVOTE_BY_ID}${questionId}`,
    API_UTILS.POST_OPTIONS,
    signal
  );
};

export const getQuestionsBySearch = async (
  value: string,
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    `${API_URLS.GET_QUESTIONS_BY_SEARCH}${value}/pageNumber/${pageNumber}`,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const getQuestionTags = async (
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    API_URLS.GET_QUESTION_TAGS,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const postQuestionsByTags = async (
  tags: string[],
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(tags) };

  return await makeRequest(
    `${API_URLS.POST_QUESTIONS_BY_TAGS}${pageNumber}`,
    payload,
    signal
  );
};

export const putQuestionById = async (
  questionId: string,
  data: IPutQuestion,
  signal: AbortSignal
) => {
  const payload = { ...API_UTILS.PUT_OPTIONS, body: JSON.stringify(data) };

  return await makeRequest(
    `${API_URLS.PUT_QUESTION_BY_ID}${questionId}`,
    payload,
    signal
  );
};
