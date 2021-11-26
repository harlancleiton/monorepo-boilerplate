import { makeHash } from '~/common/main/hash';
import { DbAuthentication } from '~/modules/auth/data';
import { Authentication } from '~/modules/auth/domain';
import { makeUserRepository } from '~/modules/users/main';

import { makeCreateSessionTokens } from './CreateSessionTokens';

export function makeAuthentication(): Authentication {
  return new DbAuthentication(
    makeUserRepository(),
    makeHash(),
    makeCreateSessionTokens()
  );
}
