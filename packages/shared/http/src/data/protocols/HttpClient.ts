import { HttpRequest, HttpResponse } from '../models';

export interface HttpClient {
  request<ResponseT = any>(
    config: HttpRequest
  ): Promise<HttpResponse<ResponseT>>;
}
