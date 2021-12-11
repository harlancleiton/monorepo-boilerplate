import {
  ControllerContract,
  HttpContextContract,
  RequestValidatorContract,
  UnauthorizedException
} from '~/common';

import { RenoveSessionTokens } from '../../domain';

export class RenoveSessionController implements ControllerContract {
  constructor(
    private readonly renoveSessionTokens: RenoveSessionTokens,
    private readonly validation: RequestValidatorContract
  ) {}

  public async handle({
    request,
    response
  }: HttpContextContract): Promise<void> {
    const { errors, payload } = await this.validation.validate(request);

    if (errors.length) return response.badRequest(errors);

    const authorizationHeader = request.header('authorization');

    if (!authorizationHeader) throw new UnauthorizedException();

    const [, accessToken] = authorizationHeader.split(' ');

    const sessionTokens = await this.renoveSessionTokens.execute({
      accessToken,
      refreshToken: payload.refreshToken
    });

    response.ok(sessionTokens);
  }
}
