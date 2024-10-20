import { ICommonResponse } from "./commons";

export interface ICreateQuestionRequest {
  title: string;
  description: string;
  tags: string | null;
  bounty: number | null;
  teamId: string;
}

export interface IAnswerResponse {
  details: string;
  createdDate: string;
  accepted: boolean | null;
  givenBy: ICommonResponse;
  voteCount: number;
  id: string;
}

export interface IQuestionResponseData {
  id: string;
  title: string;
  description: string;
  tags: string | null;
  bounty: number | null;
  createdDate: string;
  upVotes: number;
  downVotes: number;
  commentsCount: number;
}

export interface IQuestionResponse extends IQuestionResponseData {
  id: string;
  title: string;
  description: string;
  tags: string | null;
  bounty: number | null;
  createdDate: string;
  author: ICommonResponse;
  company: ICommonResponse;
  totalBookmarks: number;
  totalAnswerGived: number;
  bookmarkId: string | null;
  points: number;
  team: ICommonResponse;
  answers: IAnswerResponse[];
}

export interface ITeamQuestionResponse extends IQuestionResponseData {
  author: ICommonResponse;
  company: ICommonResponse;
}

export interface ICompanyQuestionResponse extends IQuestionResponseData {
  team: ICommonResponse;
  author: ICommonResponse;
}

export interface IAuthorQuestionResponse extends IQuestionResponseData {
  team: ICommonResponse;
  company: ICommonResponse;
}

export interface IBookMarkQuestionRequest {
  questionId: string;
}

export interface IQuestionBookmarkResponse {
  id: string;
  questionTitle: string;
  questionId: string;
  createdDate: string;
}

export interface IPostQuestion extends ICreateQuestionRequest {}

export interface IGetQuestionById extends IQuestionResponse {}

export interface IGetQuestionsByCompanyId {
  questions: ICompanyQuestionResponse[];
}

export interface IGetAutherQuestions {
  questions: IAuthorQuestionResponse[];
}

export interface IGetTeamQuestions {
  questions: ITeamQuestionResponse[];
}

export interface IPostQuestionBookmark extends IBookMarkQuestionRequest {}

export interface IGetBookmarkedQuestions {
  bookmarkedQuestions: IQuestionBookmarkResponse[];
}

export interface IGetQuestionsBySearch extends ICompanyQuestionResponse {}

export interface IPutQuestion extends ICreateQuestionRequest {}
