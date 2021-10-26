import { DbCreateUser, UserRepository } from '~/modules/users/data';

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
    await sut.execute({
      email: 'mail@mail.com',
      firstName: 'Lorem',
      lastName: 'Ipsum',
      password: '123456'
    });

    expect(userRepository.create).toBeCalledWith({
      email: 'mail@mail.com',
      firstName: 'Lorem',
      lastName: 'Ipsum',
      password: '123456'
    });
  });
});
