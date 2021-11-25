import { SessionModel, SessionTokensModel } from '../models';

export interface RenoveSession {
  execute(oldTokens: SessionTokensModel): Promise<SessionModel>;
}
