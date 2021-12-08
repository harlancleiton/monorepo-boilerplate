import { UserTokenModel } from '../../domain';
import { CreateUserTokenInput } from '../inputs';

export interface UserTokenRepository {
  findByToken(token: string): Promise<UserTokenModel | null>;
  create(input: CreateUserTokenInput): Promise<UserTokenModel>;
}
