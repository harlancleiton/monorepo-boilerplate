import { UserTokenModel } from '../../domain/models/UserToken';
import { CreateUserTokenInput } from '../inputs';

export interface UserTokenRepository {
  create(input: CreateUserTokenInput): Promise<UserTokenModel>;
}
