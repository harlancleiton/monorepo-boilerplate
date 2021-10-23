import { RequestContract } from '~/common';

import { ValidationError } from '../errors';

export interface ValidationRequestContract {
  validate(request: RequestContract): Promise<ValidationError[] | void>;
}
