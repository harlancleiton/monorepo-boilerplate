import { UserTokenModel } from '../../domain';
import { CreateUserTokenInput } from '../inputs';

export interface UserTokenRepository {
  create(input: CreateUserTokenInput): Promise<UserTokenModel>;
}
