import { DeepPartial } from '~/common';

import { UserModel } from '../../domain';

export interface UserRepository {
  create(partial: DeepPartial<UserModel>): Promise<UserModel>;
  findUserByEmail(email: string): Promise<UserModel>;
}
