import { DbCreateUser, UserRepository } from '~/modules/users/data';

import { factories } from '../../../../../factories';

describe('DbCreateUser', () => {
  let sut: DbCreateUser;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = { create: jest.fn() };
    sut = new DbCreateUser(userRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should calls usersRepository.create with correct values', async () => {
    const createUser = factories.users.createUser.build();

    await sut.execute(createUser);

    expect(userRepository.create).toBeCalledWith(createUser);
  });
});
