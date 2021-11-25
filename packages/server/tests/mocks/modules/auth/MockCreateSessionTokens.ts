import { randomBytes } from 'crypto';

import { CreateSessionTokens, SessionTokensModel } from '~/modules/auth/domain';
import { UserModel } from '~/modules/users/domain';

export class MockCreateSessionTokens implements CreateSessionTokens {
  public execute(user: UserModel): Promise<SessionTokensModel>;
  public execute(userId: string): Promise<SessionTokensModel>;

  public execute(): Promise<SessionTokensModel> {
    return Promise.resolve({
      accessToken: randomBytes(32).toString('hex'),
      refreshToken: randomBytes(32).toString('hex')
    });
  }
}
