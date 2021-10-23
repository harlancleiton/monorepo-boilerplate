import { RequestContract } from '~/common';

import { ValidationResultContract } from './ValidationResultContract';

export interface ValidationRequestContract {
  validate(request: RequestContract): Promise<ValidationResultContract>;
}
