import { authConfig } from '~/config/auth';
import { TokenManagerContract } from '~/modules/auth/data';
import { JwtTokenManager } from '~/modules/auth/infra';

export function makeTokenManager(): TokenManagerContract {
  return new JwtTokenManager(authConfig.drivers.jwt);
}
