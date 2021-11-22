import { UserModel } from '~/modules/users/domain';

import { UserTokenType } from '../../domain';

export interface CreateUserTokenInput {
  type: UserTokenType;
  user: UserModel;
}
