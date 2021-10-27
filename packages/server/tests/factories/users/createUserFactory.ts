import * as faker from 'faker';
import { Factory } from 'fishery';

import { CreateUserModel } from '~/modules/users/domain';

export const createUserFactory = Factory.define<CreateUserModel>(() => ({
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.internet.password()
}));
