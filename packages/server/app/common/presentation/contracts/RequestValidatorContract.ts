import { RequestContract } from '~/common';

import { ValidationResultContract } from './ValidationResultContract';

export interface RequestValidatorContract {
  validate(request: RequestContract): Promise<ValidationResultContract>;
}
