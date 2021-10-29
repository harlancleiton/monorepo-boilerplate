import { makeHash } from '~/common/main/hash';
import { MockUserRepository } from '~/tests/mocks';

import { DbCreateUser } from '../../data';
import { CreateUser } from '../../domain';

export function makeCreateUser(): CreateUser {
  return new DbCreateUser(new MockUserRepository(), makeHash());
}
