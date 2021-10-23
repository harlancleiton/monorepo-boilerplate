import { ControllerContract, HttpContextContract } from '~/common';

export class RegisterController implements ControllerContract {
  async handle({ request, response }: HttpContextContract): Promise<void> {
    console.log('body: ', request.body());
    response.ok({ message: 'Hello World' });
  }
}
