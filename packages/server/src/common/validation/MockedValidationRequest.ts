import {
  RequestContract,
  ValidationRequestContract,
  ValidationResultContract
} from '../presentation';

export class MockedValidationRequest implements ValidationRequestContract {
  public validate(request: RequestContract): Promise<ValidationResultContract> {
    return Promise.resolve({ payload: request.body(), errors: [] });
  }
}
