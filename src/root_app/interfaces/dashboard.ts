export interface IReportResponse {
  userCount: number;
  wikiCount: number;
  teamCount: number;
  questionCount: number;
}

export interface IGetReportResponse extends IReportResponse {}
