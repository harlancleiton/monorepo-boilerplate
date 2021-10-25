import {
  ControllerContract,
  HttpContextContract,
  RequestValidatorContract
} from '~/common';

export class RegisterController implements ControllerContract {
  constructor(private readonly validation: RequestValidatorContract) {}

  public async handle({
    request,
    response
  }: HttpContextContract): Promise<void> {
    const { errors, payload } = await this.validation.validate(request);

    if (errors.length) return response.badRequest(errors);

    // eslint-disable-next-line no-console
    console.log('payload: ', payload);
    response.ok({ message: 'Hello World' });
  }
}
