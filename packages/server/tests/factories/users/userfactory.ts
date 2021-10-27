import faker from 'faker';
import { Factory } from 'fishery';

import { UserModel } from '~/modules/users/domain';

export const userFactory = Factory.define<UserModel>(() => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.internet.password(),
  createdAt: new Date(),
  updatedAt: new Date()
}));
