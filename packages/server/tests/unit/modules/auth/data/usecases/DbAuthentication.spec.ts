import { DbAuthentication } from '~/modules/auth/data';
import { UserRepository } from '~/modules/users/data';
import { factories } from '~/tests/factories';
import { MockUserRepository } from '~/tests/mocks';

describe('DbAuthentication', () => {
  let sut: DbAuthentication;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    sut = new DbAuthentication(userRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be call userRepository with correct values', async () => {
    const user = factories.users.user.build();

    jest.spyOn(userRepository, 'findOneByEmail');

    await sut.execute({ email: user.email, password: user.password });

    expect(userRepository.findOneByEmail).toBeCalledWith(user.email);
  });
});
