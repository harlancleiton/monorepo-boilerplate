import { UserModel } from '../../domain';
import { CreateUserInput } from '../inputs';

export interface UserRepository {
  create(input: CreateUserInput): Promise<UserModel>;
  findById(id: string): Promise<UserModel | null>;
  findOneByEmail(email: string): Promise<UserModel | null>;
}
