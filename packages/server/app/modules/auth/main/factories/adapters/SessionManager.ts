import { SessionManagerContract } from '~/modules/auth/data';
import { SessionManagerAdapter } from '~/modules/auth/infra';

import { makeUserTokenRepository } from '../repositories';
import { makeTokenManager } from './TokenManager';

export function makeSessionManager(): SessionManagerContract {
  return new SessionManagerAdapter(
    makeTokenManager(),
    makeUserTokenRepository()
  );
}
