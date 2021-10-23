import { ValidationError } from '~/common';

export interface ValidationResultContract<T = any> {
  payload: T;
  errors: ValidationError[];
}
