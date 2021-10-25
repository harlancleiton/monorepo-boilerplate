import { ControllerContract, MockedValidationRequest } from '~/common';
import { RegisterController } from '~/modules/auth/presentation';

export function makeRegisterController(): ControllerContract {
  return new RegisterController(new MockedValidationRequest());
}
