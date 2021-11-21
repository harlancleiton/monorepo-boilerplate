import { HashContract, UnauthorizedException } from '~/common';
import {
  Authentication,
  CredentialsModel,
  SessionModel
} from '~/modules/auth/domain';
import { UserRepository } from '~/modules/users/data';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: HashContract
  ) {}

  public async execute(credentials: CredentialsModel): Promise<SessionModel> {
    const user = await this.userRepository.findOneByEmail(credentials.email);

    if (!user) throw this.getUnauthorizedException();

    const passwordIsMatch = await this.hash.verify(
      user.password,
      credentials.password
    );

    if (!passwordIsMatch) throw this.getUnauthorizedException();

    return null;
  }

  private getUnauthorizedException(): UnauthorizedException {
    return new UnauthorizedException('Email ou senha inválida');
  }
}
