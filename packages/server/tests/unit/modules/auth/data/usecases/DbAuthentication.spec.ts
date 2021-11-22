import { HashContract, UnauthorizedException } from '~/common';
import { DbAuthentication, SessionManagerContract } from '~/modules/auth/data';
import { UserRepository } from '~/modules/users/data';
import { factories } from '~/tests/factories';
import {
  MockHash,
  MockSessionManager,
  MockUserRepository
} from '~/tests/mocks';

describe('DbAuthentication', () => {
  let sut: DbAuthentication;
  let userRepository: UserRepository;
  let hash: HashContract;
  let sessionManager: SessionManagerContract;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    hash = new MockHash();
    sessionManager = new MockSessionManager();
    sut = new DbAuthentication(userRepository, hash, sessionManager);
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
    jest.spyOn(sessionManager, 'create');

    await expect(
      sut.execute({ email: user.email, password: user.password })
    ).rejects.toThrow(UnauthorizedException);

    expect(hash.verify).not.toBeCalled();
    expect(sessionManager.create).not.toBeCalled();
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
    jest.spyOn(sessionManager, 'create');

    await expect(
      sut.execute({ email: user.email, password: user.password })
    ).rejects.toThrow(UnauthorizedException);

    expect(sessionManager.create).not.toBeCalled();
  });

  it('should be call sessionManager with correct values', async () => {
    const mockPlainPassword = factories.faker.random.alphaNumeric(8);
    const user = factories.users.user.build();

    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValueOnce(user);
    jest.spyOn(hash, 'verify').mockResolvedValueOnce(true);
    jest.spyOn(sessionManager, 'create');

    await sut.execute({ email: user.email, password: mockPlainPassword });

    expect(sessionManager.create).toBeCalledWith(user);
  });
});
