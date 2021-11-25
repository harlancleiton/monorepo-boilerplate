import { HashContract, UnauthorizedException } from '~/common';
import {
  Authentication,
  CreateSessionTokens,
  CredentialsModel,
  SessionModel
} from '~/modules/auth/domain';
import { UserRepository } from '~/modules/users/data';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: HashContract,
    private readonly createSession: CreateSessionTokens
  ) {}

  public async execute(credentials: CredentialsModel): Promise<SessionModel> {
    const user = await this.userRepository.findOneByEmail(credentials.email);

    if (!user) throw this.getUnauthorizedException();

    const passwordIsMatch = await this.hash.verify(
      user.password,
      credentials.password
    );

    if (!passwordIsMatch) throw this.getUnauthorizedException();

    const sessionTokens = await this.createSession.execute(user);

    return { user, ...sessionTokens };
  }

  private getUnauthorizedException(): UnauthorizedException {
    return new UnauthorizedException('Email ou senha inválida');
  }
}
