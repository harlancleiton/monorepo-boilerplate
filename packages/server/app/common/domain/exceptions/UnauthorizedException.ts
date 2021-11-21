import { MonorepoException } from './MonorepoException';

export class UnauthorizedException extends MonorepoException {
  constructor(
    objectOrError?: string | object | any,
    description = 'Unauthorized'
  ) {
    super(MonorepoException.createBody(objectOrError, description, 401), 401);
  }
}
