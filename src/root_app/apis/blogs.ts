import { API_URLS } from "../constants";
import {
  IBookMarkBlog,
  ICreateBlogRequest,
  IUpdateBlogRequest,
} from "../interfaces/blogs";
import { IApiResponse } from "../interfaces/commons";
import { API_UTILS, makeRequest } from "../utilities";

export const postBlog = async (
  data: ICreateBlogRequest,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(data) };

  return await makeRequest(API_URLS.POST_BLOG, payload, signal);
};

export const getBlogById = async (
  id: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.GET_OPTIONS };
  return await makeRequest(
    `${API_URLS.GET_BLOG_BY_ID}?id=${id}`,
    payload,
    signal
  );
};

export const getBlogsByCompanyId = async (
  id: string,
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.GET_OPTIONS };
  return await makeRequest(
    `${API_URLS.GET_BLOGS_BY_COMPANY_ID}${id}/pageNumber/${pageNumber}`,
    payload,
    signal
  );
};

export const getBlogsBySearch = async (
  search: string,
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.GET_OPTIONS };
  return await makeRequest(
    `${API_URLS.GET_BLOGS_BY_SEARCH}${search}/pageNumber/${pageNumber}`,
    payload,
    signal
  );
};

export const getBlogsByTag = async (
  tag: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.GET_OPTIONS };
  return await makeRequest(
    `${API_URLS.GET_BLOGS_BY_TAG}${tag}`,
    payload,
    signal
  );
};

export const deleteBlogById = async (
  id: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.DELETE_OPTIONS };
  return await makeRequest(
    `${API_URLS.DELETE_BLOG_BY_ID}${id}`,
    payload,
    signal
  );
};

export const putBlogById = async (
  id: string,
  data: IUpdateBlogRequest,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.PUT_OPTIONS, body: JSON.stringify(data) };
  return await makeRequest(`${API_URLS.PUT_BLOG_BY_ID}${id}`, payload, signal);
};

export const postBookmarkBlog = async (
  data: IBookMarkBlog,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(data) };
  return await makeRequest(API_URLS.POST_BOOKMARK_BLOG, payload, signal);
};

export const deleteBookmarkBlog = async (
  id: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.DELETE_OPTIONS };
  return await makeRequest(
    `${API_URLS.DELETE_BOOKMARK_BLOG}${id}`,
    payload,
    signal
  );
};

export const getBookmarkedBlogs = async (
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.GET_OPTIONS };
  return await makeRequest(API_URLS.GET_BOOKMARKED_BLOGS, payload, signal);
};

export const postBlogUpvoteById = async (
  id: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.POST_OPTIONS };
  return await makeRequest(
    `${API_URLS.POST_BLOG_UPVOTE_BY_ID}${id}`,
    payload,
    signal
  );
};

export const postBlogDownvoteById = async (
  id: string,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.POST_OPTIONS };
  return await makeRequest(
    `${API_URLS.POST_BLOG_DOWNVOTE_BY_ID}${id}`,
    payload,
    signal
  );
};

export const getBlogsByAuthor = async (
  id: string,
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.GET_OPTIONS };
  return await makeRequest(
    `${API_URLS.GET_BLOGS_BY_AUTHOR}${id}/pageNumber/${pageNumber}`,
    payload,
    signal
  );
};

export const getBlogTags = async (
  signal: AbortSignal
): Promise<IApiResponse> => {
  return await makeRequest(
    API_URLS.GET_BLOG_TAGS,
    API_UTILS.GET_OPTIONS,
    signal
  );
};

export const postBlogsByTags = async (
  tags: string[],
  pageNumber: number,
  signal: AbortSignal
): Promise<IApiResponse> => {
  const payload = { ...API_UTILS.POST_OPTIONS, body: JSON.stringify(tags) };

  return await makeRequest(
    `${API_URLS.POST_BLOGS_BY_TAGS}${pageNumber}`,
    payload,
    signal
  );
};
