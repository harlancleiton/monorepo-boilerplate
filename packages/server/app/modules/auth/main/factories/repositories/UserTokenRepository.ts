import { PrismaClientConnection } from '~/common';
import { UserTokenRepository } from '~/modules/auth/data';
import { PrismaUserTokenRepository } from '~/modules/auth/infra';

export function makeUserTokenRepository(): UserTokenRepository {
  return new PrismaUserTokenRepository(PrismaClientConnection.getInstance());
}
