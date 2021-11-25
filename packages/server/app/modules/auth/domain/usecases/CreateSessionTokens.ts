import { UserModel } from '~/modules/users/domain';

import { SessionTokensModel } from '../models';

export interface CreateSessionTokens {
  execute(user: UserModel): Promise<SessionTokensModel>;
  execute(userId: string): Promise<SessionTokensModel>;
}
