import { StorageConstants } from '~/constants';
import { HttpRequest } from '~/data/models';
import { Storage } from '~/data/protocols';

import { RefreshTokenHttpClientDecorator } from '../decorators';
import { makeAuthenticatedHttpClient } from './AuthenticatedHttpClient';

export function makeRefreshTokenHttpClient(
  storage: Storage,
  config?: HttpRequest,
  accessTokenKey: string = StorageConstants.ACCESS_TOKEN,
  refreshTokenKey: string = StorageConstants.REFRESH_TOKEN
) {
  return new RefreshTokenHttpClientDecorator(
    makeAuthenticatedHttpClient(storage, config, accessTokenKey),
    storage,
    accessTokenKey,
    refreshTokenKey
  );
}
