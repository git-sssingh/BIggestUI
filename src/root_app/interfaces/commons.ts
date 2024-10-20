export interface IApiResponse {
  status: number;
  statusText: string;
  data: any;
  error: any;
}

export interface ICommonObject {
  id: string;
  name: string;
}

export interface IContactus {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface IMap {
  [key: string]: string | object | any | undefined;
}

export interface IDashboardDataset {
  Assets: any;
  ActiveSubscriptions: any;
  AssetsRequest: any;
  Departments: any;
  Designations: any;
  Employee: any;
  MaterialQuantityTypes: any;
  MaterialTypes: any;
  ProcurementRequest: any;
  DesignationsbyAccountTypes: any;
  EmployeesbyDesignation: any;
  StoreRequestsByEmployee: any;
  ProcurementRequestsByEmployee: any;
}

export interface ICommonResponse {
  name: string | null;
  id: string | null;
  profilePic: string | null;
}

export interface ICounts {
  questions: number;
  blogs: number;
  groups: number;
}
