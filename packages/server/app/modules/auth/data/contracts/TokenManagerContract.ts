import { UserModel } from '~/modules/users/domain';

export interface TokenPayload {
  sub: string;
}

export interface TokenManagerContract {
  encode(user: UserModel): Promise<string>;
  decode<T extends TokenPayload = TokenPayload>(token: string): Promise<T>;
}
