import { UserModel } from '~/modules/users/domain';

import { SessionModel } from '../../domain';

export interface SessionManagerContract {
  create(user: UserModel): Promise<SessionModel>;
  renew(user: UserModel, oldSession: SessionModel): Promise<SessionModel>;
  revokeSessions(user: UserModel, ignoreSession?: SessionModel): Promise<void>;
}
