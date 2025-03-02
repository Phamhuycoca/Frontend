export interface ResponseData<T> {
  data: T;
  page: number;
  page_size: number;
  total: number;
  filter: string;
  search: string;
}
export interface ResponseAuth {
  accaccess_token: string;
  refresh_token: string;
}
