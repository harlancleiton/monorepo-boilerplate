import { PrismaClientConnection } from '~/common';

import { UserRepository } from '../../data';
import { PrismaUserRepository } from '../../infra';

export function makeUserRepository(): UserRepository {
  return new PrismaUserRepository(PrismaClientConnection.getInstance());
}
