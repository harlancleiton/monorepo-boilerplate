import { HttpRequest } from './HttpRequest';

export interface HttpResponse<ResponseT = any> {
  config?: HttpRequest;
  status: number;
  data?: ResponseT;
}
