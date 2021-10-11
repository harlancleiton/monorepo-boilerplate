import { HttpRequest, HttpResponse } from '~/data/models';
import { HttpClient, Storage } from '~/data/protocols';

import { SessionModel } from '../models';

type FailedQueuesRequests = (newAccessToken: string) => void;

export class RefreshTokenHttpClientDecorator implements HttpClient {
  private static isAlreadyFetchingAccessToken = false;
  private static readonly failedQueuesRequests: FailedQueuesRequests[] = [];

  constructor(
    private readonly decoratee: HttpClient,
    private readonly storage: Storage,
    private readonly accessTokenKey: string,
    private readonly refreshTokenKey: string
  ) {}

  async request<ResponseBodyT = any>(
    config: HttpRequest
  ): Promise<HttpResponse<ResponseBodyT>> {
    try {
      const response = await this.decoratee.request(config);
      return response;
    } catch (error) {
      if (!error.response) {
        return Promise.reject(error);
      }

      if (!this.isAccessTokenExpiredError(error.response)) {
        return Promise.reject(error);
      }

      const refreshToken = await this.storage.getItem<string>(
        this.refreshTokenKey
      );

      if (!refreshToken) return Promise.reject(error);

      return this.getNewAccessTokenAndReattemptRequest(error);
    }
  }

  private isAccessTokenExpiredError(response: HttpResponse<any>): boolean {
    const statusCodeIsUnauthorized = response.status === 401;

    return statusCodeIsUnauthorized;
  }

  private async getNewAccessTokenAndReattemptRequest(error: any): Promise<any> {
    try {
      const { response } = error;

      const retryOriginalRequest = this.getRetryOriginalRequest(response);

      if (!RefreshTokenHttpClientDecorator.isAlreadyFetchingAccessToken) {
        RefreshTokenHttpClientDecorator.isAlreadyFetchingAccessToken = true;

        const session = await this.getNewAccessToken();

        if (!session) return Promise.reject(error);

        const { accessToken, refreshToken } = session;

        await this.storage.setItem(this.accessTokenKey, accessToken);
        await this.storage.setItem(this.refreshTokenKey, refreshToken);

        RefreshTokenHttpClientDecorator.isAlreadyFetchingAccessToken = false;
        RefreshTokenHttpClientDecorator.failedQueuesRequests.forEach(
          failedRequest => failedRequest(accessToken)
        );

        RefreshTokenHttpClientDecorator.failedQueuesRequests.splice(
          0,
          RefreshTokenHttpClientDecorator.failedQueuesRequests.length
        );
      }

      return retryOriginalRequest;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  private getRetryOriginalRequest(response: HttpResponse<any>): Promise<any> {
    return new Promise(resolve => {
      RefreshTokenHttpClientDecorator.failedQueuesRequests.push(
        newAccessToken => {
          const requestConfig = response.config;

          resolve(
            this.decoratee.request({
              ...requestConfig,
              headers: {
                ...requestConfig?.headers,
                Authorization: `Bearer ${newAccessToken}`
              }
            })
          );
        }
      );
    });
  }

  private async getNewAccessToken(): Promise<SessionModel | undefined> {
    try {
      const refreshToken = await this.storage.getItem<string>(
        this.refreshTokenKey
      );

      const response = await this.decoratee.request<{
        accessToken: string;
        refreshToken: string;
      }>({
        method: 'post',
        url: 'auth/refresh-token',
        data: { refreshToken }
      });

      return response.data;
    } catch (error) {
      return undefined;
    }
  }
}
