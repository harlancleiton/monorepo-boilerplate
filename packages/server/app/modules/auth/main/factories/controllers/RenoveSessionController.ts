import { ControllerContract, MockedRequestValidator } from '~/common';
import { RenoveSessionController } from '~/modules/auth/presentation';

import { makeRenoveSessionTokens } from '../usecases';

export function makeRenoveSessionController(): ControllerContract {
  return new RenoveSessionController(
    makeRenoveSessionTokens(),
    new MockedRequestValidator()
  );
}
