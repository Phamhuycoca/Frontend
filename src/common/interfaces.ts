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
export interface ApiResponse<T> {
  message: string;
  data: T;
  statusCode: number;
  success: boolean;
}
export interface RouteConfig {
  path: string; // Đường dẫn ("/", "/login", "/dashboard")
  element: React.ReactNode; // JSX element thay vì component
  protected?: boolean | false; // Có cần đăng nhập không?
  children?: RouteConfig[]; // Các route con
}
