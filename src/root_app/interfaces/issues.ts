export interface IIssue {
  id: string;
  name: string;
  emailId: string;
  title: string;
  description: string;
  resolved: boolean;
  submittedDate: string;
}

export interface IIssueRequest {
  name: string;
  emailId: string;
  title: string;
  description: string;
}

export interface IGetIssues {
  issues: IIssue[];
}

export interface IPostIssue extends IIssueRequest {}

export interface IGetIssue extends IIssue {}
