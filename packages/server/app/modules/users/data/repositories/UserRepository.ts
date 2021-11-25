import { UserModel } from '../../domain';
import { CreateUserInput } from '../inputs';

export interface UserRepository {
  create(input: CreateUserInput): Promise<UserModel>;
  findById(id: string): Promise<UserModel | undefined>;
  findOneByEmail(email: string): Promise<UserModel | undefined>;
}
