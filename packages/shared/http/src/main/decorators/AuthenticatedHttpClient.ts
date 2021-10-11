import { HttpRequest, HttpResponse } from '~/data/models';
import { HttpClient, Storage } from '~/data/protocols';

export class AutheticatedHttpClientDecorator implements HttpClient {
  constructor(
    private readonly decoratee: HttpClient,
    private readonly storage: Storage,
    private readonly accessTokenKey: string
  ) {}

  async request<ResponseT>(
    config: HttpRequest
  ): Promise<HttpResponse<ResponseT>> {
    const hasBeenAuthenticated = !!config.headers?.Authorization;

    if (hasBeenAuthenticated) {
      return this.decoratee.request(config);
    }

    const accessToken = await this.storage.getItem(this.accessTokenKey);

    if (!accessToken) {
      return this.decoratee.request(config);
    }

    const accessTokenType = 'Bearer';

    const authorizedRequestConfig = {
      ...config,
      headers: {
        ...config.headers,
        authorization: `${accessTokenType} ${accessToken}`
      }
    };

    return this.decoratee.request(authorizedRequestConfig);
  }
}
