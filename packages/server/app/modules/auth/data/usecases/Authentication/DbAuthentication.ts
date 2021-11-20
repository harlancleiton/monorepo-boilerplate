import { HashContract } from '~/common';
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

    await this.hash.verify(user.password, credentials.password);

    return null;
  }
}
