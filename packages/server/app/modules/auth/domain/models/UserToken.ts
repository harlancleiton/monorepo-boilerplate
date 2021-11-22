import { UserModel } from '~/modules/users/domain';

import { UserTokenType } from '../enums';

export interface UserTokenModel {
  id: string;
  token: string;
  type: UserTokenType;
  user: UserModel;
  createdAt: Date;
  updatedAt: Date;
}
