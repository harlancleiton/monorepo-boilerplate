import { SessionTokensModel } from '../models';

export interface RenoveSessionTokens {
  execute(oldTokens: SessionTokensModel): Promise<SessionTokensModel>;
}
