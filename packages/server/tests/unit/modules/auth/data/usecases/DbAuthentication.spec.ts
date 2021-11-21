import { HashContract, UnauthorizedException } from '~/common';
import { DbAuthentication } from '~/modules/auth/data';
import { UserRepository } from '~/modules/users/data';
import { factories } from '~/tests/factories';
import { MockHash, MockUserRepository } from '~/tests/mocks';

describe('DbAuthentication', () => {
  let sut: DbAuthentication;
  let userRepository: UserRepository;
  let hash: HashContract;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    hash = new MockHash();
    sut = new DbAuthentication(userRepository, hash);
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

  it('should be throw UnauthorizedException if user is undefined', async () => {
    const user = factories.users.user.build();

    jest.spyOn(userRepository, 'findOneByEmail').mockReturnValueOnce(undefined);
    jest.spyOn(hash, 'verify');

    await expect(
      sut.execute({ email: user.email, password: user.password })
    ).rejects.toThrow(UnauthorizedException);

    expect(hash.verify).not.toBeCalled();
  });

  it('should be call hash with correct values', async () => {
    const mockPlainPassword = factories.faker.random.alphaNumeric(8);
    const user = factories.users.user.build();

    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValueOnce(user);
    jest.spyOn(hash, 'verify');

    await sut.execute({ email: user.email, password: mockPlainPassword });

    expect(hash.verify).toBeCalledWith(user.password, mockPlainPassword);
  });

  it('should be throw UnauthorizedException if password is not match', async () => {
    const user = factories.users.user.build();

    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValueOnce(user);
    jest.spyOn(hash, 'verify').mockResolvedValueOnce(false);

    await expect(
      sut.execute({ email: user.email, password: user.password })
    ).rejects.toThrow(UnauthorizedException);
  });
});
