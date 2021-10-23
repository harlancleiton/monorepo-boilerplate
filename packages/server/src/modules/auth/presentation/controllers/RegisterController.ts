import { ControllerContract, HttpContextContract } from '~/common';

export class RegisterController implements ControllerContract {
  public async handle({
    request,
    response
  }: HttpContextContract): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('body: ', request.body());
    response.ok({ message: 'Hello World' });
  }
}
