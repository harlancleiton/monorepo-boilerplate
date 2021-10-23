import { ControllerContract } from '~/common';
import { RegisterController } from '~/modules/auth/presentation';

export function makeRegisterController(): ControllerContract {
  return new RegisterController();
}
