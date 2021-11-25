import { PrismaClient } from '@prisma/client';

import { CreateUserInput, UserRepository } from '~/modules/users/data';
import { UserModel } from '~/modules/users/domain';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public create(input: CreateUserInput): Promise<UserModel> {
    return this.prismaClient.user.create({ data: input });
  }

  public findById(id: string): Promise<UserModel | undefined> {
    return this.prismaClient.user.findUnique({ where: { id } });
  }

  public findOneByEmail(email: string): Promise<UserModel | undefined> {
    return this.prismaClient.user.findUnique({ where: { email } });
  }
}
