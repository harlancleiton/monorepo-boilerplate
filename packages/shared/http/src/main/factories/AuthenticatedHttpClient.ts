import { StorageConstants } from '~/constants';
import { HttpRequest } from '~/data/models';
import { Storage } from '~/data/protocols';

import { AutheticatedHttpClientDecorator } from '../decorators';
import { makeHttpClient } from './AxiosHttpClient';

export function makeAuthenticatedHttpClient(
  storage: Storage,
  config?: HttpRequest,
  accessTokenKey: string = StorageConstants.ACCESS_TOKEN
) {
  return new AutheticatedHttpClientDecorator(
    makeHttpClient(config),
    storage,
    accessTokenKey
  );
}
