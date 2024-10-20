import { API_URLS } from "../constants";
import { ICreateAnswerRequest, IPutAnswerVote } from "../interfaces/answer";
import { API_UTILS, makeRequest } from "../utilities";

export const postAnswer = async (
  data: ICreateAnswerRequest,
  signal: AbortSignal
) => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(data) };

  return await makeRequest(API_URLS.POST_ANSWER, payload, signal);
};

export const deleteAnswerById = async (id: string, signal: AbortSignal) => {
  return await makeRequest(
    `${API_URLS.DELETE_ANSWER_BY_ID}${id}`,
    API_UTILS.DELETE_OPTIONS,
    signal
  );
};

export const putAnswerVote = async (
  id: string,
  body: IPutAnswerVote,
  signal: AbortSignal
) => {
  const payload = {
    ...API_UTILS.PUT_OPTIONS,
    body: JSON.stringify(body),
  };

  return await makeRequest(`${API_URLS.PUT_ANSWER_VOTE}${id}`, payload, signal);
};

export const putAcceptAnswer = async (
  questionId: string,
  answerId: string,
  signal: AbortSignal
) => {
  return await makeRequest(
    `${API_URLS.PUT_ACCEPT_ANSWER}${questionId}/${answerId}`,
    API_UTILS.PUT_OPTIONS,
    signal
  );
};
