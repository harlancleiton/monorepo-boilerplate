export interface HttpRequest {
  url?: string;
  baseURL?: string;
  headers?: Record<string, string>;
  data?: any;
  params?: Record<string, string>;
  method?: 'post' | 'get' | 'put' | 'delete';
}
