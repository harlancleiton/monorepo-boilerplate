import { makeEncrypterAdapter } from '~/common';
import { DbRenoveSessionTokens } from '~/modules/auth/data';
import { RenoveSessionTokens } from '~/modules/auth/domain';

import { makeCreateSessionTokens } from '.';

import { makeTokenManager } from '../adapters';
import { makeUserTokenRepository } from '../repositories';

export function makeRenoveSessionTokens(): RenoveSessionTokens {
  return new DbRenoveSessionTokens(
    makeUserTokenRepository(),
    makeTokenManager(),
    makeEncrypterAdapter(),
    makeCreateSessionTokens()
  );
}
