import { DeepPartial } from '~/common';

import { UserModel } from '../../domain';

export interface UserRepository {
  create(partial: DeepPartial<UserModel>): Promise<UserModel>;
  findOneByEmail(email: string): Promise<UserModel>;
}
