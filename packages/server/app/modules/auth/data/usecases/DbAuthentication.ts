import { UserRepository } from '~/modules/users/data';

import { Authentication, CredentialsModel, SessionModel } from '../../domain';

export class DbAuthentication implements Authentication {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(credentials: CredentialsModel): Promise<SessionModel> {
    await this.userRepository.findOneByEmail(credentials.email);

    return null;
  }
}
