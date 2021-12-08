import { EncrypterContract, UnauthorizedException } from '~/common';
import {
  CreateSessionTokens,
  RenoveSessionTokens,
  SessionTokensModel
} from '~/modules/auth/domain';

import { TokenManagerContract } from '../../contracts';
import { UserTokenRepository } from '../../repositories';

export class DbRenoveSessionTokens implements RenoveSessionTokens {
  constructor(
    private readonly userTokenRepository: UserTokenRepository,
    private readonly tokenManager: TokenManagerContract,
    private readonly encrypter: EncrypterContract,
    private readonly createSessionTokens: CreateSessionTokens
  ) {}

  public async execute(
    oldTokens: SessionTokensModel
  ): Promise<SessionTokensModel> {
    const { sub: subject } = await this.tokenManager.decode<{ sub: string }>(
      oldTokens.accessToken
    );
    const decryptedRefreshToken = this.encrypter.decrypt(
      oldTokens.refreshToken
    );

    const userToken = await this.userTokenRepository.findByToken(
      decryptedRefreshToken
    );

    if (!userToken) throw new UnauthorizedException();
    if (subject !== userToken.user.id) throw new UnauthorizedException();

    return this.createSessionTokens.execute(userToken.user);
  }
}
