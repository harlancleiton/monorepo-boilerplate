import { UserModel } from '~/modules/users/domain';

export interface SessionModel {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}
