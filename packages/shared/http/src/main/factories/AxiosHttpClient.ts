import { HttpRequest } from '~/data/models';
import { AxiosHttpClient } from '~/infra/adapters';

export function makeHttpClient(config?: HttpRequest) {
  return new AxiosHttpClient(config);
}
