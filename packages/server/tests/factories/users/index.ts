import { createUserFactory } from './createUserFactory';
import { userFactory } from './userFactory';

export const usersFactories = {
  createUser: createUserFactory,
  user: userFactory
};
