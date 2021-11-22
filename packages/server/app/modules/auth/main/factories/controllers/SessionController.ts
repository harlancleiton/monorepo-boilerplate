import { ControllerContract, MockedRequestValidator } from '~/common';
import { SessionController } from '~/modules/auth/presentation';

import { makeAuthentication } from '../usecases';

export function makeSessionController(): ControllerContract {
  return new SessionController(
    makeAuthentication(),
    new MockedRequestValidator()
  );
}
