import { ControllerContract, MockedRequestValidator } from '~/common';
import { RegisterController } from '~/modules/auth/presentation';
import { makeCreateUser } from '~/modules/users/main';

export function makeRegisterController(): ControllerContract {
  return new RegisterController(makeCreateUser(), new MockedRequestValidator());
}
