import { EncrypterContract } from '~/common';
import {
  CreateSessionTokens,
  SessionTokensModel,
  UserTokenType
} from '~/modules/auth/domain';
import { UserRepository } from '~/modules/users/data';
import { UserModel } from '~/modules/users/domain';

import { TokenManagerContract } from '../../contracts';
import { UserTokenRepository } from '../../repositories';

export class DbCreateSessionTokens implements CreateSessionTokens {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokenRepository,
    private readonly tokenManager: TokenManagerContract,
    private readonly encrypter: EncrypterContract
  ) {}

  public execute(user: UserModel): Promise<SessionTokensModel>;
  public execute(userId: string): Promise<SessionTokensModel>;

  public async execute(
    userOrUserId: UserModel | string
  ): Promise<SessionTokensModel> {
    const user = await this.getUser(userOrUserId);

    const accessToken = await this.tokenManager.encode(user);

    const refreshToken = await this.userTokenRepository.create({
      type: UserTokenType.REFRESH_TOKEN,
      user
    });

    const encryptedRefreshToken = this.encrypter.encrypt(refreshToken.token);

    return { accessToken, refreshToken: encryptedRefreshToken };
  }

  private getUser(userOrUserId: string | UserModel): Promise<UserModel> {
    if (typeof userOrUserId !== 'string') return Promise.resolve(userOrUserId);

    return this.userRepository.findById(userOrUserId);
  }
}
