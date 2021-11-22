import {
  ControllerContract,
  HttpContextContract,
  RequestValidatorContract
} from '~/common';

import { Authentication } from '../../domain';

export class SessionController implements ControllerContract {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: RequestValidatorContract
  ) {}

  public async handle({
    request,
    response
  }: HttpContextContract): Promise<void> {
    const { errors, payload } = await this.validation.validate(request);

    if (errors.length) return response.badRequest(errors);

    const user = await this.authentication.execute(payload);
    response.created(user);
  }
}
