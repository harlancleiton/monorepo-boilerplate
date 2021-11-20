import {
  Authentication,
  CredentialsModel,
  SessionModel
} from '~/modules/auth/domain';
import { UserRepository } from '~/modules/users/data';

export class DbAuthentication implements Authentication {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(credentials: CredentialsModel): Promise<SessionModel> {
    await this.userRepository.findOneByEmail(credentials.email);

    return null;
  }
}
