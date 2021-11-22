import { UserModel } from '~/modules/users/domain';

import {
  SessionManagerContract,
  TokenManagerContract,
  UserTokenRepository
} from '../../data';
import { SessionModel, UserTokenType } from '../../domain';

export class SessionManagerAdapter implements SessionManagerContract {
  constructor(
    private readonly tokenManager: TokenManagerContract,
    private readonly userTokenRepository: UserTokenRepository
  ) {}

  public async create(user: UserModel): Promise<SessionModel> {
    const accessToken = await this.tokenManager.encode(user);

    const refreshToken = await this.userTokenRepository.create({
      type: UserTokenType.REFRESH_TOKEN,
      user
    });

    return { accessToken, refreshToken: refreshToken.token, user };
  }

  public async renew(): Promise<SessionModel> {
    throw new Error('Method not implemented.');
  }

  public revokeSessions(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
