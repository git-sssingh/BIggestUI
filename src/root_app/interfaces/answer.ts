export interface ICreateAnswerRequest {
  questionId: string;
  details: string;
}

export interface IVoteAnswerRequest {
  isLike: boolean;
}

export interface IPostAnswer extends ICreateAnswerRequest {}

export interface IPutAnswerVote extends IVoteAnswerRequest {}
