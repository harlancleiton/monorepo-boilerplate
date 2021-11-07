import { makeHash } from '~/common/main/hash';

import { DbCreateUser } from '../../data';
import { CreateUser } from '../../domain';
import { makeUserRepository } from '../repositories';

export function makeCreateUser(): CreateUser {
  return new DbCreateUser(makeUserRepository(), makeHash());
}
