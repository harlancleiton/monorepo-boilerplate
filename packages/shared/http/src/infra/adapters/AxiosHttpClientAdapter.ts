import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HttpRequest, HttpResponse } from '~/data/models';
import { HttpClient } from '~/data/protocols';

export class AxiosHttpClient implements HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  public request<RequestT>(data: HttpRequest): Promise<HttpResponse<RequestT>> {
    return this.axiosInstance.request(data);
  }
}
