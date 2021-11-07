import { getRepository } from 'typeorm';

import { UserRepository } from '../../data';
import { TypeORMUserRepository, UserEntity } from '../../infra';

export function makeUserRepository(): UserRepository {
  return new TypeORMUserRepository(getRepository(UserEntity));
}
