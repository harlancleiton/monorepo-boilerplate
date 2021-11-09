import { DeepPartial } from '~/common';
import { UserRepository } from '~/modules/users/data';
import { UserModel } from '~/modules/users/domain';
import { factories } from '~/tests/factories';

export class MockUserRepository implements UserRepository {
  public create(partial: DeepPartial<UserModel>): Promise<UserModel> {
    return Promise.resolve(factories.users.user.build(partial));
  }

  public findOneByEmail(email: string): Promise<UserModel> {
    return Promise.resolve(factories.users.user.build({ email }));
  }
}
