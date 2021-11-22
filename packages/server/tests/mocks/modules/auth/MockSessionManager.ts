import { SessionManagerContract } from '~/modules/auth/data';
import { SessionModel } from '~/modules/auth/domain';
import { UserModel } from '~/modules/users/domain';
import { factories } from '~/tests/factories';

export class MockSessionManager implements SessionManagerContract {
  public create(user: UserModel): Promise<SessionModel> {
    return Promise.resolve({
      user,
      accessToken: factories.faker.random.alphaNumeric(32),
      refreshToken: factories.faker.random.alphaNumeric(32)
    });
  }

  public renew(user: UserModel): Promise<SessionModel> {
    return Promise.resolve({
      user,
      accessToken: factories.faker.random.alphaNumeric(32),
      refreshToken: factories.faker.random.alphaNumeric(32)
    });
  }

  public revokeSessions(): Promise<void> {
    return Promise.resolve();
  }
}
