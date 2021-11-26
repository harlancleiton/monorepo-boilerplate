import { makeEncrypterAdapter } from '~/common';
import { DbCreateSessionTokens } from '~/modules/auth/data';
import { CreateSessionTokens } from '~/modules/auth/domain';
import { makeUserRepository } from '~/modules/users/main';

import { makeTokenManager } from '../adapters';
import { makeUserTokenRepository } from '../repositories';

export function makeCreateSessionTokens(): CreateSessionTokens {
  return new DbCreateSessionTokens(
    makeUserRepository(),
    makeUserTokenRepository(),
    makeTokenManager(),
    makeEncrypterAdapter()
  );
}
