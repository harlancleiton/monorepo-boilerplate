import { CreateUser, CreateUserModel, UserModel } from '~/modules/users/domain';

export class DbCreateUser implements CreateUser {
  public execute(payload: CreateUserModel): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
}
